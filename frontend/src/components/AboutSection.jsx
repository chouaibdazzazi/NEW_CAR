import { Shield, Clock, Star } from 'lucide-react'

export default function AboutSection() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Sécurité Garantie",
      description: "Tous nos véhicules sont rigoureusement révisés et assurés tous risques pour votre tranquillité."
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      title: "Flexibilité 24/7",
      description: "Récupérez et déposez votre véhicule quand vous le souhaitez grâce à notre réseau d'agences."
    },
    {
      icon: <Star className="w-8 h-8 text-pink-500" />,
      title: "Qualité Premium",
      description: "Une flotte de véhicules récents, propres et équipés des dernières technologies."
    }
  ]

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Pourquoi choisir <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">CarFlow</span> ?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Nous redéfinissons la location de voitures en vous offrant une expérience fluide, transparente et adaptée à vos besoins. Que ce soit pour un voyage d'affaires ou des vacances en famille.
          </p>
        </div>

        {/* Grille de caractéristiques */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-black/30 transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Section image et texte bas */}
        <div className="mt-20 rounded-3xl overflow-hidden relative min-h-[300px] flex items-center group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 dark:opacity-80 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503377215949-b9837762a423?auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-700" />
          
          <div className="relative z-20 p-8 md:p-12 text-white max-w-2xl">
            <h3 className="text-2xl md:text-4xl font-bold mb-4">Prêt pour l'aventure ?</h3>
            <p className="text-lg text-white/90 mb-8">
              Rejoignez des milliers de clients satisfaits et prenez la route en toute confiance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
