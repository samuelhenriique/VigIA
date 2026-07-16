<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dispatch extends Model
{
    protected $fillable = [
        'occurrence_id',
        'vehicle_id',
        'assigned_by',
        'status',
        'distance_km',
        'estimated_arrival_minutes',
        'assigned_at',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'distance_km' => 'decimal:2',
            'assigned_at' => 'datetime',
            'completed_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function occurrence(): BelongsTo
    {
        return $this->belongsTo(Occurrence::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}