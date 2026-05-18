<?php

namespace App\Http\Controllers;

use App\Models\User; // Importation du modèle User pour parler à la base de données
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Renvoie la liste de tous les utilisateurs.
     */
    public function index()
    {
        // Récupère tous les utilisateurs de la table 'users'
        $users = User::all();

        // Les renvoie proprement au format JSON avec un statut 200 (OK)
        return response()->json($users, 200);
    }
}
