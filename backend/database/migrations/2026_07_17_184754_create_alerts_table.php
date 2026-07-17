<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alerts', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('occurrence_id')
                ->nullable()
                ->constrained('occurrences');

            $table->string('type', 60);
            $table->string('title', 160);
            $table->text('description');
            $table->string('severity', 20);
            $table->string('status', 30);
            $table->string('generated_by', 60);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alerts');
    }
};