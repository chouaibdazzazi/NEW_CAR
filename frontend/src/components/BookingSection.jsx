import { useState } from 'react'
import { Calendar, Clock, Users, MapPin } from 'lucide-react'

export default function BookingSection() {
  const [booking, setBooking] = useState({
    name: '',
    email: '',
    pickupDate: '',
    returnDate: '',
    pickupTime: '',
    people: '1'
  })
  const [bookingError, setBookingError] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const handleBookingChange = (e) => {
    const { name, value } = e.target
    setBooking(prev => ({ ...prev, [name]: value }))
    setBookingError('')
    setBookingSuccess(false)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!booking.name || !booking.email || !booking.pickupDate || !booking.returnDate || !booking.pickupTime) {
      setBookingError('Veuillez remplir tous les champs obligatoires.')
      return
    }
    // Simulation d'envoi
    setBookingSuccess(true)
    setBooking({ name: '', email: '', pickupDate: '', returnDate: '', pickupTime: '', people: '1' })
    setTimeout(() => setBookingSuccess(false), 5000)
  }

  const inputClasses = "w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all placeholder-slate-400 dark:placeholder-slate-500"
  const labelClasses = "block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300"
  const iconClasses = "absolute left-3 top-[38px] text-slate-400 dark:text-slate-500 w-5 h-5"

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Faire une Réservation
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Réservez votre voiture idéale en quelques étapes simples.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/20 transition-colors duration-300 relative overflow-hidden">
          
          {/* Décoration d'arrière-plan */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-10 blur-2xl" />
          
          {bookingSuccess && (
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl flex items-center gap-3 animate-in fade-in">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold">✓</div>
              <p className="text-green-700 dark:text-green-400 font-medium">Réservation enregistrée avec succès ! Nous vous contacterons bientôt.</p>
            </div>
          )}

          {bookingError && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl flex items-center gap-3 animate-in fade-in">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 font-bold">!</div>
              <p className="text-red-700 dark:text-red-400 font-medium">{bookingError}</p>
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nom */}
              <div className="relative">
                <label className={labelClasses}>Nom complet *</label>
                <div className="relative">
                  <MapPin className={iconClasses} style={{ top: '12px' }} />
                  <input
                    type="text"
                    name="name"
                    value={booking.name}
                    onChange={handleBookingChange}
                    placeholder="Jean Dupont"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className={labelClasses}>Email *</label>
                <div className="relative">
                  <span className={`${iconClasses} flex items-center justify-center font-serif text-lg`} style={{ top: '12px' }}>@</span>
                  <input
                    type="email"
                    name="email"
                    value={booking.email}
                    onChange={handleBookingChange}
                    placeholder="jean@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Date de départ */}
              <div className="relative">
                <label className={labelClasses}>Date de départ *</label>
                <div className="relative">
                  <Calendar className={iconClasses} style={{ top: '12px' }} />
                  <input
                    type="date"
                    name="pickupDate"
                    value={booking.pickupDate}
                    onChange={handleBookingChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Date de retour */}
              <div className="relative">
                <label className={labelClasses}>Date de retour *</label>
                <div className="relative">
                  <Calendar className={iconClasses} style={{ top: '12px' }} />
                  <input
                    type="date"
                    name="returnDate"
                    value={booking.returnDate}
                    onChange={handleBookingChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Heure de départ */}
              <div className="relative">
                <label className={labelClasses}>Heure de départ *</label>
                <div className="relative">
                  <Clock className={iconClasses} style={{ top: '12px' }} />
                  <input
                    type="time"
                    name="pickupTime"
                    value={booking.pickupTime}
                    onChange={handleBookingChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Nombre de personnes */}
              <div className="relative">
                <label className={labelClasses}>Nombre de personnes</label>
                <div className="relative">
                  <Users className={iconClasses} style={{ top: '12px' }} />
                  <select
                    name="people"
                    value={booking.people}
                    onChange={handleBookingChange}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'personne' : 'personnes'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Confirmer la Réservation
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
