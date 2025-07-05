<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{

    Schema::create('produits', function (Blueprint $table) {
    $table->id();
    $table->string('nom');
    $table->decimal('prix', 8, 2);
    $table->unsignedTinyInteger('note')->default(0); // rating sur 5
    $table->integer('promotion')->nullable(); // en pourcentage
    $table->string('image')->nullable(); // image filename
    $table->foreignId('categorie_id')->constrained('categories')->onDelete('cascade');
    $table->timestamps();
});
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
