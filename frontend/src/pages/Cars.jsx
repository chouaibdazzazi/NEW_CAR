import { useState, useEffect } from 'react';
import api from '../services/api'; // Ton instance Axios configurée
import { useNavigate } from 'react-router-dom';

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialisation de la navigation pour la redirection vers les détails

  // 1. Récupération des voitures depuis le backend Laravel
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars'); // Ta route API publique pour lister les voitures
        setCars(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des véhicules :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // 2. Fonction de réservation déclenchée par le bouton
  const handleBooking = async (carId) => {
    try {
      const bookingData = {
        car_id: carId,
        start_date: "2026-06-01", // À remplacer dynamiquement avec un input ou un modal plus tard
        end_date: "2026-06-05"
      };
      const response = await api.post('/reservations', bookingData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de la réservation. Vérifiez votre connexion.");
    }
  };

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '100px', fontSize: '18px' }}>Chargement du parc automobile...</div>;
  }

  return (
    <div style={{ background: '#0b0e14', minHeight: '100vh', padding: '40px 24px', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Titre de la page */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>Notre Flotte de Véhicules</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>Trouvez la voiture idéale pour votre prochain déplacement</p>
      </div>

      {/* Grille responsive identique à ton modèle */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '24px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {cars.map((car) => (
          <div key={car.id} style={cardStyle}>
            
            {/* Zone Image avec Badges superposés */}
            <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
              <img 
                src={car.image_url || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'} 
                alt={`${car.brand} ${car.model}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              
              {/* Badge Année (Bleu en haut à gauche) */}
              <span style={yearBadgeStyle}>{car.year}</span>
              
              {/* Badge Statut (Orange en haut à droite) */}
              <span style={{
                ...statusBadgeStyle,
                background: car.is_available ? '#e67e22' : '#7f8c8d'
              }}>
                {car.is_available ? 'Disponible' : 'Louée'}
              </span>

              {/* Badge 100% En Ligne / Recommandé en bas à gauche */}
              <div style={onlineLabelStyle}>
                <span style={{ width: '8px', height: '8px', background: '#2ecc71', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }}></span>
                Instantané
              </div>
            </div>

            {/* Contenu de la Carte */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              
              {/* Titre : Marque + Modèle */}
              <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, margin: '0 0 10px 0', lineHeight: '1.3' }}>
                {car.brand} {car.model}
              </h3>

              {/* Description */}
              <p style={{ color: '#7a8293', fontSize: '14px', margin: '0 0 24px 0', lineHeight: '1.6', flexGrow: 1 }}>
                {car.description || "Aucune description spécifiée pour ce modèle de véhicule."}
              </p>

              {/* Ligne Infos : Prix & Caractéristiques */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <span style={{ color: '#fff', fontSize: '24px', fontWeight: 700 }}>{car.price_per_day}</span>
                  <span style={{ color: '#7a8293', fontSize: '14px', marginLeft: '4px' }}>MAD / jour</span>
                </div>
                <div style={{ color: '#7a8293', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>👤 {car.seats || 5} places</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Redirection dynamique vers la page de détails avec l'ID de la voiture */}
                <button 
                  onClick={() => navigate(`/cars/${car.id}`)} 
                  style={btnDetailsStyle}
                >
                  👁️ Détails
                </button>
                <button 
                  onClick={() => handleBooking(car.id)} 
                  disabled={!car.is_available}
                  style={{
                    ...btnRegisterStyle,
                    background: car.is_available ? '#3498db' : '#2c3e50',
                    cursor: car.is_available ? 'pointer' : 'not-allowed'
                  }}
                >
                  Réserver ➔
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

/* ==========================================
   STYLES COMPOSANTS (Thème Sombre Premium)
   ========================================== */
const cardStyle = {
  background: '#151922',
  borderRadius: '16px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.03)'
};

const yearBadgeStyle = {
  position: 'absolute',
  top: '16px',
  left: '16px',
  background: '#3498db',
  color: '#fff',
  padding: '6px 14px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 600
};

const statusBadgeStyle = {
  position: 'absolute',
  top: '16px',
  right: '16px',
  color: '#fff',
  padding: '6px 14px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 600,
  textTransform: 'uppercase'
};

const onlineLabelStyle = {
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  background: '#fff',
  color: '#000',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '11px',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  textTransform: 'uppercase'
};

const btnDetailsStyle = {
  flex: 1,
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '12px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
  transition: 'all 0.2s'
};

const btnRegisterStyle = {
  flex: 1.3,
  color: '#fff',
  border: 'none',
  padding: '12px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: 600,
  transition: 'all 0.2s'
};