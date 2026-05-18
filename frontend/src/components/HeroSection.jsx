import { ArrowRight } from 'lucide-react'

export default function HeroSection({ scrollToSection, scrollY }) {
  return (
    <section
      id="hero"
      className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800 min-h-screen flex items-center transition-colors duration-300"
      style={{ transform: `translateY(${scrollY * 0.3}px)` }} // Effet parallax léger
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
            <div className="space-y-2">
              <div className="inline-block px-4 py-2 bg-blue-500 bg-opacity-10 dark:bg-opacity-20 rounded-full border border-blue-500 border-opacity-20">
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">✨ Bienvenue chez CarFlow</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white transition-colors duration-300">
                Votre Location de Voitures de Confiance
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg transition-colors duration-300">
                Réservez facilement et rapidement votre véhicule. Des tarifs compétitifs, une flotte moderne et un service client exceptionnel pour tous vos trajets.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection('booking')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Réserver maintenant
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                En savoir plus
              </button>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">500+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Voitures</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">10K+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Clients heureux</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">24/7</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Support</p>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="hidden md:flex items-center justify-center relative animate-in zoom-in duration-1000">
            {/* Forme décorative d'arrière-plan */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full blur-3xl transform scale-110 -z-10" />
            
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 right-8 space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/30">
                  <p className="text-white font-semibold text-lg">🚗 Élégance & Performance</p>
                  <p className="text-white/80 text-sm">Découvrez notre flotte premium dès aujourd'hui</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
