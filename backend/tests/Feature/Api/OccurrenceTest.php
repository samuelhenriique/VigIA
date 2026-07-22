<?php

namespace Tests\Feature\Api;

use App\Models\AiPrediction;
use App\Models\Alert;
use App\Models\Occurrence;
use App\Models\OccurrenceType;
use App\Models\Region;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class OccurrenceTest extends TestCase
{
    use RefreshDatabase;

    public function test_occurrences_require_authentication(): void
    {
        $this->getJson('/api/occurrences')
            ->assertUnauthorized();
    }

    public function test_occurrences_can_be_filtered(): void
    {
        $user = $this->authenticate();
        $type = OccurrenceType::factory()->create();
        $region = Region::factory()->create();

        $expected = Occurrence::factory()->create([
            'occurrence_type_id' => $type->id,
            'region_id' => $region->id,
            'created_by' => $user->id,
            'status' => 'aberta',
            'ai_priority' => 'alta',
        ]);

        Occurrence::factory()->create([
            'created_by' => $user->id,
            'status' => 'finalizada',
            'ai_priority' => 'baixa',
        ]);

        $response = $this->getJson(
            "/api/occurrences?status=aberta"
            ."&occurrence_type_id={$type->id}"
            ."&region_id={$region->id}"
            .'&ai_priority=alta'
        );

        $response
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.id', $expected->id)
            ->assertJsonPath('0.occurrence_type.id', $type->id)
            ->assertJsonPath('0.region.id', $region->id);
    }

    public function test_occurrence_details_can_be_viewed(): void
    {
        $user = $this->authenticate();

        $occurrence = Occurrence::factory()->create([
            'created_by' => $user->id,
        ]);

        $olderPrediction = AiPrediction::factory()->create([
            'occurrence_id' => $occurrence->id,
            'model_name' => 'rules-v1',
            'predicted_priority' => 'media',
            'created_at' => now()->subMinute(),
        ]);

        $newerPrediction = AiPrediction::factory()->create([
            'occurrence_id' => $occurrence->id,
            'model_name' => 'sklearn-logistic-regression-v1',
            'predicted_priority' => 'alta',
            'created_at' => now(),
        ]);

        $olderAlert = Alert::factory()->create([
            'occurrence_id' => $occurrence->id,
            'title' => 'Alerta mais antigo',
            'created_at' => now()->subMinute(),
        ]);

        $newerAlert = Alert::factory()->create([
            'occurrence_id' => $occurrence->id,
            'title' => 'Alerta mais recente',
            'created_at' => now(),
        ]);

        Alert::factory()->create([
            'title' => 'Alerta de outra ocorrencia',
        ]);

        $this->getJson("/api/occurrences/{$occurrence->id}")
            ->assertOk()
            ->assertJsonPath('id', $occurrence->id)
            ->assertJsonPath(
                'occurrence_type.id',
                $occurrence->occurrence_type_id
            )
            ->assertJsonPath('region.id', $occurrence->region_id)
            ->assertJsonPath('created_by.id', $user->id)
            ->assertJsonCount(2, 'ai_predictions')
            ->assertJsonPath('ai_predictions.0.id', $newerPrediction->id)
            ->assertJsonPath('ai_predictions.0.predicted_priority', 'alta')
            ->assertJsonPath('ai_predictions.1.id', $olderPrediction->id)
            ->assertJsonPath('ai_predictions.1.predicted_priority', 'media')
            ->assertJsonCount(2, 'alerts')
            ->assertJsonPath('alerts.0.id', $newerAlert->id)
            ->assertJsonPath('alerts.0.title', 'Alerta mais recente')
            ->assertJsonPath('alerts.1.id', $olderAlert->id)
            ->assertJsonPath('alerts.1.title', 'Alerta mais antigo');
    }

    public function test_occurrence_can_be_created(): void
    {
        $user = $this->authenticate();
        $type = OccurrenceType::factory()->create();
        $region = Region::factory()->create();

        $payload = [
            'occurrence_type_id' => $type->id,
            'region_id' => $region->id,
            'code' => 'OCO-TEST-001',
            'title' => 'Ocorrencia criada no teste',
            'description' => 'Descricao controlada para o teste.',
            'status' => 'aberta',
            'informed_severity' => 4,
            'human_priority' => 'alta',
            'latitude' => -23.5505200,
            'longitude' => -46.6333080,
            'occurred_at' => '2026-07-17 10:00:00',
            'created_by' => $user->id,
        ];

        $this->postJson('/api/occurrences', $payload)
            ->assertCreated()
            ->assertJsonPath('code', 'OCO-TEST-001')
            ->assertJsonPath('status', 'aberta')
            ->assertJsonPath('occurrence_type.id', $type->id)
            ->assertJsonPath('region.id', $region->id);

        $this->assertDatabaseHas('occurrences', [
            'code' => 'OCO-TEST-001',
            'title' => 'Ocorrencia criada no teste',
            'status' => 'aberta',
        ]);
    }

    public function test_invalid_occurrence_is_rejected(): void
    {
        $this->authenticate();

        $this->postJson('/api/occurrences', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'occurrence_type_id',
                'region_id',
                'code',
                'title',
                'status',
                'informed_severity',
                'latitude',
                'longitude',
                'occurred_at',
            ]);
    }

    public function test_occurrence_can_be_updated(): void
    {
        $user = $this->authenticate();

        $occurrence = Occurrence::factory()->create([
            'created_by' => $user->id,
            'status' => 'aberta',
            'title' => 'Titulo original',
        ]);

        $this->patchJson("/api/occurrences/{$occurrence->id}", [
            'title' => 'Titulo atualizado',
            'status' => 'em_atendimento',
            'ai_priority' => 'critica',
        ])
            ->assertOk()
            ->assertJsonPath('title', 'Titulo atualizado')
            ->assertJsonPath('status', 'em_atendimento')
            ->assertJsonPath('ai_priority', 'critica');

        $this->assertDatabaseHas('occurrences', [
            'id' => $occurrence->id,
            'title' => 'Titulo atualizado',
            'status' => 'em_atendimento',
            'ai_priority' => 'critica',
        ]);
    }

    public function test_occurrence_can_be_deleted(): void
    {
        $user = $this->authenticate();

        $occurrence = Occurrence::factory()->create([
            'created_by' => $user->id,
        ]);

        $this->deleteJson("/api/occurrences/{$occurrence->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('occurrences', [
            'id' => $occurrence->id,
        ]);
    }

    private function authenticate(): User
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        return $user;
    }
}
