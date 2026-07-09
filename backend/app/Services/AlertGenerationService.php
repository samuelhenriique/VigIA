<?php

namespace App\Services;

use App\Models\Alert;
use App\Models\Occurrence;

class AlertGenerationService
{
    public function generateSimilarOccurrenceAlerts(): array
    {
        $createdAlerts = [];

        $groups = Occurrence::query()
            ->selectRaw('occurrence_type_id, region_id, COUNT(*) as total')
            ->whereIn('status', ['aberta', 'em_atendimento'])
            ->where('occurred_at', '>=', now()->subDay())
            ->groupBy('occurrence_type_id', 'region_id')
            ->havingRaw('COUNT(*) >= 2')
            ->get();

        foreach ($groups as $group) {
            $occurrences = Occurrence::query()
                ->with(['occurrenceType:id,name', 'region:id,name'])
                ->where('occurrence_type_id', $group->occurrence_type_id)
                ->where('region_id', $group->region_id)
                ->whereIn('status', ['aberta', 'em_atendimento'])
                ->where('occurred_at', '>=', now()->subDay())
                ->orderByDesc('occurred_at')
                ->get();

            $referenceOccurrence = $occurrences->first();

            if (! $referenceOccurrence) {
                continue;
            }

            $existingAlert = Alert::query()
                ->where('type', 'padrao_semelhante')
                ->where('occurrence_id', $referenceOccurrence->id)
                ->where('status', '!=', 'resolvido')
                ->exists();

            if ($existingAlert) {
                continue;
            }

            $severity = $this->defineSimilaritySeverity($occurrences);

            $alert = Alert::create([
                'occurrence_id' => $referenceOccurrence->id,
                'type' => 'padrao_semelhante',
                'title' => $this->buildSimilarityTitle($occurrences),
                'description' => $this->buildSimilarityDescription($occurrences),
                'severity' => $severity,
                'status' => 'aberto',
                'generated_by' => 'regra',
            ]);

            $createdAlerts[] = $alert->load('occurrence');
        }

        return $createdAlerts;
    }

    private function defineSimilaritySeverity($occurrences): string
    {
        if ($occurrences->contains('ai_priority', 'critica')) {
            return 'critico';
        }

        if ($occurrences->count() >= 3) {
            return 'alto';
        }

        return 'medio';
    }

    private function buildSimilarityTitle($occurrences): string
    {
        $first = $occurrences->first();

        return sprintf(
            '%s recorrente em %s',
            $first->occurrenceType->name,
            $first->region->name
        );
    }

    private function buildSimilarityDescription($occurrences): string
    {
        $first = $occurrences->first();

        return sprintf(
            'Foram identificadas %d ocorrencias do tipo %s na regiao %s nas ultimas 24 horas.',
            $occurrences->count(),
            $first->occurrenceType->name,
            $first->region->name
        );
    }
}