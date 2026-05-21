import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  fr: {
    translation: {
      nav_home: 'Accueil',
      nav_cars: 'Voitures',
      nav_services: 'Services',
      nav_about: 'À propos',
      nav_contact: 'Contact',
      nav_login: 'Connexion / Inscription',
      theme_light: 'Mode clair',
      theme_dark: 'Mode sombre',
      language_label: 'FR',

      hero_subtitle: 'Discover our premium rental services',
      hero_title_1: 'Nos',
      hero_title_2: 'Services',
      hero_description: "Plus qu'une simple location de voiture, nous vous offrons une expérience de route fluide, sécurisée et totalement flexible.",

      /* 🌟 SECTION SERVICES EN FRANÇAIS */
      "Assurance Tous Risques": "Assurance Tous Risques",
      "Assurance Tous Risques_desc": "Roulez l'esprit tranquille. Tous nos véhicules bénéficient d'une couverture d'assurance complète et d'une assistance 24h/7j.",
      
      "Assurance & Assistance 24/7": "Assurance & Assistance 24/7",
      "Assurance & Assistance 24/7_desc": "Un imprévu sur la route ? Notre équipe technique et nos partenaires de dépannage sont à votre disposition à tout moment, de jour comme de nuit.",
      
      "Kilométrage Illimité": "Kilométrage Illimité",
      "Kilométrage Illimité_desc": "Voyagez sans compter les kilomètres. Profitez pleinement de votre trajet à travers tout le pays sans aucune facturation de dépassement.",

      "Équipements sur Demande": "Équipements sur Demande",
      "Équipements sur Demande_desc": "Besoin d'un siège bébé, d'un rehausseur ou d'un support GPS ? Configurez vos options lors de la réservation sans aucun frais supplémentaire.",

      "Annulation Gratuite": "Annulation Gratuite",
      "Annulation Gratuite_desc": "Changement de programme ? Annulez ou modifiez votre réservation sans frais jusqu'à 24 heures avant la date de prise en charge du véhicule.",

      "Livraison à Domicile / Aéroport": "Livraison à Domicile / Aéroport",
      "Livraison à Domicile / Aéroport_desc": "Pas le temps de vous déplacer ? Nous vous livrons la voiture directement à votre hôtel, à votre domicile ou à la sortie de l'aéroport.",

      "Conducteur Additionnel": "Conducteur Additionnel",
      "Conducteur Additionnel_desc": "Partagez le plaisir de conduire. Ajoutez un second conducteur sur votre contrat de location sans aucun frais supplémentaire.",

      "Nettoyage Inclus": "Nettoyage Inclus",
      "Nettoyage Inclus_desc": "Ne vous souciez plus du nettoyage avant de rendre la voiture. Nous prenons en charge le lavage complet intérieur et extérieur à la fin de votre séjour.",

      "Option Carburant Plein": "Option Carburant Plein",
      "Option Carburant Plein_desc": "Gagnez du temps à la restitution. Prenez le véhicule avec le plein et ramenez-le en l'état sans chercher de station-service au retour.",

      "Wi-Fi 4G Embarqué": "Wi-Fi 4G Embarqué",
      "Wi-Fi 4G Embarqué_desc": "Restez connecté où que vous soyez. Profitez d'une borne Wi-Fi haut débit illimitée directement dans le véhicule pour tous vos appareils.",

      // ... Reste de tes clés FR (cars, login, signup...) identiques
      login_welcome_tag: 'Bienvenue',
login_left_title_1: 'Accédez à votre',
login_left_title_2: 'espace personnel',
login_left_desc: 'Grérez vos réservations, consultez votre historique et accédez à nos offres exclusives.',
login_feat_title_1: 'Réservation instantanée',
login_feat_desc_1: 'Confirmez votre véhicule en 2 minutes',
login_feat_title_2: 'Assurance incluse',
login_feat_desc_2: 'Couverture tous risques garantie',
login_feat_title_3: 'Support 24/7',
login_feat_desc_3: 'Une équipe disponible à tout moment',
login_tag: 'Connexion',
btn_login: 'Se connecter',
no_account: 'Pas de compte ?',
register_link: 'Inscrivez-vous',
back_home: 'Retour à l\'accueil',
email_label: 'Adresse Email',
password_label: 'Mot de passe',
//signup
      signup_tag: 'Inscription',
      signup_title: 'Créer votre compte',
      signup_subtitle: 'Rejoignez CarFlow et réservez dès aujourd\'hui.',
      signup_name_label: 'Nom complet',
      signup_confirm_password_label: 'Confirmer le mot de passe',
      signup_btn: "S'inscrire gratuitement",
      signup_already_member: 'Déjà membre ?',
      signup_login_link: 'Se connecter',
      signup_welcome_tag: 'Rejoignez-nous',
      signup_right_title_1: 'Votre voyage',
      signup_right_title_2: 'commence ici',
      signup_right_desc: 'Créez votre compte en quelques instants et accédez à notre flotte de véhicules disponibles partout au Maroc.',
      signup_feat_title_1: 'Réservation instantanée',
      signup_feat_desc_1: 'Confirmez en moins de 2 minutes, sans paperasse.',
      signup_feat_title_2: 'Assurance tous risques',
      signup_feat_desc_2: 'Incluse dans chaque location, sans supplément.',
      signup_feat_title_3: 'Offres exclusives',
      signup_feat_desc_3: 'Tarifs préférentiels et promotions réservées aux membres.',
      signup_feat_title_4: 'Suivi en temps réel',
      signup_feat_desc_4: 'Gérez vos réservations depuis votre espace client.',
      
      // Force du mot de passe & Alertes
      password_strength_1: 'Très faible',
      password_strength_2: 'Faible',
      password_strength_3: 'Moyen',
      password_strength_4: 'Fort',
      password_strength_5: 'Excellent',
      password_match_success: '✓ Mots de passe identiques',
      password_match_error: '✗ Ne correspondent pas',
      error_all_fields: 'Veuillez remplir tous les champs',
      error_password_match: 'Les mots de passe ne correspondent pas',
      error_password_length: 'Le mot de passe doit contenir au moins 6 caractères',
      signup_loading: 'Création du compte...'
    }
  },
  en: {
    translation: {
      nav_home: 'Home',
      nav_cars: 'Cars',
      nav_services: 'Services',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_login: 'Login / Signup',
      theme_light: 'Light mode',
      theme_dark: 'Dark mode',
      language_label: 'EN',

      hero_subtitle: 'Discover our premium rental services',
      hero_title_1: 'Our',
      hero_title_2: 'Services',
      hero_description: "More than just a car rental, we offer you a smooth, secure, and totally flexible road experience.",

      /* 🌟 SECTION SERVICES TRADUITS EN ANGLAIS */
      "Assurance Tous Risques": "Fully Comprehensive Insurance",
      "Assurance Tous Risques_desc": "Drive with peace of mind. All our vehicles come with full insurance coverage and 24/7 assistance.",
      
      "Assurance & Assistance 24/7": "24/7 Insurance & Assistance",
      "Assurance & Assistance 24/7_desc": "An unexpected event on the road? Our technical team and roadside assistance partners are available at any time, day or night.",
      
      "Kilométrage Illimité": "Unlimited Mileage",
      "Kilométrage Illimité_desc": "Travel without counting the miles. Fully enjoy your journey across the country with no extra charges for mileage.",

      "Équipements sur Demande": "Equipment on Demand",
      "Équipements sur Demande_desc": "Need a baby seat, booster seat, or GPS support? Configure your options during booking at no extra cost.",

      "Annulation Gratuite": "Free Cancellation",
      "Annulation Gratuite_desc": "Change of plans? Cancel or modify your booking free of charge up to 24 hours before vehicle pickup.",

      "Livraison à Domicile / Aéroport": "Home / Airport Delivery",
      "Livraison à Domicile / Aéroport_desc": "No time to travel? We deliver the car directly to your hotel, home, or airport terminal.",

      "Conducteur Additionnel": "Additional Driver",
      "Conducteur Additionnel_desc": "Share the driving pleasure. Add a second driver to your rental contract at no extra charge.",

      "Nettoyage Inclus": "Cleaning Included",
      "Nettoyage Inclus_desc": "Don't worry about cleaning before returning the car. We handle full interior and exterior washing at the end of your stay.",

      "Option Carburant Plein": "Full Fuel Option",
      "Option Carburant Plein_desc": "Save time on return. Pick up the vehicle full and bring it back as is without looking for a gas station.",

      "Wi-Fi 4G Embarqué": "Onboard 4G Wi-Fi",
      "Wi-Fi 4G Embarqué_desc": "Stay connected wherever you are. Enjoy an unlimited high-speed Wi-Fi hotspot directly in the vehicle for all your devices.",

      // ... Reste de tes clés EN (cars, login, signup...) identiques
      login_welcome_tag: 'Welcome',
login_left_title_1: 'Access your',
login_left_title_2: 'personal space',
login_left_desc: 'Manage your bookings, check your history, and access our exclusive offers.',
login_feat_title_1: 'Instant Booking',
login_feat_desc_1: 'Confirm your vehicle in 2 minutes',
login_feat_title_2: 'Insurance Included',
login_feat_desc_2: 'Fully comprehensive coverage guaranteed',
login_feat_title_3: '24/7 Support',
login_feat_desc_3: 'A team available at any time',
login_tag: 'Login',
btn_login: 'Sign In',
no_account: 'No account?',
register_link: 'Sign Up here',
back_home: 'Back to Home',
email_label: 'Email Address',
password_label: 'Password',
/* 📝 SECTION SIGNUP EN ANGLAIS */
      signup_tag: 'Registration',
      signup_title: 'Create your account',
      signup_subtitle: 'Join CarFlow and start booking today.',
      signup_name_label: 'Full name',
      signup_confirm_password_label: 'Confirm password',
      signup_btn: 'Register for free',
      signup_already_member: 'Already a member?',
      signup_login_link: 'Login',
      signup_welcome_tag: 'Join us',
      signup_right_title_1: 'Your journey',
      signup_right_title_2: 'starts here',
      signup_right_desc: 'Create your account in just a few clicks and access our fleet of vehicles available everywhere in Morocco.',
      signup_feat_title_1: 'Instant Booking',
      signup_feat_desc_1: 'Confirm in less than 2 minutes, with zero paperwork.',
      signup_feat_title_2: 'Comprehensive Insurance',
      signup_feat_desc_2: 'Included in every rental, at no extra cost.',
      signup_feat_title_3: 'Exclusive Offers',
      signup_feat_desc_3: 'Preferred rates and promotions exclusive to members.',
      signup_feat_title_4: 'Real-time Tracking',
      signup_feat_desc_4: 'Manage your bookings straight from your client space.',
      
      // Force du mot de passe & Alertes
      password_strength_1: 'Very weak',
      password_strength_2: 'Weak',
      password_strength_3: 'Medium',
      password_strength_4: 'Strong',
      password_strength_5: 'Excellent',
      password_match_success: '✓ Passwords match',
      password_match_error: '✗ Do not match',
      error_all_fields: 'Please fill in all fields',
      error_password_match: 'Passwords do not match',
      error_password_length: 'Password must contain at least 6 characters',
      signup_loading: 'Creating account...',
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n