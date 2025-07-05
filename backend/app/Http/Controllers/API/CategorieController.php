<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    // Get all categories
    public function index()
    {
        $categories = Categorie::all();
        return response()->json(['categories' => $categories]);
    }

    // Create a new categorie
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255|unique:categories,nom',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $categorie = Categorie::create($request->only('nom'));

        return response()->json([
            'message' => 'categorie created successfully',
            'categorie' => $categorie
        ], 201);
    }

    // Get a single categorie
    public function show(Categorie $categorie)
    {
        return response()->json(['categorie' => $categorie]);
    }

    // Update a categorie
    public function update(Request $request, Categorie $categorie)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255|unique:categories,nom,'.$categorie->id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $categorie->update($request->only('nom'));

        return response()->json([
            'message' => 'categorie updated successfully',
            'categorie' => $categorie
        ]);
    }

    // Delete a categorie
public function destroy(Categorie $categorie)
{
    \Log::info('DELETE catégorie : ' . $categorie->id);
    $categorie->delete();

    return response()->json([
        'message' => 'categorie deleted successfully'
    ]);
}


public function produitsParCategorie($id)
{
    $categorie = Categorie::findOrFail($id);
    $produits = $categorie->produits; // Assure-toi d'avoir la relation définie
    return response()->json(['produits' => $produits]);
}
}