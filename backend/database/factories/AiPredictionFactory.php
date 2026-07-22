<?php

namespace Database\Factories;

use App\Models\Occurrence;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\AiPrediction>
 */
class AiPredictionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'occurrence_id' => Occurrence::factory(),
            'model_name' => 'rules-v1',
            'predicted_priority' => fake()->randomElement([
                'baixa',
                'media',
                'alta',
                'critica',
            ]),
            'risk_score' => fake()->randomFloat(2, 0, 100),
            'confidence_score' => fake()->randomFloat(2, 0, 100),
            'input_summary' => [
                'tipo_ocorrencia' => fake()->word(),
                'regiao' => fake()->city(),
            ],
            'explanation' => fake()->sentence(),
            'created_at' => now(),
        ];
    }
}