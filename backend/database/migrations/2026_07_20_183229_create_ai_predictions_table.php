<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_predictions', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('occurrence_id')
                ->constrained('occurrences');

            $table->string('model_name', 100);
            $table->string('predicted_priority', 20);
            $table->decimal('risk_score', 5, 2);
            $table->decimal('confidence_score', 5, 2)->nullable();
            $table->json('input_summary')->nullable();
            $table->text('explanation')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_predictions');
    }
};