<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('occurrences', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('occurrence_type_id')
                ->constrained('occurrence_types');

            $table->foreignId('region_id')
                ->constrained('regions');

            $table->string('code', 30)->unique();
            $table->string('title', 160);
            $table->text('description')->nullable();
            $table->string('status', 30);
            $table->unsignedTinyInteger('informed_severity');
            $table->string('human_priority', 20)->nullable();
            $table->string('ai_priority', 20)->nullable();
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->timestamp('occurred_at');
            $table->unsignedInteger('response_time_minutes')->nullable();

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('occurrences');
    }
};