import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function DashboardHome() {
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [stats, setStats] = useState({ total: 0, available: 0, avgPrice: 0 })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')

  useEffect(() => {
    fetchCars()
  }, [])

  useEffect(() => {
    // Filtrer les voitures en fonction du terme de recherche et du statut
    const filtered = cars.filter(car => {
      const matchesSearch =
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm) ||
        (car.color && car.color.toLowerCase().includes(searchTerm.toLowerCase()))

      if (!matchesSearch) return false

      if (availabilityFilter === 'available') return car.available
      if (availabilityFilter === 'rented') return !car.available
      return true
    })

    setFilteredCars(filtered)
  }, [cars, searchTerm, availabilityFilter])

  const fetchCars = async () => {
    try {
      const res = await api.get('/cars')
      const carsData = res.data
      setCars(carsData)
      setFilteredCars(carsData) // Initialiser filteredCars

      const total = carsData.length
      const available = carsData.filter(car => car.available).length
      const avgPrice = total > 0 ? Math.round(carsData.reduce((sum, car) => sum + car.price_per_day, 0) / total) : 0

      setStats({ total, available, avgPrice })
    } catch (error) {
      console.error('Erreur lors du chargement des voitures:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleAvailability = async (id) => {
    try {
      await api.patch(`/cars/${id}/availability`)
      fetchCars() // Recharger les données
    } catch (error) {
      console.error('Erreur lors de la modification:', error)
    }
  }

  const deleteCar = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      try {
        await api.delete(`/cars/${id}`)
        fetchCars() // Recharger les données
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  return (
    <>
      <style>
        {`
          .cr-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 1.75rem;
            border-bottom: 1px solid #1e2130;
          }

          .cr-page-title {
            font-family: 'Syne', sans-serif;
            font-size: 1.125rem;
            font-weight: 700;
            color: #ffffff;
          }

          .cr-page-subtitle {
            font-size: 0.75rem;
            color: #4a5268;
            margin-top: 0.125rem;
          }

          .cr-topbar-actions {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            flex-wrap: wrap;
          }

          .cr-search {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #111318;
            border: 1px solid #1e2130;
            border-radius: 0.625rem;
            padding: 0.5rem 0.875rem;
            font-size: 0.8125rem;
            color: #4a5268;
            min-width: 200px;
            flex: 1;
            max-width: 300px;
          }

          .cr-search input {
            background: transparent;
            border: none;
            outline: none;
            color: #4a5268;
            flex: 1;
            font-size: 0.8125rem;
            placeholder-color: #4a5268;
          }

          .cr-btn-primary {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 0.625rem;
            padding: 0.5625rem 1.125rem;
            font-size: 0.8125rem;
            font-weight: 500;
            cursor: pointer;
            font-family: 'DM Sans', sans-serif;
            transition: all 0.15s;
            white-space: nowrap;
          }

          .cr-btn-primary:hover { background: #2563eb; transform: translateY(-1px); }

          .cr-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.75rem;
            padding: 1.25rem 1.75rem 0;
          }

          .cr-stat-card {
            background: #111318;
            border: 1px solid #1e2130;
            border-radius: 0.75rem;
            padding: 1rem 1.125rem;
            display: flex;
            align-items: center;
            gap: 0.875rem;
            transition: border-color 0.15s;
          }

          .cr-stat-card:hover { border-color: #2d3350; }

          .cr-stat-icon {
            width: 2.375rem;
            height: 2.375rem;
            border-radius: 0.625rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.125rem;
            flex-shrink: 0;
          }

          .cr-stat-icon.blue { background: rgba(59,130,246,0.15); color: #3b82f6; }
          .cr-stat-icon.green { background: rgba(34,197,94,0.12); color: #22c55e; }
          .cr-stat-icon.amber { background: rgba(245,158,11,0.12); color: #f59e0b; }

          .cr-stat-val {
            font-family: 'Syne', sans-serif;
            font-size: 1.375rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1;
          }

          .cr-stat-label {
            font-size: 0.6875rem;
            color: #4a5268;
            margin-top: 0.1875rem;
            text-transform: uppercase;
            letter-spacing: 0.03125rem;
          }

          .cr-table-section {
            flex: 1;
            overflow-x: auto;
            padding: 1rem 1.75rem 1.25rem;
          }

          .cr-table-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.875rem;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .cr-table-count {
            font-size: 0.8125rem;
            color: #4a5268;
          }

          .cr-table-count strong { color: #7a8099; font-weight: 500; }

          .cr-filter-tabs {
            display: flex;
            gap: 0.375rem;
            flex-wrap: wrap;
          }

          .cr-filter-tab {
            font-size: 0.75rem;
            padding: 0.3125rem 0.75rem;
            border-radius: 1.25rem;
            cursor: pointer;
            border: 1px solid transparent;
            transition: all 0.15s;
            color: #4a5268;
            background: transparent;
            font-family: 'DM Sans', sans-serif;
          }

          .cr-filter-tab.active {
            background: rgba(59,130,246,0.12);
            border-color: rgba(59,130,246,0.3);
            color: #60a5fa;
          }

          .cr-table-container {
            overflow-x: auto;
            border-radius: 0.75rem;
            background: #111318;
            border: 1px solid #1e2130;
          }

          table.cr-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.8125rem;
            min-width: 600px;
          }

          .cr-table thead tr {
            border-bottom: 1px solid #1e2130;
          }

          .cr-table th {
            font-size: 0.625rem;
            font-weight: 500;
            color: #4a5268;
            text-transform: uppercase;
            letter-spacing: 0.125rem;
            padding: 0 0.75rem 0.625rem;
            text-align: left;
            white-space: nowrap;
            position: sticky;
            top: 0;
            background: #111318;
          }

          .cr-table tbody tr {
            border-bottom: 1px solid rgba(30,33,48,0.6);
            transition: background 0.12s;
          }

          .cr-table tbody tr:hover { background: rgba(255,255,255,0.02); }

          .cr-table td {
            padding: 0.8125rem 0.75rem;
            color: #9aa0bb;
          }

          .cr-table td.brand {
            font-weight: 600;
            color: #dde2f5;
            font-size: 0.84375rem;
          }

          .cr-price {
            color: #60a5fa;
            font-weight: 500;
            font-variant-numeric: tabular-nums;
          }

          .cr-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.3125rem;
            padding: 0.25rem 0.625rem;
            border-radius: 1.25rem;
            font-size: 0.6875rem;
            font-weight: 500;
          }

          .cr-badge.available {
            background: rgba(34,197,94,0.1);
            color: #4ade80;
            border: 1px solid rgba(34,197,94,0.2);
          }

          .cr-badge.unavailable {
            background: rgba(239,68,68,0.1);
            color: #f87171;
            border: 1px solid rgba(239,68,68,0.2);
          }

          .cr-badge-dot {
            width: 0.3125rem;
            height: 0.3125rem;
            border-radius: 50%;
            background: currentColor;
          }

          .cr-action-btn {
            background: #1a1d28;
            border: 1px solid #2d3350;
            color: #7a8099;
            padding: 0.375rem 0.75rem;
            border-radius: 0.5rem;
            font-size: 0.71875rem;
            cursor: pointer;
            font-family: 'DM Sans', sans-serif;
            display: inline-flex;
            align-items: center;
            gap: 0.3125rem;
            transition: all 0.15s;
          }

          .cr-action-btn:hover {
            background: #232840;
            color: #c8cee8;
            border-color: #3b82f6;
          }

          .cr-action-btn.delete:hover {
            background: rgba(239,68,68,0.1);
            color: #f87171;
            border-color: rgba(239,68,68,0.3);
          }

          .cr-table-section::-webkit-scrollbar {
            width: 0.25rem;
            height: 0.25rem;
          }

          .cr-table-section::-webkit-scrollbar-track {
            background: transparent;
          }

          .cr-table-section::-webkit-scrollbar-thumb {
            background: #2d3350;
            border-radius: 0.25rem;
          }

          /* Media Queries */
          @media (max-width: 768px) {
            .cr-topbar {
              padding: 1rem;
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
            }

            .cr-topbar-actions {
              width: 100%;
              justify-content: space-between;
            }

            .cr-search {
              min-width: auto;
              flex: 1;
              max-width: none;
            }

            .cr-stats {
              padding: 1rem;
              grid-template-columns: 1fr;
              gap: 0.5rem;
            }

            .cr-stat-card {
              padding: 0.75rem;
            }

            .cr-table-section {
              padding: 1rem;
            }

            .cr-table-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 0.5rem;
            }

            .cr-filter-tabs {
              width: 100%;
              justify-content: center;
            }
          }

          @media (max-width: 480px) {
            .cr-topbar-actions {
              flex-direction: column;
              gap: 0.5rem;
              align-items: stretch;
            }

            .cr-search {
              order: 2;
            }

            .cr-btn-primary {
              order: 1;
              justify-content: center;
            }

            .cr-stat-card {
              flex-direction: column;
              text-align: center;
              gap: 0.5rem;
            }

            .cr-table-container {
              border-radius: 0;
              border-left: none;
              border-right: none;
            }
          }
        `}
      </style>

      <div className="cr-topbar">
        <div>
          <div className="cr-page-title">Tableau de bord</div>
          <div className="cr-page-subtitle">Gestion du parc automobile</div>
        </div>
        <div className="cr-topbar-actions">
          <div className="cr-search">
            <i className="ti ti-search" style={{fontSize:'15px'}}></i>
            <input
              type="text"
              placeholder="Rechercher une voiture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm color-#4a5268 placeholder-#4a5268 flex-1"
            />
          </div>
          <button className="cr-btn-primary" onClick={() => navigate('/admin/cars/add')}>
            <i className="ti ti-plus"></i> Ajouter
          </button>
        </div>
      </div>

      <div className="cr-stats">
        <div className="cr-stat-card">
          <div className="cr-stat-icon blue"><i className="ti ti-car"></i></div>
          <div>
            <div className="cr-stat-val">{stats.total}</div>
            <div className="cr-stat-label">Total voitures</div>
          </div>
        </div>
        <div className="cr-stat-card">
          <div className="cr-stat-icon green"><i className="ti ti-check"></i></div>
          <div>
            <div className="cr-stat-val">{stats.available}</div>
            <div className="cr-stat-label">Disponibles</div>
          </div>
        </div>
        <div className="cr-stat-card">
          <div className="cr-stat-icon amber"><i className="ti ti-coin"></i></div>
          <div>
            <div className="cr-stat-val">{stats.avgPrice} MAD</div>
            <div className="cr-stat-label">Prix moy/jour</div>
          </div>
        </div>
      </div>

      <div className="cr-table-section">
        <div className="cr-table-header">
          <div className="cr-table-count"><strong>{filteredCars.length}</strong> voitures au total{searchTerm && ` (filtré sur ${cars.length})`}</div>
          <div className="cr-filter-tabs">
            <button
              className={`cr-filter-tab ${availabilityFilter === 'all' ? 'active' : ''}`}
              onClick={() => setAvailabilityFilter('all')}
            >
              Tous
            </button>
            <button
              className={`cr-filter-tab ${availabilityFilter === 'available' ? 'active' : ''}`}
              onClick={() => setAvailabilityFilter('available')}
            >
              Disponibles
            </button>
            <button
              className={`cr-filter-tab ${availabilityFilter === 'rented' ? 'active' : ''}`}
              onClick={() => setAvailabilityFilter('rented')}
            >
              Loués
            </button>
          </div>
        </div>

        <table className="cr-table">
          <thead>
            <tr>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Année</th>
              <th>Prix/Jour</th>
              <th>Couleur</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.length > 0 ? (
              filteredCars.map(car => (
                <tr key={car.id}>
                  <td className="brand">{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td className="cr-price">{car.price_per_day} MAD</td>
                  <td>{car.color || '—'}</td>
                  <td>
                    <span className={`cr-badge ${car.available ? 'available' : 'unavailable'}`}>
                      <span className="cr-badge-dot"></span>
                      {car.available ? 'Disponible' : 'Loué'}
                    </span>
                  </td>
                  <td style={{display:'flex',gap:'6px',alignItems:'center'}}>
                    <button className="cr-action-btn" onClick={() => navigate(`/admin/cars/edit/${car.id}`)}>
                      <i className="ti ti-edit"></i> Modifier
                    </button>
                    <button className="cr-action-btn delete" onClick={() => deleteCar(car.id)}>
                      <i className="ti ti-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : searchTerm ? (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '40px', color: '#4a5268'}}>
                  <i className="ti ti-search" style={{fontSize: '24px', marginBottom: '10px', display: 'block'}}></i>
                  Aucune voiture trouvée pour "{searchTerm}"
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '40px', color: '#4a5268'}}>
                  Aucune voiture disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}