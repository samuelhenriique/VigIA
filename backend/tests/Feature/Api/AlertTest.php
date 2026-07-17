<?php

namespace Tests\Feature\Api;

use App\Models\Alert;
use App\Models\Occurrence;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AlertTest extends TestCase
{
    use RefreshDatabase;

    public function test_alert_routes_require_authentication(): void
    {
        $this->getJson('/api/alerts')
            ->assertUnauthorized();

        $this->postJson('/api/alerts/generate')
            ->assertUnauthorized();
    }

    public function test_alerts_can_be_filtered_and_include_occurrence_details(): void
    {
        $this->authenticate();

        $occurrence = Occurrence::factory()->create();

        $expected = Alert::factory()->open()->critical()->create([
            'occurrence_id' => $occurrence->id,
            'type' => 'ocorrencia_critica',
        ]);

        Alert::factory()->create([
            'status' => 'resolvido',
            'severity' => 'baixo',
            'type' => 'ocorrencias_semelhantes',
        ]);

        $response = $this->getJson(
            '/api/alerts?status=aberto'
            .'&severity=critico'
            .'&type=ocorrencia_critica'
        );

        $response
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.id', $expected->id)
            ->assertJsonPath('0.status', 'aberto')
            ->assertJsonPath('0.severity', 'critico')
            ->assertJsonPath('0.type', 'ocorrencia_critica')
            ->assertJsonPath('0.occurrence.id', $occurrence->id)
            ->assertJsonPath(
                '0.occurrence.occurrence_type.id',
                $occurrence->occurrence_type_id
            )
            ->assertJsonPath(
                '0.occurrence.region.id',
                $occurrence->region_id
            );
    }

    public function test_alerts_are_ordered_by_operational_status(): void
    {
        $this->authenticate();

        $resolved = Alert::factory()->create([
            'status' => 'resolvido',
        ]);

        $viewed = Alert::factory()->create([
            'status' => 'visualizado',
        ]);

        $open = Alert::factory()->create([
            'status' => 'aberto',
        ]);

        $this->getJson('/api/alerts')
            ->assertOk()
            ->assertJsonCount(3)
            ->assertJsonPath('0.id', $open->id)
            ->assertJsonPath('1.id', $viewed->id)
            ->assertJsonPath('2.id', $resolved->id);
    }

    private function authenticate(): User
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        return $user;
    }
}
