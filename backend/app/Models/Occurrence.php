<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Occurrence extends Model
{
    protected $fillable = [
        'occurrence_type_id',
        'region_id',
        'code',
        'title',
        'description',
        'status',
        'informed_severity',
        'human_priority',
        'ai_priority',
        'latitude',
        'longitude',
        'occurred_at',
        'response_time_minutes',
        'created_by',
    ];

    protected $hidden = [
        'geom',
    ];

    protected function casts(): array
    {
        return [
            'occurred_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
        ];
    }

    public function occurrenceType(): BelongsTo
    {
        return $this->belongsTo(OccurrenceType::class);
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function aiPredictions(): HasMany
    {
        return $this->hasMany(AiPrediction::class);
    }

    public function dispatches(): HasMany
    {
        return $this->hasMany(Dispatch::class);
    }
}
