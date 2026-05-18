import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CarDetails() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL (ex: /cars/3)
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des détails :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Veuillez sélectionner vos dates de location.");
      return;
    }

    setBookingLoading(true);
    try {
      const bookingData = {
        car_id: car.id,
        start_date: startDate,
        end_date: endDate
      };

      const response = await api.post('/reservations', bookingData);
      alert(response.data.message);
      navigate('/dashboard'); // Redirige le client vers ses réservations
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de la réservation.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div style={{ color: '#fff', padding: '100px', textAlign: 'center' }}>Chargement des spécifications...</div>;
  if (!car) return <div style={{ color: '#fff', padding: '100px', textAlign: 'center' }}>Véhicule introuvable.</div>;

  return (
    <div style={{ background: '#0b0e14', minHeight: '100vh', color: '#fff', padding: '40px 24px', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <Link to="/cars" style={{ color: '#666', textDecoration: 'none', display: 'inline-block', marginBottom: '32px' }}>
          ← Retour aux véhicules
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          
          {/* COLONNE GAUCHE : IMAGE */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <img 
              src={car.image_url || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'} 
              alt={`${car.brand} ${car.model}`} 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* COLONNE DROITE : INFOS & RÉSERVATION */}
          <div>
            <span style={{ background: car.is_available ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)', color: car.is_available ? '#2ecc71' : '#e74c3c', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}>
              {car.is_available ? '● Disponible Immédiatement' : '● Actuellement Louée'}
            </span>

            <h1 style={{ fontSize: '40px', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>{car.brand}</h1>
            <h2 style={{ fontSize: '24px', color: '#7a8293', fontWeight: 400, marginBottom: '24px' }}>{car.model} — {car.year}</h2>

            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', background: '#151922', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }}>
              <div>
                <p style={{ color: '#666', margin: '0 0 4px 0', fontSize: '13px' }}>PRIX PAR JOUR</p>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#00C9B1' }}>{car.price_per_day} MAD</span>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
                <p style={{ color: '#666', margin: '0 0 4px 0', fontSize: '13px' }}>CAPACITÉ</p>
                <span style={{ fontSize: '24px', fontWeight: 700 }}>{car.seats || 5} Places</span>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
                <p style={{ color: '#666', margin: '0 0 4px 0', fontSize: '13px' }}>COULEUR</p>
                <span style={{ fontSize: '24px', fontWeight: 700, textTransform: 'capitalize' }}>{car.color || 'N/A'}</span>
              </div>
            </div>

            <p style={{ color: '#aaa', lineHeight: '1.7', marginBottom: '40px', fontSize: '15px' }}>
              {car.description || "Aucune description supplémentaire disponible pour ce véhicule. Veuillez contacter notre support pour plus d'informations."}
            </p>

            {/* FORMULAIRE DE RÉSERVATION */}
            <form onSubmit={handleBooking} style={{ background: '#151922', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>Planifier votre location</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: '#666', fontSize: '13px', marginBottom: '8px' }}>Date de début</label>
                  <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#666', fontSize: '13px', marginBottom: '8px' }}>Date de fin</label>
                  <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!car.is_available || bookingLoading} 
                style={{
                  width: '100%', background: car.is_available ? '#3498db' : '#2c3e50', color: '#fff',
                  border: 'none', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: 600,
                  cursor: car.is_available ? 'pointer' : 'not-allowed', transition: 'all 0.2s'
                }}
              >
                {bookingLoading ? 'Vérification...' : car.is_available ? 'Confirmer la réservation ➔' : 'Véhicule indisponible'}
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px', background: '#0b0e14', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box'
};