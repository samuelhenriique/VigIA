<?php

namespace Tests\Feature\Api;

use App\Models\Dispatch;
use App\Models\Occurrence;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DispatchTest extends TestCase
{
    use RefreshDatabase;

    public function test_dispatch_requires_authentication(): void
    {
        $this->postJson(
            '/api/occurrences/1/dispatches',
            [
                'vehicle_id' => 1,
            ],
        )->assertUnauthorized();
    }

    public function test_dispatch_can_be_confirmed(): void
    {
        $user = $this->authenticate();

        $occurrence = Occurrence::factory()->create([
            'created_by' => $user->id,
            'status' => 'aberta',
            'latitude' => -23.5505200,
            'longitude' => -46.6333080,
        ]);

        $vehicle = Vehicle::factory()->available()->create([
            'latitude' => -23.5605200,
            'longitude' => -46.6433080,
        ]);

        $response = $this->postJson(
            "/api/occurrences/{$occurrence->id}/dispatches",
            [
                'vehicle_id' => $vehicle->id,
            ],
        );

        $response
            ->assertCreated()
            ->assertJsonPath(
                'message',
                'Despacho confirmado com sucesso.',
            )
            ->assertJsonPath(
                'dispatch.occurrence_id',
                $occurrence->id,
            )
            ->assertJsonPath(
                'dispatch.vehicle_id',
                $vehicle->id,
            )
            ->assertJsonPath(
                'dispatch.assigned_by',
                $user->id,
            )
            ->assertJsonPath(
                'dispatch.status',
                'confirmado',
            )
            ->assertJsonPath(
                'dispatch.occurrence.id',
                $occurrence->id,
            )
            ->assertJsonPath(
                'dispatch.vehicle.id',
                $vehicle->id,
            );

        $this->assertDatabaseHas('dispatches', [
            'occurrence_id' => $occurrence->id,
            'vehicle_id' => $vehicle->id,
            'assigned_by' => $user->id,
            'status' => 'confirmado',
        ]);

        $this->assertDatabaseHas('occurrences', [
            'id' => $occurrence->id,
            'status' => 'em_atendimento',
        ]);

        $this->assertDatabaseHas('vehicles', [
            'id' => $vehicle->id,
            'status' => 'em_atendimento',
        ]);

        $dispatch = Dispatch::query()->firstOrFail();

        $this->assertNotNull($dispatch->assigned_at);

        $this->assertGreaterThan(
            0,
            (float) $dispatch->distance_km,
        );

        $this->assertGreaterThanOrEqual(
            1,
            $dispatch->estimated_arrival_minutes,
        );
    }

    public function test_nonexistent_vehicle_is_rejected(): void
    {
        $user = $this->authenticate();

        $occurrence = Occurrence::factory()->create([
            'created_by' => $user->id,
        ]);

        $this->postJson(
            "/api/occurrences/{$occurrence->id}/dispatches",
            [
                'vehicle_id' => 999999,
            ],
        )
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'vehicle_id',
            ])
            ->assertJsonPath(
                'errors.vehicle_id.0',
                'A viatura informada nao foi encontrada.',
            );

        $this->assertDatabaseCount('dispatches', 0);
    }

    public function test_unavailable_vehicle_is_rejected(): void
    {
        $user = $this->authenticate();

        $occurrence = Occurrence::factory()->create([
            'created_by' => $user->id,
        ]);

        $unavailableVehicles = [
            Vehicle::factory()->create([
                'status' => 'disponivel',
                'active' => false,
            ]),
            Vehicle::factory()->create([
                'status' => 'manutencao',
                'active' => true,
            ]),
        ];

        foreach ($unavailableVehicles as $vehicle) {
            $this->postJson(
                "/api/occurrences/{$occurrence->id}/dispatches",
                [
                    'vehicle_id' => $vehicle->id,
                ],
            )
                ->assertStatus(409)
                ->assertJsonPath(
                    'message',
                    'A viatura selecionada nao esta disponivel.',
                );
        }

        $this->assertDatabaseCount('dispatches', 0);
    }

    public function test_occurrence_with_confirmed_dispatch_is_rejected(): void
    {
        $user = $this->authenticate();

        $occurrence = Occurrence::factory()->create([
            'created_by' => $user->id,
        ]);

        $firstVehicle = Vehicle::factory()
            ->available()
            ->create();

        $secondVehicle = Vehicle::factory()
            ->available()
            ->create();

        Dispatch::create([
            'occurrence_id' => $occurrence->id,
            'vehicle_id' => $firstVehicle->id,
            'assigned_by' => $user->id,
            'status' => 'confirmado',
            'distance_km' => 2.50,
            'estimated_arrival_minutes' => 5,
            'assigned_at' => now(),
            'completed_at' => null,
        ]);

        $this->postJson(
            "/api/occurrences/{$occurrence->id}/dispatches",
            [
                'vehicle_id' => $secondVehicle->id,
            ],
        )
            ->assertStatus(409)
            ->assertJsonPath(
                'message',
                'Esta ocorrencia ja possui um despacho confirmado.',
            );

        $this->assertDatabaseCount('dispatches', 1);
    }

    public function test_vehicle_with_confirmed_dispatch_is_rejected(): void
    {
        $user = $this->authenticate();

        $firstOccurrence = Occurrence::factory()->create([
            'created_by' => $user->id,
        ]);

        $secondOccurrence = Occurrence::factory()->create([
            'created_by' => $user->id,
        ]);

        $vehicle = Vehicle::factory()
            ->available()
            ->create();

        Dispatch::create([
            'occurrence_id' => $firstOccurrence->id,
            'vehicle_id' => $vehicle->id,
            'assigned_by' => $user->id,
            'status' => 'confirmado',
            'distance_km' => 2.50,
            'estimated_arrival_minutes' => 5,
            'assigned_at' => now(),
            'completed_at' => null,
        ]);

        $this->postJson(
            "/api/occurrences/{$secondOccurrence->id}/dispatches",
            [
                'vehicle_id' => $vehicle->id,
            ],
        )
            ->assertStatus(409)
            ->assertJsonPath(
                'message',
                'A viatura selecionada ja possui um despacho confirmado.',
            );

        $this->assertDatabaseCount('dispatches', 1);
    }

    private function authenticate(): User
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        return $user;
    }
}
