<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiPrediction extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'occurrence_id',
        'model_name',
        'predicted_priority',
        'risk_score',
        'confidence_score',
        'input_summary',
        'explanation',
        'created_at',
    ];

    protected $casts = [
        'input_summary' => 'array',
        'risk_score' => 'decimal:2',
        'confidence_score' => 'decimal:2',
        'created_at' => 'datetime',
    ];
}
