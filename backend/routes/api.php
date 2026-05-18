<?php
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;

// Route appelée par React pour valider le hash reçu dans l'e-mail
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return response()->json(['message' => 'Votre e-mail a été vérifié avec succès !']);
})->middleware(['signed'])->name('verification.verify');
// Route optionnelle si l'utilisateur demande à renvoyer le mail
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return response()->json(['message' => 'Lien de vérification renvoyé !']);
})->middleware(['auth:sanctum'])->name('verification.send');

// user routes
Route::get('/users', [UserController::class, 'index']);

//reservation routes
Route::middleware('auth:sanctum')->group(function () {
    // Route pour que le client envoie sa réservation
    Route::post('/reservations', [ReservationController::class, 'store']);

    // Route pour que l'admin charge la liste complète
    Route::get('/admin/reservations', [ReservationController::class, 'index']);
});

// Auth publique
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Routes publiques voitures
Route::get('/cars',      [CarController::class, 'index']);
Route::get('/cars/{id}', [CarController::class, 'show']);

// Routes authentifiées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me',     [AuthController::class, 'me']);
    Route::post('/logout',[AuthController::class, 'logout']);

    Route::post('/reservations',        [ReservationController::class, 'store']);
    Route::get('/reservations/my',      [ReservationController::class, 'myReservations']);

    // Routes Admin uniquement
    Route::middleware('isAdmin')->group(function () {
        Route::post('/cars',                    [CarController::class, 'store']);
        Route::put('/cars/{id}',                [CarController::class, 'update']);
        Route::delete('/cars/{id}',             [CarController::class, 'destroy']);
        Route::patch('/cars/{id}/availability', [CarController::class, 'toggleAvailability']);
        Route::get('/reservations',             [ReservationController::class, 'index']);
    });
});
