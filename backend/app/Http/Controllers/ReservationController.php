<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Car;
use Carbon\Carbon;

class ReservationController extends Controller
{
    /**
     * Créer une nouvelle réservation pour l'utilisateur connecté.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validation stricte
        $validated = $request->validate([
            'car_id' => 'required|integer|exists:cars,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ], [
            'car_id.required' => 'L\'ID de la voiture est requis.',
            'car_id.exists' => 'La voiture sélectionnée n\'existe pas.',
            'start_date.after_or_equal' => 'La date de début ne peut pas être dans le passé.',
            'end_date.after' => 'La date de fin doit être après la date de début.',
        ]);

        // Récupérer la voiture pour obtenir son prix par jour
        $car = Car::findOrFail($validated['car_id']);

        // Calculer le nombre exact de jours
        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);

        // diffInDays compte les jours complets, donc du 1er au 2 = 1 jour
        $numberOfDays = $startDate->diffInDays($endDate);
        if ($numberOfDays === 0) {
            $numberOfDays = 1; // Minimum 1 jour de location
        }

        // Calcul du prix total
        $totalPrice = $numberOfDays * $car->price_per_day;

        // Créer la réservation
        $reservation = Reservation::create([
            'user_id' => auth()->id(), // ID du client connecté via Sanctum
            'car_id' => $validated['car_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'total_price' => $totalPrice,
            'status' => 'pending', // Statut par défaut
        ]);

        // Charger les relations (user, car) pour la réponse
        $reservation->load(['user', 'car']);

        return response()->json([
            'message' => 'Réservation effectuée avec succès !',
            'reservation' => $reservation,
        ], 201);
    }

    /**
     * Récupérer toutes les réservations (pour l'admin).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $reservations = Reservation::with(['user', 'car'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reservations, 200);
    }

    /**
     * Récupérer les réservations de l'utilisateur connecté.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function myReservations(Request $request)
    {
        $user = $request->user();

        $reservations = $user->reservations()
            ->with('car')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reservations, 200);
    }
}
