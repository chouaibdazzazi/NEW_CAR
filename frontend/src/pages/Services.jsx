import { Link } from 'react-router-dom'

// Liste des services offerts par CarFlow
const servicesList = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Assurance Tous Risques",
    description: "Roulez l'esprit tranquille. Tous nos véhicules bénéficient d'une couverture d'assurance complète et d'une assistance 24h/7j."
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Livraison à Domicile / Aéroport",
    description: "Pas le temps de vous déplacer ? Nous vous livrons la voiture directement à votre hôtel, à votre domicile ou à la sortie de l'aéroport."
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Réservation Instantanée 24/7",
    description: "Planifiez votre trajet à n'importe quelle heure. Notre plateforme en ligne valide instantanément vos demandes de réservation."
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Entretien & Propreté Garantis",
    description: "Chaque véhicule est rigoureusement inspecté, nettoyé et désinfecté avant chaque location pour vous garantir une expérience Premium."
  }
]

// Les étapes simples d'utilisation
const steps = [
  { step: "01", title: "Choisissez votre véhicule", desc: "Parcourez notre catalogue et filtrez selon vos besoins (Marque, Budget, Places)." },
  { step: "02", title: "Réservez en ligne", desc: "Sélectionnez vos dates et validez votre réservation en quelques clics en toute sécurité." },
  { step: "03", title: "Prenez la route", desc: "Récupérez les clés ou faites-vous livrer le véhicule. Profitez pleinement de votre voyage !" }
]

export default function Services() {
  return (
    <div style={{ background: '#0f1117', minHeight: 'calc(100vh - 70px)', color: '#fff', fontFamily: 'Poppins, sans-serif' }} className="py-12 px-4 sm:p-6 lg:p-12">
      
      {/* SECTION HÉROS (En-tête) */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Nos Services chez <span style={{ color: '#00C9B1' }}>CarFlow</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Plus qu'une simple location de voiture, nous vous offrons une expérience de route fluide, sécurisée et totalement flexible.
        </p>
      </div>

      {/* GRILLE DES SERVICES EFFECTIFS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
        {servicesList.map((service, index) => (
          <div 
            key={index}
            className="p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
            style={{ 
              background: '#151821', 
              borderRadius: '16px', 
              border: '1px solid rgba(255,255,255,0.03)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)' 
            }}
          >
            <div className="mb-4 bg-opacity-10 bg-[#00C9B1] w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 201, 177, 0.05)' }}>
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>

      {/* SECTION SECTION : COMMENT ÇA MARCHE */}
      <div className="max-w-6xl mx-auto border-t border-gray-800 pt-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Comment ça marche ?</h2>
          <p className="text-gray-400 text-sm">Louer un véhicule n'a jamais été aussi simple</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div key={idx} className="relative text-center p-4">
              {/* Grand numéro en arrière-plan */}
              <div 
                className="text-7xl font-black absolute -top-6 left-1/2 transform -translate-x-1/2 select-none pointer-events-none opacity-5"
                style={{ color: '#00C9B1' }}
              >
                {s.step}
              </div>
              <h3 className="text-base font-semibold text-white mb-2 relative z-10">{s.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed relative z-10">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Bouton d'action final */}
        <div className="text-center mt-12">
          <Link 
            to="/cars" 
            className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{ background: '#00C9B1', color: '#000', textDecoration: 'none' }}
          >
            Découvrir nos voitures
          </Link>
        </div>
      </div>

    </div>
  )
}