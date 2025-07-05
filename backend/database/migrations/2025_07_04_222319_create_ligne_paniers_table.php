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
    Schema::create('ligne_paniers', function (Blueprint $table) {
        $table->id();
        $table->foreignId('panier_id')->constrained('paniers')->onDelete('cascade');
        $table->foreignId('produit_id')->constrained('produits')->onDelete('cascade');
        $table->integer('quantite');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ligne_paniers');
    }
};
