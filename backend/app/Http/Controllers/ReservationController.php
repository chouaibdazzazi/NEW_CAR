<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Car;
use Carbon\Carbon;

class ReservationController extends Controller
{
    // 1. Permet au client de créer une réservation
    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        // Trouver la voiture pour récupérer son prix par jour
        $car = Car::findOrFail($request->car_id);

        // Calculer le nombre de jours de location
        $start = Carbon::parse($request->start_date);
        $end = Carbon::parse($request->end_date);
        $days = $start->diffInDays($end);
        if ($days === 0) $days = 1; // Minimum 1 jour

        // Calcul du prix total
        $totalPrice = $days * $car->price_per_day;

        // Insertion dans la table reservations
        $reservation = Reservation::create([
            'user_id' => auth()->id(), // Récupère l'ID du client connecté via le Token Sanctum
            'car_id' => $request->car_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => $totalPrice,
            'status' => 'En attente' // Statut par défaut
        ]);

        return response()->json([
            'message' => 'Réservation effectuée avec succès !',
            'reservation' => $reservation
        ], 201);
    }

    // 2. Permet d'afficher les réservations sur ta page Admin "ReservationList"
    public function index()
    {
        // On charge la réservation avec les infos du client (user) et de la voiture (car)
        $reservations = Reservation::with(['user', 'car'])->get();
        return response()->json($reservations);
    }
}
