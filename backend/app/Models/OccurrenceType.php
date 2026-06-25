<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class OccurrenceType extends Model
{
    protected $table = 'occurrence_types';

    protected function casts(): array
    {
        return [
            'default_severity' => 'integer',
            'active' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function occurrences(): HasMany
    {
        return $this->hasMany(Occurrence::class);
    }
}
