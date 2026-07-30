<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ConfirmDispatchRequest extends FormRequest
{
    /**
     * Indica se o usuario pode realizar esta requisicao.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Regras de validacao.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'vehicle_id' => [
                'required',
                'integer',
                'exists:vehicles,id',
            ],
        ];
    }

    /**
     * Mensagens de validacao em portugues.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'vehicle_id.required' => 'A viatura deve ser informada.',
            'vehicle_id.integer' => 'A viatura informada e invalida.',
            'vehicle_id.exists' => 'A viatura informada nao foi encontrada.',
        ];
    }

    /**
     * Nomes amigaveis dos campos.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'vehicle_id' => 'viatura',
        ];
    }
}