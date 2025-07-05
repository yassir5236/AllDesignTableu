<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produit;

class ProduitController extends Controller
{
    public function index()
    {
        return response()->json(['produits' => Produit::with('categorie')->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'note' => 'nullable|integer|min:0|max:5',
            'promotion' => 'nullable|integer|min:0|max:100',
            'categorie_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $filename = time() . '.' . $request->image->extension();
            $request->image->storeAs('public/images', $filename);
            $validated['image'] = 'images/' . $filename;
        }

        $produit = Produit::create($validated);
        return response()->json(['message' => 'Produit créé', 'produit' => $produit], 201);
    }

    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);

        // Optional: delete image file from storage if needed
        if ($produit->image) {
            \Storage::delete('public/' . $produit->image);
        }

        $produit->delete();

        return response()->json(['message' => 'Produit supprimé avec succès']);
    }

    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        // Log the incoming request data for debugging
        \Log::info('Update request data:', $request->all());

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'note' => 'nullable|integer|min:0|max:5',
            'promotion' => 'nullable|integer|min:0|max:100',
            'categorie_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
        ]);

        // Si une nouvelle image est uploadée, supprimer l'ancienne et stocker la nouvelle
        if ($request->hasFile('image')) {
            // Supprimer ancienne image si elle existe
            if ($produit->image) {
                \Storage::delete('public/' . $produit->image);
            }

            $filename = time() . '.' . $request->image->extension();
            $request->image->storeAs('public/images', $filename);
            $validated['image'] = 'images/' . $filename;
        }

        $produit->update($validated);

        return response()->json(['message' => 'Produit mis à jour avec succès', 'produit' => $produit]);
    }

    public function show($id)
    {
        $produit = Produit::find($id);

        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        return response()->json(['produit' => $produit]);
    }
}