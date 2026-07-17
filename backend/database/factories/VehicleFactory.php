<?php

namespace Database\Factories;

use App\Models\Region;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'region_id' => Region::factory(),
            'code' => fake()->unique()->bothify('VTR-####'),
            'team_name' => 'Equipe '.fake()->bothify('##-??'),
            'status' => fake()->randomElement([
                'disponivel',
                'em_atendimento',
                'indisponivel',
                'manutencao',
            ]),
            'patrol_type' => fake()->randomElement([
                'patrulhamento',
                'tatico',
                'transito',
            ]),
            'latitude' => fake()->randomFloat(7, -23.7000000, -23.4000000),
            'longitude' => fake()->randomFloat(7, -46.8000000, -46.4000000),
            'active' => true,
        ];
    }

    public function available(): static
    {
        return $this->state(fn (array $attributes): array => [
            'status' => 'disponivel',
            'active' => true,
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes): array => [
            'active' => false,
        ]);
    }
}
