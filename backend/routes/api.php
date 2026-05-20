<?php
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;

// ──────────────────────────────────────
// ROUTES PUBLIQUES
// ──────────────────────────────────────

// Email verification
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return response()->json(['message' => 'Votre e-mail a été vérifié avec succès !']);
})->middleware(['signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Lien de vérification renvoyé !']);
})->middleware(['auth:sanctum'])->name('verification.send');

// Auth publique
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Voitures publiques
Route::get('/cars',      [CarController::class, 'index']);
Route::get('/cars/{id}', [CarController::class, 'show']);

// Users publique
Route::get('/users', [UserController::class, 'index']);

// ──────────────────────────────────────
// ROUTES AUTHENTIFIÉES CLIENT
// ──────────────────────────────────────

Route::middleware('auth:sanctum')->group(function () {
    // Profil
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Réservations client
    Route::get('/my-reservations', [ReservationController::class, 'myReservations']);
    Route::post('/reservations', [ReservationController::class, 'store']);

    // ──────────────────────────────────────
    // ROUTES ADMIN UNIQUEMENT
    // ──────────────────────────────────────

    Route::middleware('isAdmin')->group(function () {
        // Gestion des voitures
        Route::post('/cars', [CarController::class, 'store']);
        Route::put('/cars/{id}', [CarController::class, 'update']);
        Route::delete('/cars/{id}', [CarController::class, 'destroy']);
        Route::patch('/cars/{id}/availability', [CarController::class, 'toggleAvailability']);

        // Gestion des réservations (vue admin)
        Route::get('/admin/reservations', [ReservationController::class, 'index']);
    });
});
