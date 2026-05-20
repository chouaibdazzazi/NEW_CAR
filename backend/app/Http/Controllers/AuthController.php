<?php

namespace App\Http\Controllers;
// use Illuminate\Auth\Events\Registered;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
{
    // 1. Ta validation de données (name, email, password...)
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
    ]);

    // 2. Création de l'utilisateur
    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
    ]);

    // 🌟 Désactivation du trigger d'e-mail d'inscription en local/dev
    // event(new Registered($user));

    // 3. Ta logique de génération de token Sanctum ou réponse habituelle
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Compte créé !',
        'user' => $user,
        'access_token' => $token,
        'token_type' => 'Bearer',
    ], 201);
}

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
