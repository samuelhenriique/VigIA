<?php

namespace Database\Factories;

use App\Models\Occurrence;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Alert>
 */
class AlertFactory extends Factory
{
    public function definition(): array
    {
        return [
            'occurrence_id' => Occurrence::factory(),
            'type' => fake()->randomElement([
                'ocorrencias_semelhantes',
                'ocorrencia_critica',
            ]),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'severity' => fake()->randomElement([
                'baixo',
                'medio',
                'alto',
                'critico',
            ]),
            'status' => fake()->randomElement([
                'aberto',
                'visualizado',
                'resolvido',
            ]),
            'generated_by' => 'alert-service',
        ];
    }

    public function open(): static
    {
        return $this->state(fn (array $attributes): array => [
            'status' => 'aberto',
        ]);
    }

    public function critical(): static
    {
        return $this->state(fn (array $attributes): array => [
            'severity' => 'critico',
        ]);
    }
}
