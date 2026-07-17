<?php

namespace Tests\Feature\Api;

use App\Models\Region;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class VehicleTest extends TestCase
{
    use RefreshDatabase;

    public function test_vehicles_require_authentication(): void
    {
        $this->getJson('/api/vehicles')
            ->assertUnauthorized();
    }

    public function test_vehicles_can_be_filtered(): void
    {
        $this->authenticate();
        $region = Region::factory()->create();

        $expected = Vehicle::factory()->available()->create([
            'region_id' => $region->id,
        ]);

        Vehicle::factory()->create([
            'status' => 'manutencao',
            'active' => false,
        ]);

        $response = $this->getJson(
            "/api/vehicles?status=disponivel"
            ."&region_id={$region->id}"
            .'&active=1'
        );

        $response
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.id', $expected->id)
            ->assertJsonPath('0.region.id', $region->id);
    }

    public function test_available_endpoint_returns_only_active_available_vehicles(): void
    {
        $this->authenticate();

        $expected = Vehicle::factory()->available()->create();

        Vehicle::factory()->inactive()->create([
            'status' => 'disponivel',
        ]);

        Vehicle::factory()->create([
            'status' => 'em_atendimento',
            'active' => true,
        ]);

        $this->getJson('/api/vehicles/available')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.id', $expected->id)
            ->assertJsonPath('0.status', 'disponivel')
            ->assertJsonPath('0.active', true);
    }

    public function test_vehicle_details_can_be_viewed(): void
    {
        $this->authenticate();

        $vehicle = Vehicle::factory()->create();

        $this->getJson("/api/vehicles/{$vehicle->id}")
            ->assertOk()
            ->assertJsonPath('id', $vehicle->id)
            ->assertJsonPath('code', $vehicle->code)
            ->assertJsonPath('region.id', $vehicle->region_id);
    }

    public function test_vehicle_can_be_created(): void
    {
        $this->authenticate();
        $region = Region::factory()->create();

        $payload = [
            'region_id' => $region->id,
            'code' => 'VTR-TEST-001',
            'team_name' => 'Equipe Alfa',
            'status' => 'disponivel',
            'patrol_type' => 'patrulhamento',
            'latitude' => -23.5505200,
            'longitude' => -46.6333080,
            'active' => true,
        ];

        $this->postJson('/api/vehicles', $payload)
            ->assertCreated()
            ->assertJsonPath('code', 'VTR-TEST-001')
            ->assertJsonPath('status', 'disponivel')
            ->assertJsonPath('active', true)
            ->assertJsonPath('region.id', $region->id);

        $this->assertDatabaseHas('vehicles', [
            'code' => 'VTR-TEST-001',
            'team_name' => 'Equipe Alfa',
            'status' => 'disponivel',
            'active' => true,
        ]);
    }

    public function test_invalid_vehicle_is_rejected(): void
    {
        $this->authenticate();

        $this->postJson('/api/vehicles', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'code',
                'status',
                'latitude',
                'longitude',
            ]);
    }

    public function test_vehicle_can_be_updated(): void
    {
        $this->authenticate();

        $vehicle = Vehicle::factory()->available()->create([
            'team_name' => 'Equipe Original',
        ]);

        $this->patchJson("/api/vehicles/{$vehicle->id}", [
            'team_name' => 'Equipe Atualizada',
            'status' => 'em_atendimento',
        ])
            ->assertOk()
            ->assertJsonPath('team_name', 'Equipe Atualizada')
            ->assertJsonPath('status', 'em_atendimento');

        $this->assertDatabaseHas('vehicles', [
            'id' => $vehicle->id,
            'team_name' => 'Equipe Atualizada',
            'status' => 'em_atendimento',
        ]);
    }

    public function test_vehicle_can_be_deleted(): void
    {
        $this->authenticate();

        $vehicle = Vehicle::factory()->create();

        $this->deleteJson("/api/vehicles/{$vehicle->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('vehicles', [
            'id' => $vehicle->id,
        ]);
    }

    private function authenticate(): User
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        return $user;
    }
}