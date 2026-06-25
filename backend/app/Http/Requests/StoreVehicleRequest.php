<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
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
        return [
            'region_id' => ['nullable', 'integer', 'exists:regions,id'],
            'code' => ['required', 'string', 'max:30', 'unique:vehicles,code'],
            'team_name' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:disponivel,em_atendimento,indisponivel,manutencao'],
            'patrol_type' => ['nullable', 'string', 'max:60'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'active' => ['sometimes', 'boolean'],
        ];
    }
}
