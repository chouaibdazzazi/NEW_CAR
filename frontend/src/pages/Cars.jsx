import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Calendar, Users, AlertCircle, Check } from 'lucide-react'

export default function Cars() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // État des voitures
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  // État de la modale de réservation
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    start_date: '',
    end_date: '',
  })
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingMessage, setBookingMessage] = useState({ type: '', text: '' })

  /**
   * Récupération des voitures depuis l'API Laravel
   */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cars')
        setCars(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des voitures:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  /**
   * Ouvrir la modale de réservation
   */
  const openReservationModal = (car) => {
    setSelectedCar(car)
    setBookingForm({ start_date: '', end_date: '' })
    setBookingMessage({ type: '', text: '' })
    setModalOpen(true)
  }

  /**
   * Fermer la modale de réservation
   */
  const closeModal = () => {
    setModalOpen(false)
    setSelectedCar(null)
    setBookingForm({ start_date: '', end_date: '' })
    setBookingMessage({ type: '', text: '' })
  }

  /**
   * Gérer la saisie du formulaire de réservation
   */
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setBookingForm(prev => ({ ...prev, [name]: value }))
  }

  /**
   * Soumettre la réservation
   */
  const handleSubmitReservation = async (e) => {
    e.preventDefault()

    // Validation minimale
    if (!bookingForm.start_date || !bookingForm.end_date) {
      setBookingMessage({ type: 'error', text: 'Veuillez remplir les deux dates.' })
      return
    }

    if (new Date(bookingForm.start_date) >= new Date(bookingForm.end_date)) {
      setBookingMessage({ type: 'error', text: 'La date de fin doit être après la date de début.' })
      return
    }

    setBookingLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setBookingMessage({ type: 'error', text: 'Veuillez vous connecter pour effectuer une réservation.' })
        setBookingLoading(false)
        return
      }

      const response = await axios.post(
        'http://localhost:8000/api/reservations',
        {
          car_id: selectedCar.id,
          start_date: bookingForm.start_date,
          end_date: bookingForm.end_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      setBookingMessage({
        type: 'success',
        text: 'Réservation effectuée avec succès ! Redirection...',
      })

      // Fermer la modale après 1.5 secondes
      setTimeout(() => {
        closeModal()
        // Rediriger vers les réservations de l'utilisateur
        navigate('/mes-reservations')
      }, 1500)
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erreur lors de la réservation.'
      setBookingMessage({ type: 'error', text: errorMsg })
    } finally {
      setBookingLoading(false)
    }
  }

  /**
   * Calcul du nombre de jours et du prix estimé
   */
  const calculateEstimate = () => {
    if (!bookingForm.start_date || !bookingForm.end_date || !selectedCar) {
      return { days: 0, total: 0 }
    }

    const start = new Date(bookingForm.start_date)
    const end = new Date(bookingForm.end_date)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

    return {
      days: Math.max(days, 1),
      total: Math.max(days, 1) * selectedCar.price_per_day,
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-300 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">{t('cars_loading')}</p>
        </div>
      </div>
    )
  }

  const estimate = calculateEstimate()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t('cars_title')}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('cars_subtitle')}
          </p>
        </div>

        {/* Grille de voitures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <img
                  src={
                    car.image_url ||
                    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
                  }
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge année */}
                <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                  {car.year}
                </span>

                {/* Badge disponibilité */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-semibold ${
                    car.available
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {car.available ? t('cars_available') : t('cars_rented')}
                </span>
              </div>

              {/* Contenu */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">
                  {car.brand} {car.model}
                </h3>

                <p className="text-sm text-slate-400 mb-4 flex-grow">
                  {car.description || t('cars_description_fallback')}
                </p>

                {/* Caractéristiques */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-slate-500" />
                    {t('cars_seats_label', { seats: car.seats || 5 })}
                  </div>
                  <div className="text-slate-400">
                    {t('cars_color_label')}: {car.color || t('cars_color_unspecified')}
                  </div>
                </div>

                {/* Prix */}
                <div className="mb-4 pb-4 border-t border-slate-800">
                  <p className="text-sm text-slate-400 mb-1">{t('cars_price_from')}</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {car.price_per_day}
                    <span className="text-xs text-slate-400"> {t('cars_price_per_day')}</span>
                  </p>
                </div>

                {/* Boutons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                    className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    {t('cars_details_button')}
                  </button>
                  <button
                    onClick={() => openReservationModal(car)}
                    disabled={!car.available}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      car.available
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {t('cars_reserve_button')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MODALE DE RÉSERVATION
          ════════════════════════════════════════════════════════════ */}
      {modalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-8 shadow-2xl">
            {/* En-tête */}
            <h2 className="text-2xl font-bold text-white mb-2">
              {t('cars_modal_title', { brand: selectedCar.brand, model: selectedCar.model })}
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              {t('cars_modal_description')}
            </p>

            {/* Message de feedback */}
            {bookingMessage.text && (
              <div
                className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
                  bookingMessage.type === 'error'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {bookingMessage.type === 'error' ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {bookingMessage.text}
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmitReservation} className="space-y-4">
              {/* Date début */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  {t('cars_date_start')}
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={bookingForm.start_date}
                  onChange={handleFormChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Date fin */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  {t('cars_date_end')}
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={bookingForm.end_date}
                  onChange={handleFormChange}
                  min={bookingForm.start_date || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Estimation du prix */}
              {estimate.days > 0 && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>{t('cars_estimate_days', { days: estimate.days, price: selectedCar.price_per_day })}</span>
                    <span className="text-white font-semibold">{estimate.total} MAD</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2 flex justify-between text-base font-bold text-blue-400">
                    <span>{t('cars_estimate_total')}</span>
                    <span>{estimate.total} MAD</span>
                  </div>
                </div>
              )}

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={bookingLoading}
                  className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {t('cars_cancel_button')}
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading || !bookingForm.start_date || !bookingForm.end_date}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bookingLoading ? t('cardetails_checking') : t('cars_submit_button')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}