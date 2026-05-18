import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function CarList() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/cars')
      .then(r => setCars(r.data))
      .finally(() => setLoading(false))
  }, [])

  const toggleAvailability = async (id) => {
    const res = await api.patch(`/cars/${id}/availability`)
    setCars(cars.map(c => c.id === id ? res.data : c))
  }

  const deleteCar = async (id) => {
    if (!confirm('Supprimer cette voiture ?')) return
    await api.delete(`/cars/${id}`)
    setCars(cars.filter(c => c.id !== id))
  }

  if (loading) return <p className="text-gray-500">Chargement...</p>

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Voitures</h1>
          <p className="text-gray-500 text-sm">{cars.length} voiture(s) au total</p>
        </div>
        <Link to="/admin/cars/add"
          className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2">
          <span>+</span>
          <span className="hidden sm:inline">Ajouter</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                {['Marque','Modèle','Année','Prix/jour','Couleur','Statut','Actions'].map(h => (
                  <th key={h} className="px-3 sm:px-5 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cars.map(car => (
                <tr key={car.id} className="hover:bg-gray-50 transition">
                  <td className="px-3 sm:px-5 py-3 font-medium text-gray-800">{car.brand}</td>
                  <td className="px-3 sm:px-5 py-3 text-gray-600">{car.model}</td>
                  <td className="px-3 sm:px-5 py-3 text-gray-600">{car.year}</td>
                  <td className="px-3 sm:px-5 py-3 text-gray-600">{car.price_per_day} MAD</td>
                  <td className="px-3 sm:px-5 py-3 text-gray-600">{car.color || '—'}</td>
                  <td className="px-3 sm:px-5 py-3">
                    <button onClick={() => toggleAvailability(car.id)}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition whitespace-nowrap ${
                        car.available
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}>
                      {car.available ? 'Disponible' : 'Indisponible'}
                    </button>
                  </td>
                  <td className="px-3 sm:px-5 py-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <Link to={`/admin/cars/edit/${car.id}`}
                        className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs hover:bg-amber-200 transition whitespace-nowrap">
                        Modifier
                      </Link>
                      <button onClick={() => deleteCar(car.id)}
                        className="px-2 sm:px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs hover:bg-red-200 transition whitespace-nowrap">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {cars.length === 0 && (
          <p className="text-center text-gray-400 py-10">Aucune voiture trouvée</p>
        )}
      </div>
    </div>
  )
}