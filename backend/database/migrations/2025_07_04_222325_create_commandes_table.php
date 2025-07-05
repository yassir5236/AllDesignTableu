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
    Schema::create('commandes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
        $table->timestamp('date_commande')->useCurrent();
        $table->enum('statut', ['en_attente', 'livree'])->default('en_attente');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
