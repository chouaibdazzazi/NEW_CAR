<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        $services = [
            [
                'title'       => 'Assurance Tous Risques',
                'description' => 'Roulez l\'esprit tranquille. Tous nos véhicules bénéficient d\'une couverture d\'assurance complète et d\'une assistance 24h/7j.',
                'icon_name'   => 'shield',
            ],
            [
                'title'       => 'Assurance & Assistance 24/7',
                'description' => 'Un imprévu sur la route ? Notre équipe technique et nos partenaires de dépannage sont à votre disposition à tout moment, de jour comme de nuit.',
                'icon_name'   => 'clock',
            ],
            [
                'title'       => 'Kilométrage Illimité',
                'description' => 'Voyagez sans compter les kilomètres. Profitez pleinement de votre trajet à travers tout le pays sans aucune facturation de dépassement.',
                'icon_name'   => 'infinity',
            ],
            [
                'title'       => 'Équipements sur Demande',
                'description' => 'Besoin d\'un siège bébé, d\'un rehausseur ou d\'un support GPS ? Configurez vos options lors de la réservation sans aucun frais supplémentaire.',
                'icon_name'   => 'baby',
            ],
            [
                'title'       => 'Annulation Gratuite',
                'description' => 'Changement de programme ? Annulez ou modifiez votre réservation sans frais jusqu\'à 24 heures avant la date de prise en charge du véhicule.',
                'icon_name'   => 'calendar-x',
            ],
            [
                'title'       => 'Livraison à Domicile / Aéroport',
                'description' => 'Pas le temps de vous déplacer ? Nous vous livrons la voiture directement à votre hôtel, à votre domicile ou à la sortie de l\'aéroport.',
                'icon_name'   => 'truck',
            ],
            [
                'title'       => 'Conducteur Additionnel',
                'description' => 'Partagez le plaisir de conduire. Ajoutez un second conducteur sur votre contrat de location sans aucun frais supplémentaire.',
                'icon_name'   => 'users',
            ],
            [
                'title'       => 'Nettoyage Inclus',
                'description' => 'Ne vous souciez plus du nettoyage avant de rendre la voiture. Nous prenons en charge le lavage complet intérieur et extérieur à la fin de votre séjour.',
                'icon_name'   => 'sparkles',
            ],
            [
                'title'       => 'Option Carburant Plein',
                'description' => 'Gagnez du temps à la restitution. Prenez le véhicule avec le plein et ramenez-le en l\'état sans chercher de station-service au retour.',
                'icon_name'   => 'fuel',
            ],
            [
                'title'       => 'Wi-Fi 4G Embarqué',
                'description' => 'Restez connecté où que vous soyez. Profitez d\'une borne Wi-Fi haut débit illimitée directement dans le véhicule pour tous vos appareils.',
                'icon_name'   => 'wifi',
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['title' => $service['title']],
                [
                    'description' => $service['description'],
                    'icon_name'   => $service['icon_name'],
                ]
            );
        }
    }
}
