<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dispatches', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('occurrence_id')
                ->constrained('occurrences');

            $table->foreignId('vehicle_id')
                ->constrained('vehicles');

            $table->foreignId('assigned_by')
                ->nullable()
                ->constrained('users');

            $table->string('status', 30);

            $table->decimal('distance_km', 8, 2)
                ->nullable();

            $table->unsignedInteger('estimated_arrival_minutes')
                ->nullable();

            $table->timestamp('assigned_at')
                ->nullable();

            $table->timestamp('completed_at')
                ->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dispatches');
    }
};
