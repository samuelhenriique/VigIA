<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $vehicleId = $this->route('vehicle');

        return [
            'region_id' => ['nullable', 'integer', 'exists:regions,id'],
            'code' => [
                'sometimes',
                'string',
                'max:30',
                Rule::unique('vehicles', 'code')->ignore($vehicleId),
            ],
            'team_name' => ['nullable', 'string', 'max:100'],
            'status' => ['sometimes', 'in:disponivel,em_atendimento,indisponivel,manutencao'],
            'patrol_type' => ['nullable', 'string', 'max:60'],
            'latitude' => ['sometimes', 'numeric', 'between:-90,90'],
            'longitude' => ['sometimes', 'numeric', 'between:-180,180'],
            'active' => ['sometimes', 'boolean'],
        ];
    }
}
