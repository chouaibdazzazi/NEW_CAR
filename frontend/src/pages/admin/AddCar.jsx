import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

// On gère les champs textuels de manière dynamique
const fields = [
  { name: 'brand',         label: 'Marque',           type: 'text',   required: true,  placeholder: 'Ex: Toyota' },
  { name: 'model',         label: 'Modèle',           type: 'text',   required: true,  placeholder: 'Ex: Corolla' },
  { name: 'year',          label: 'Année',            type: 'number', required: true,  placeholder: 'Ex: 2022' },
  { name: 'price_per_day', label: 'Prix/jour (MAD)',  type: 'number', required: true,  placeholder: 'Ex: 350' },
  { name: 'color',         label: 'Couleur',          type: 'text',   required: false, placeholder: 'Ex: Blanc' },
  { name: 'seats',         label: 'Nombre de sièges', type: 'number', required: false, placeholder: 'Ex: 5' },
]

export default function AddCar() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    brand: '', model: '', year: '', price_per_day: '',
    color: '', seats: 5, description: ''
  })
  
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file)) // Lien d'aperçu temporaire réutilisé ici
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Utilisation de l'objet FormData requis par Laravel pour intercepter le fichier
    const formData = new FormData()
    formData.append('brand', form.brand)
    formData.append('model', form.model)
    formData.append('year', form.year)
    formData.append('price_per_day', form.price_per_day)
    formData.append('color', form.color)
    formData.append('seats', form.seats)
    formData.append('description', form.description)
    
    if (imageFile) {
      // Clé 'image' : interceptée directement par $request->file('image') dans le CarController
      formData.append('image', imageFile) 
    }

    try {
      // Envoi de la requête multipart/form-data vers l'API Laravel
      await api.post('/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate('/admin/cars')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout de la voiture')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8" style={{ background: '#0f1117', minHeight: '100vh', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* En-tête / Retour */}
      <div className="flex items-center gap-3 mb-6 max-w-4xl mx-auto">
        <Link to="/admin/cars" style={{ color: '#666' }} className="hover:text-gray-400 text-sm transition-colors">
          ← Retour
        </Link>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Ajouter une voiture</h1>
      </div>

      {/* Boîte principale du Formulaire (Sombre) */}
      <div className="max-w-4xl mx-auto" style={{ background: '#151821', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
        
        {error && (
          <p className="text-sm p-3 rounded-lg mb-4 text-center" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          
          {/* Grille des Inputs dynamiques */}
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

          {/* Zone Description */}
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

          {/* ZONE D'UPLOAD PHOTO STYLISÉE */}
          <div>
            <label style={{ color: '#aaa' }} className="block text-sm mb-1 sm:mb-2">Photo de la voiture</label>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Zone cliquable et glissable */}
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
                <span className="mt-2 text-sm" style={{ color: '#ccc' }}>Sélectionner ou glisser une photo</span>
                <span className="text-xs mt-1" style={{ color: '#444' }}>Fichiers acceptés : PNG, JPG, WEBP</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>

              {/* Box d'aperçu de l'image (Conservé tel quel d'après ta structure) */}
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

          {/* Boutons de soumission */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
            <Link 
              to="/admin/cars"
              className="px-6 py-2.5 rounded-lg text-sm transition-colors text-center font-medium"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#ccc', border: '1px solid rgba(255,255,255,0.02)' }}
              onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
            >
              Annuler
            </Link>

            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center transition-all duration-200 disabled:opacity-50"
              style={{ background: '#00C9B1', color: '#000', border: 'none', cursor: 'pointer' }}
              onMouseOver={e => e.target.style.opacity = '0.9'}
              onMouseOut={e => e.target.style.opacity = '1'}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enregistrement...
                </>
              ) : (
                'Enregistrer la voiture'
              )}
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