<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Region>
 */
class RegionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->bothify('Regiao ####-????'),
            'city' => fake()->city(),
            'state' => fake()->randomElement([
                'SP',
                'RJ',
                'MG',
                'PR',
                'SC',
            ]),
            'risk_level' => fake()->numberBetween(1, 5),
            'center_latitude' => fake()->randomFloat(7, -23.7000000, -23.4000000),
            'center_longitude' => fake()->randomFloat(7, -46.8000000, -46.4000000),
        ];
    }
}
