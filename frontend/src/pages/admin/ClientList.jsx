import { useState, useEffect } from 'react';

export default function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Ici tu feras ton fetch('http://127.0.0.1:8000/api/users')
    setClients([
      { id: 1, name: "Amine El Amrani", email: "amine@example.com", joined: "2026-04-12" },
      { id: 2, name: "Sara Tazi", email: "sara@example.com", joined: "2026-05-02" }
    ]);
  }, []);

  return (
    <div style={{ padding: '40px 24px', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Comptes Clients</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>Liste des utilisateurs enregistrés sur la plateforme</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', fontSize: '12px', color: '#666', textAlign: 'left' }}>
            <th style={{ padding: '16px' }}>Nom Complet</th>
            <th style={{ padding: '16px' }}>Adresse Email</th>
            <th style={{ padding: '16px' }}>Date d'inscription</th>
            <th style={{ padding: '16px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px' }}>
              <td style={{ padding: '16px', fontWeight: 600 }}>{client.name}</td>
              <td style={{ padding: '16px', color: '#bbb' }}>{client.email}</td>
              <td style={{ padding: '16px', color: '#666' }}>{client.joined}</td>
              <td style={{ padding: '16px' }}>
                <button style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#bbb',
                  padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', transition: 'all 0.2s'
                }} onMouseOver={e => e.target.style.borderColor = '#ff4d4d'} onMouseOut={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}>
                  Bloquer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}