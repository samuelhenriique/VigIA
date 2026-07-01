<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreOccurrenceRequest extends FormRequest
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
            'occurrence_type_id' => ['required', 'integer', 'exists:occurrence_types,id'],
            'region_id' => ['required', 'integer', 'exists:regions,id'],
            'code' => ['required', 'string', 'max:30', 'unique:occurrences,code'],
            'title' => ['required', 'string', 'max:160'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:aberta,em_atendimento,finalizada,cancelada'],
            'informed_severity' => ['required', 'integer', 'between:1,5'],
            'human_priority' => ['nullable', 'in:baixa,media,alta,critica'],
            'ai_priority' => ['nullable', 'in:baixa,media,alta,critica'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'occurred_at' => ['required', 'date'],
            'response_time_minutes' => ['nullable', 'integer', 'min:0'],
            'created_by' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}
