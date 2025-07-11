<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'prix',
        'note',
        'promotion',
        'image',
        'categorie_id',
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function dimensions()
    {
        return $this->belongsToMany(Dimension::class, 'dimension_produit');
    }
}
