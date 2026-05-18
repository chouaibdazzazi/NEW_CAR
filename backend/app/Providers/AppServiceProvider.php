<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
{
    // Personnaliser l'URL du bouton dans l'e-mail de vérification
    VerifyEmail::createUrlUsing(function ($notifiable) {
        // Génère l'URL signée temporaire de Laravel
        $verifyUrl = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(60), // Le lien expire après 60 minutes
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ]
        );

        // On extrait les paramètres de validation de Laravel
        $queryString = parse_url($verifyUrl, PHP_URL_QUERY);

        // 🌟 Modifie cette URL avec l'adresse exacte de ton frontend React
        $frontendUrl = "http://localhost:5173/verify-email";

        return $frontendUrl . '?' . $queryString;
    });
}
}
