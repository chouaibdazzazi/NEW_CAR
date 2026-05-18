import { useState, useEffect } from 'react';
import api from '../../services/api'; 

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const response = await api.get('/admin/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error("Erreur de chargement Supabase :", error);
      } finally {
        setLoading(false);
      }
    };
    getReservations();
  }, []);

  // Fonction pour rendre la date created_at propre et lisible en français
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div style={{ color: '#fff', padding: '40px' }}>Chargement des données...</div>;

  return (
    <div style={{ padding: '40px 24px', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Gestion des Réservations</h1><br /><br />
      

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', fontSize: '12px', color: '#666', textAlign: 'left' }}>
            <th style={{ padding: '16px' }}>Date Demande</th> {/* Nouvelle colonne pour created_at */}
            <th style={{ padding: '16px' }}>Client</th>
            <th style={{ padding: '16px' }}>Véhicule</th>
            <th style={{ padding: '16px' }}>Début</th>
            <th style={{ padding: '16px' }}>Fin</th>
            <th style={{ padding: '16px' }}>Total Prix</th>
            <th style={{ padding: '16px' }}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px' }}>
              {/* Affichage de created_at formaté */}
              <td style={{ padding: '16px', color: '#aaa', fontSize: '13px' }}>
                {formatDate(res.created_at)}
              </td>
              
              <td style={{ padding: '16px', fontWeight: 600 }}>{res.user?.name || 'Client inconnu'}</td>
              <td style={{ padding: '16px' }}>{res.car?.brand} {res.car?.model}</td>
              <td style={{ padding: '16px', color: '#00C9B1' }}>{res.start_date}</td>
              <td style={{ padding: '16px', color: '#666' }}>{res.end_date}</td>
              <td style={{ padding: '16px', fontWeight: 600, color: '#00C9B1' }}>{res.total_price} MAD</td>
              <td style={{ padding: '16px' }}>
                <span style={{
                  padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                  background: res.status === 'Confirmée' ? 'rgba(0, 201, 177, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                  color: res.status === 'Confirmée' ? '#00C9B1' : '#ffc107'
                }}>
                  {res.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}