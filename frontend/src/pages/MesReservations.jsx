import { useState, useEffect } from 'react'
import axios from 'axios'
import { Calendar, Car, Clock, ShieldCheck, XCircle, MapPin, DollarSign } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function MesReservations() {
  const navigate = useNavigate()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  /**
   * Récupération des réservations de l'utilisateur connecté
   */
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        const response = await axios.get('http://localhost:8000/api/my-reservations', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setReservations(response.data)
      } catch (err) {
        console.error('Erreur:', err)
        setError('Impossible de charger vos réservations.')
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [navigate])

  /**
   * Badge de statut avec couleurs dynamiques
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
            <ShieldCheck className="w-3 h-3" /> Confirmée
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
            <Clock className="w-3 h-3" /> En attente
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-semibold rounded-full">
            <XCircle className="w-3 h-3" /> Annulée
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-500/10 text-slate-400 border border-slate-500/30 text-xs font-semibold rounded-full">
            {status}
          </span>
        )
    }
  }

  /**
   * Format de date lisible
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  /**
   * Calcul du nombre de jours
   */
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return Math.max(days, 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-300 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">Chargement de vos réservations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <div className="mb-12 pb-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            📅 Mes Réservations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Gérez et suivez toutes vos locations de véhicules
          </p>
        </div>

        {/* Alerte d'erreur */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-medium flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* État vide */}
        {reservations.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
            <Car className="mx-auto h-16 w-16 text-slate-500 mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-slate-300 mb-2">
              Vous n'avez aucune réservation pour le moment
            </h3>
            <p className="text-slate-500 mb-6">
              Explorez notre flotte et réservez votre prochain véhicule dès maintenant !
            </p>
            <button
              onClick={() => navigate('/cars')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Parcourir les véhicules
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {reservations.map((reservation) => {
              const daysCount = calculateDays(
                reservation.start_date,
                reservation.end_date
              )

              return (
                <div
                  key={reservation.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Infos Véhicule */}
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-slate-800 rounded-xl">
                          <Car className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {reservation.car?.brand} {reservation.car?.model}
                          </h3>
                          <p className="text-sm text-slate-400 mt-1">
                            {reservation.car?.year || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dates et Durée */}
                    <div className="md:col-span-1">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="text-slate-400">Du</p>
                            <p className="text-white font-semibold">
                              {formatDate(reservation.start_date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="text-slate-400">Au</p>
                            <p className="text-white font-semibold">
                              {formatDate(reservation.end_date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <p className="text-sm text-slate-400">
                            <span className="text-white font-semibold">{daysCount}</span> jour(s)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Prix et Statut */}
                    <div className="md:col-span-1 flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-2">Prix total</p>
                        <p className="text-3xl font-black text-blue-400">
                          {reservation.total_price}
                          <span className="text-sm text-slate-400"> MAD</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {reservation.car?.price_per_day} MAD/jour × {daysCount} jour(s)
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-slate-400 mb-2">Statut</p>
                        {getStatusBadge(reservation.status)}
                      </div>
                    </div>
                  </div>

                  {/* Ligne de séparation (optionnel) */}
                  <div className="border-t border-slate-800 mt-6 pt-4">
                    <p className="text-xs text-slate-500">
                      Référence : <span className="text-slate-400 font-mono">RES#{reservation.id}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}