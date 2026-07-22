<?php

return [
    'required' => 'O campo :attribute e obrigatorio.',
    'integer' => 'O campo :attribute deve ser um numero inteiro.',
    'numeric' => 'O campo :attribute deve ser numerico.',
    'string' => 'O campo :attribute deve ser um texto.',
    'date' => 'O campo :attribute deve conter uma data valida.',
    'exists' => 'O valor selecionado para :attribute e invalido.',
    'unique' => 'O valor informado para :attribute ja esta em uso.',
    'in' => 'O valor selecionado para :attribute e invalido.',

    'between' => [
        'numeric' => 'O campo :attribute deve estar entre :min e :max.',
    ],

    'max' => [
        'string' => 'O campo :attribute nao pode ter mais de :max caracteres.',
    ],

    'min' => [
        'numeric' => 'O campo :attribute deve ser pelo menos :min.',
    ],

    'attributes' => [
        'occurrence_type_id' => 'tipo da ocorrencia',
        'region_id' => 'regiao',
        'code' => 'codigo',
        'title' => 'titulo',
        'description' => 'descricao',
        'status' => 'status',
        'informed_severity' => 'gravidade informada',
        'human_priority' => 'prioridade humana',
        'latitude' => 'latitude',
        'longitude' => 'longitude',
        'occurred_at' => 'data e hora da ocorrencia',
        'response_time_minutes' => 'tempo de resposta',
        'created_by' => 'criado por',
    ],
];