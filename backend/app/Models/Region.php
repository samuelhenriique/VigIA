<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Region extends Model
{
    use HasFactory;

    protected $hidden = [
        'geom',
    ];

    protected function casts(): array
    {
        return [
            'risk_level' => 'integer',
            'center_latitude' => 'decimal:7',
            'center_longitude' => 'decimal:7',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function occurrences(): HasMany
    {
        return $this->hasMany(Occurrence::class);
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }
}
