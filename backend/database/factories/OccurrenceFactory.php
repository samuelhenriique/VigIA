<?php

namespace Database\Factories;

use App\Models\OccurrenceType;
use App\Models\Region;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Occurrence>
 */
class OccurrenceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'occurrence_type_id' => OccurrenceType::factory(),
            'region_id' => Region::factory(),
            'code' => fake()->unique()->bothify('OCO-######'),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'status' => fake()->randomElement([
                'aberta',
                'em_atendimento',
                'finalizada',
                'cancelada',
            ]),
            'informed_severity' => fake()->numberBetween(1, 5),
            'human_priority' => fake()->randomElement([
                null,
                'baixa',
                'media',
                'alta',
                'critica',
            ]),
            'ai_priority' => fake()->randomElement([
                null,
                'baixa',
                'media',
                'alta',
                'critica',
            ]),
            'latitude' => fake()->randomFloat(7, -23.7000000, -23.4000000),
            'longitude' => fake()->randomFloat(7, -46.8000000, -46.4000000),
            'occurred_at' => fake()->dateTimeBetween('-30 days', 'now'),
            'response_time_minutes' => fake()->optional()->numberBetween(1, 120),
            'created_by' => User::factory(),
        ];
    }
}
