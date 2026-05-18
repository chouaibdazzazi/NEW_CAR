<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('cars', function (Blueprint $table) {
        $table->id();
        $table->string('brand');           // marque ex: Toyota
        $table->string('model');           // modèle ex: Corolla
        $table->integer('year');
        $table->decimal('price_per_day', 8, 2);
        $table->boolean('available')->default(true);
        $table->string('image_url')->nullable();
        $table->string('color')->nullable();
        $table->integer('seats')->default(5);
        $table->text('description')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }


};
