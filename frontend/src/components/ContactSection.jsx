import { Phone, Mail, MapPin, Send } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Contactez-nous
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Une question ? Besoin d'aide pour votre réservation ? Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col gap-4 group hover:border-blue-500 transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Téléphone</h4>
                <p className="text-slate-600 dark:text-slate-400">+33 1 23 45 67 89</p>
                <p className="text-sm text-slate-500 mt-1">Lun-Dim, 24/24</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col gap-4 group hover:border-purple-500 transition-colors duration-300">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email</h4>
                <p className="text-slate-600 dark:text-slate-400">contact@carflow.com</p>
                <p className="text-sm text-slate-500 mt-1">Nous répondons sous 24h</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col gap-4 group hover:border-pink-500 transition-colors duration-300">
              <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Agence Principale</h4>
                <p className="text-slate-600 dark:text-slate-400">123 Avenue des Champs-Élysées<br/>75008 Paris, France</p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Envoyez-nous un message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Nom complet</label>
                  <input
                    type="text"
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    type="email"
                    placeholder="jean@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Sujet</label>
                <input
                  type="text"
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  rows="5"
                  placeholder="Votre message ici..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Envoyer le message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
