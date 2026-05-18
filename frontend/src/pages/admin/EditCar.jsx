import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../../services/api'

const fields = [
  { name: 'brand',         label: 'Marque',           type: 'text',   required: true,  placeholder: 'Ex: Toyota' },
  { name: 'model',         label: 'Modèle',           type: 'text',   required: true,  placeholder: 'Ex: Corolla' },
  { name: 'year',          label: 'Année',            type: 'number', required: true,  placeholder: 'Ex: 2022' },
  { name: 'price_per_day', label: 'Prix/jour (MAD)',  type: 'number', required: true,  placeholder: 'Ex: 350' },
  { name: 'color',         label: 'Couleur',          type: 'text',   required: false, placeholder: 'Ex: Blanc' },
  { name: 'seats',         label: 'Nombre de sièges', type: 'number', required: false, placeholder: 'Ex: 5' },
]

export default function EditCar() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    brand: '', model: '', year: '', price_per_day: '',
    color: '', seats: 5, description: '', available: true
  })
  
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Charger les données actuelles de la voiture au chargement de la page
  useEffect(() => {
    api.get(`/cars/${id}`)
      .then(res => {
        setForm({
          brand: res.data.brand,
          model: res.data.model,
          year: res.data.year,
          price_per_day: res.data.price_per_day,
          color: res.data.color || '',
          seats: res.data.seats || 5,
          description: res.data.description || '',
          available: res.data.available
        })
        if (res.data.image_url) {
          setImagePreview(res.data.image_url) // Met l'image actuelle en aperçu
        }
      })
      .catch(() => setError('Impossible de récupérer les détails du véhicule'))
  }, [id])

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('brand', form.brand)
    formData.append('model', form.model)
    formData.append('year', form.year)
    formData.append('price_per_day', form.price_per_day)
    formData.append('color', form.color)
    formData.append('seats', form.seats)
    formData.append('description', form.description)
    formData.append('available', form.available ? '1' : '0') // Converti en string/bool pour le form-data
    
    // 🌟 L'ASTUCE CRUCIALE ICI : On dit à Laravel que c'est un PUT
    formData.append('_method', 'PUT')

    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      // 🌟 ATTENTION : On utilise api.post et NON PAS api.put
      // C'est le '_method' dans le formData qui va simuler le PUT côté Laravel
      await api.post(`/cars/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate('/admin/cars')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la modification de la voiture')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8" style={{ background: '#0f1117', minHeight: '100vh', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
      
      <div className="flex items-center gap-3 mb-6 max-w-4xl mx-auto">
        <Link to="/admin/cars" style={{ color: '#666' }} className="hover:text-gray-400 text-sm transition-colors">
          ← Retour à la liste
        </Link>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Modifier — <span style={{ color: '#00C9B1' }}>{form.brand} {form.model}</span>
        </h1>
      </div>

      <div className="max-w-4xl mx-auto" style={{ background: '#151821', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
        
        {error && (
          <p className="text-sm p-3 rounded-lg mb-4 text-center" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {fields.map(f => (
              <div key={f.name}>
                <label style={{ color: '#aaa' }} className="block text-sm mb-1 sm:mb-2">
                  {f.label} {f.required && <span className="text-red-500">*</span>}
                </label>
                <input 
                  type={f.type} 
                  name={f.name} 
                  value={form[f.name]}
                  onChange={handleChange} 
                  required={f.required}
                  placeholder={f.placeholder}
                  className="w-full text-sm focus:outline-none transition-all duration-200" 
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          <div>
            <label style={{ color: '#aaa' }} className="block text-sm mb-1 sm:mb-2">Description</label>
            <textarea 
              name="description" 
              value={form.description}
              onChange={handleChange} 
              rows={3}
              placeholder="Ajoutez des détails sur l'état, les options..."
              className="w-full text-sm focus:outline-none transition-all duration-200 resize-vertical" 
              style={{ ...inputStyle, borderRadius: '8px' }}
            />
          </div>

          {/* ZONE PHOTO DE LA MAQUETTE */}
          <div>
            <label style={{ color: '#aaa' }} className="block text-sm mb-1 sm:mb-2">Photo de la voiture</label>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <label 
                className="w-full flex-1 flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300" 
                style={{
                  border: '2px dashed rgba(255,255,255,0.15)', 
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.01)'
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = '#00C9B1'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                <span className="mt-2 text-sm" style={{ color: '#ccc' }}>Sélectionner ou glisser une nouvelle photo</span>
                <span className="text-xs mt-1" style={{ color: '#444' }}>Fichiers acceptés : PNG, JPG, WEBP</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>

              {imagePreview && (
                <div className="relative border" style={{ width: '110px', height: '110px', borderRadius: '12px', overflow: 'hidden', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <img src={imagePreview} alt="Aperçu" className="w-full h-full object-cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    type="button" 
                    onClick={() => { setImageFile(null); setImagePreview(null); }} 
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                    style={{ width: '20px', height: '20px', border: 'none', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Checkbox Disponible */}
          <div className="flex items-center gap-2 pt-2">
            <input 
              type="checkbox" 
              name="available" 
              id="available"
              checked={form.available}
              onChange={handleChange}
              className="w-4 h-4 accent-[#00C9B1]"
            />
            <label htmlFor="available" className="text-sm cursor-pointer select-none" style={{ color: '#ccc' }}>
              Disponible à la location
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
            <Link 
              to="/admin/cars"
              className="px-6 py-2.5 rounded-lg text-sm transition-colors text-center font-medium"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#ccc', border: '1px solid rgba(255,255,255,0.02)' }}
            >
              Annuler
            </Link>

            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center transition-all duration-200 disabled:opacity-50"
              style={{ background: '#00C9B1', color: '#000', border: 'none', cursor: 'pointer' }}
            >
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: '#1f2330',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  color: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  marginTop: '4px'
};