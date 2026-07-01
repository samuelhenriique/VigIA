<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOccurrenceRequest extends FormRequest
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
        $occurrenceId = $this->route('occurrence');

        return [
            'occurrence_type_id' => ['sometimes', 'integer', 'exists:occurrence_types,id'],
            'region_id' => ['sometimes', 'integer', 'exists:regions,id'],
            'code' => [
                'sometimes',
                'string',
                'max:30',
                Rule::unique('occurrences', 'code')->ignore($occurrenceId),
            ],
            'title' => ['sometimes', 'string', 'max:160'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', 'in:aberta,em_atendimento,finalizada,cancelada'],
            'informed_severity' => ['sometimes', 'integer', 'between:1,5'],
            'human_priority' => ['nullable', 'in:baixa,media,alta,critica'],
            'ai_priority' => ['nullable', 'in:baixa,media,alta,critica'],
            'latitude' => ['sometimes', 'numeric', 'between:-90,90'],
            'longitude' => ['sometimes', 'numeric', 'between:-180,180'],
            'occurred_at' => ['sometimes', 'date'],
            'response_time_minutes' => ['nullable', 'integer', 'min:0'],
            'created_by' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}
