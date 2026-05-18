<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    public function index()
    {
        return response()->json(Car::all());
    }

    public function show(int $id)
    {
        return response()->json(Car::findOrFail($id));
    }

    public function store(Request $request)
    {
        // 1. Validation : On valide le fichier binaire "image" transmis par le formulaire
        $validatedData = $request->validate([
            'brand'         => 'required|string',
            'model'         => 'required|string',
            'year'          => 'required|integer',
            'price_per_day' => 'required|numeric',
            'color'         => 'nullable|string',
            'seats'         => 'nullable|integer',
            'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Fichier image requis
            'description'   => 'nullable|string',
        ]);

        // Retirer temporairement l'objet image pour ne pas faire planter le create() direct
        unset($validatedData['image']);

        // 2. Traitement du fichier image et génération de l'URL pour Supabase
        if ($request->hasFile('image')) {
            // Stocke l'image dans storage/app/public/cars
            $path = $request->file('image')->store('cars', 'public');
            // Affecte l'URL publique complète à ta colonne de base de données `image_url`
            $validatedData['image_url'] = asset('storage/' . $path);
        } else {
            $validatedData['image_url'] = null;
        }

        // Par défaut, une nouvelle voiture est disponible à la location
        $validatedData['available'] = true;

        $car = Car::create($validatedData);
        return response()->json($car, 201);
    }

    public function update(Request $request, int $id)
    {
        $car = Car::findOrFail($id);

        $validatedData = $request->validate([
            'brand'         => 'required|string',
            'model'         => 'required|string',
            'year'          => 'required|integer',
            'price_per_day' => 'required|numeric',
            'color'         => 'nullable|string',
            'seats'         => 'nullable|integer',
            'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'description'   => 'nullable|string',
            'available'     => 'nullable|boolean'
        ]);

        unset($validatedData['image']);

        if ($request->hasFile('image')) {
            // Nettoyage de l'ancienne image locale s'il y en avait une
            if ($car->image_url) {
                $oldPath = str_replace(asset('storage/'), '', $car->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('cars', 'public');
            $validatedData['image_url'] = asset('storage/' . $path);
        }

        $car->update($validatedData);
        return response()->json($car);
    }

    public function destroy(int $id)
    {
        $car = Car::findOrFail($id);

        if ($car->image_url) {
            $oldPath = str_replace(asset('storage/'), '', $car->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $car->delete();
        return response()->json(['message' => 'Voiture supprimée']);
    }

    public function toggleAvailability(int $id)
    {
        $car = Car::findOrFail($id);
        $car->available = !$car->available; // Correspond à ta colonne 'available' b... (boolean)
        $car->save();
        return response()->json($car);
    }
}
