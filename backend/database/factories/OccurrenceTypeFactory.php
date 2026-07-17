<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\OccurrenceType>
 */
class OccurrenceTypeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->bothify('Tipo ####-????'),
            'default_severity' => fake()->numberBetween(1, 5),
            'active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes): array => [
            'active' => false,
        ]);
    }
}
