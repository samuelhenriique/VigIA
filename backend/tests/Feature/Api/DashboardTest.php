<?php

namespace Tests\Feature\Api;

use App\Models\Alert;
use App\Models\Occurrence;
use App\Models\OccurrenceType;
use App\Models\Region;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_requires_authentication(): void
    {
        $this->getJson('/api/dashboard/summary')
            ->assertUnauthorized();
    }

    public function test_dashboard_returns_operational_summary(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $typeA = OccurrenceType::factory()->create([
            'name' => 'Roubo',
        ]);

        $typeB = OccurrenceType::factory()->create([
            'name' => 'Acidente',
        ]);

        $regionA = Region::factory()->create([
            'name' => 'Centro',
        ]);

        $regionB = Region::factory()->create([
            'name' => 'Zona Norte',
        ]);

        $occurrenceA = Occurrence::factory()->create([
            'occurrence_type_id' => $typeA->id,
            'region_id' => $regionA->id,
            'created_by' => $user->id,
            'status' => 'aberta',
            'ai_priority' => 'alta',
        ]);

        $occurrenceB = Occurrence::factory()->create([
            'occurrence_type_id' => $typeA->id,
            'region_id' => $regionA->id,
            'created_by' => $user->id,
            'status' => 'em_atendimento',
            'ai_priority' => 'critica',
        ]);

        $occurrenceC = Occurrence::factory()->create([
            'occurrence_type_id' => $typeB->id,
            'region_id' => $regionB->id,
            'created_by' => $user->id,
            'status' => 'finalizada',
            'ai_priority' => 'baixa',
        ]);

        Vehicle::factory()->available()->create([
            'region_id' => $regionA->id,
        ]);

        Vehicle::factory()->create([
            'region_id' => $regionA->id,
            'status' => 'em_atendimento',
            'active' => true,
        ]);

        Vehicle::factory()->inactive()->create([
            'region_id' => $regionB->id,
            'status' => 'manutencao',
        ]);

        Alert::factory()->open()->critical()->create([
            'occurrence_id' => $occurrenceA->id,
        ]);

        Alert::factory()->create([
            'occurrence_id' => $occurrenceB->id,
            'status' => 'visualizado',
            'severity' => 'alto',
        ]);

        Alert::factory()->create([
            'occurrence_id' => $occurrenceC->id,
            'status' => 'resolvido',
            'severity' => 'medio',
        ]);

        $response = $this->getJson('/api/dashboard/summary');

        $response
            ->assertOk()
            ->assertJsonPath('occurrences.total', 3)
            ->assertJsonPath('vehicles.total', 3)
            ->assertJsonPath('vehicles.active', 2)
            ->assertJsonPath('alerts.total', 3)
            ->assertJsonPath('alerts.open', 1)
            ->assertJsonCount(3, 'occurrences.by_status')
            ->assertJsonCount(3, 'occurrences.by_priority')
            ->assertJsonCount(2, 'occurrences.by_type')
            ->assertJsonCount(2, 'occurrences.by_region')
            ->assertJsonCount(3, 'vehicles.by_status')
            ->assertJsonCount(3, 'alerts.by_status')
            ->assertJsonCount(3, 'alerts.by_severity')
            ->assertJsonFragment([
                'name' => 'Roubo',
                'total' => 2,
            ])
            ->assertJsonFragment([
                'name' => 'Centro',
                'total' => 2,
            ]);
    }
}