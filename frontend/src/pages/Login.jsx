import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

// ── Inline SVG Logo ──────────────────────────────────────────────────────────
function CarFlowLogoSVG({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cfGradL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C9B1" />
          <stop offset="100%" stopColor="#007a6e" />
        </linearGradient>
      </defs>
      <path d="M80 18 A40 40 0 1 0 80 82"
        stroke="url(#cfGradL)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <g transform="translate(22, 32) scale(0.85)">
        <path d="M4 24 Q4 17 11 15 L24 11 Q32 7 42 9 L54 11 Q62 12 66 17 L70 24 Q74 24 74 28 L74 34 Q74 38 70 38 L8 38 Q4 38 4 34 Z"
          fill="url(#cfGradL)" />
        <path d="M20 15 Q24 6 37 5 Q52 4 56 15"
          fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M37 6 L37 15" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="38" r="8" fill="#0f1117" stroke="url(#cfGradL)" strokeWidth="3.5" />
        <circle cx="17" cy="38" r="3.5" fill="#00C9B1" />
        <circle cx="60" cy="38" r="8" fill="#0f1117" stroke="url(#cfGradL)" strokeWidth="3.5" />
        <circle cx="60" cy="38" r="3.5" fill="#00C9B1" />
      </g>
      <path d="M8 46 L2 46" stroke="#00C9B1" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M8 52 L0 52" stroke="#00C9B1" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M8 58 L3 58" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // Si un token existe, on redirige immédiatement l'utilisateur vers l'accueil
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [navigate])

  // Le reste de ton code (handleSubmit, return...) reste identique


  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await api.post('/login', { email: form.email, password: form.password })
      
      // 🔍 DEBUG : Affiche exactement ce que Laravel retourne
      console.log('RÉPONSE DU BACKEND :', response.data)
      
      // 🌟 1. Sauvegarde le token pour rester connecté
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      // 🌟 2. Redirection selon le rôle utilisateur
      if (response.data.user?.role === 'admin') {
        navigate('/admin/cars')
      } else {
        navigate('/')
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Identifiants incorrects'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', display: 'flex', fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-left {
          flex: 1;
          background: linear-gradient(135deg, rgba(0,201,177,0.12) 0%, rgba(15,17,23,0) 60%), #0a0c12;
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 72px;
          border-right: 1px solid rgba(0,201,177,0.1);
          position: relative; overflow: hidden;
        }
        .login-left::before {
          content: ''; position: absolute;
          width: 400px; height: 400px; border-radius: 50%;
          background: rgba(0,201,177,0.06);
          top: -100px; right: -100px;
        }
        .login-left::after {
          content: ''; position: absolute;
          width: 250px; height: 250px; border-radius: 50%;
          background: rgba(0,201,177,0.04);
          bottom: -60px; left: -60px;
        }

        .login-right {
          width: 480px; display: flex; flex-direction: column;
          justify-content: center; padding: 72px 56px;
          background: #0f1117;
        }

        .field-label {
          display: block; font-size: 11px; font-weight: 600; color: #888;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
        }
        .field-input {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          color: #fff; padding: 14px 18px; border-radius: 6px;
          font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 300;
          outline: none; transition: border-color 0.3s, background 0.3s;
        }
        .field-input:focus { border-color: #00C9B1; background: rgba(0,201,177,0.05); }
        .field-input::placeholder { color: #3a3a3a; }

        .btn-submit {
          width: 100%; background: linear-gradient(135deg,#00C9B1,#009e8e);
          color: #0f1117; border: none; padding: 15px;
          font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
          border-radius: 6px; cursor: pointer; letter-spacing: 1px;
          transition: opacity 0.3s, transform 0.2s;
          box-shadow: 0 4px 20px rgba(0,201,177,0.25);
        }
        .btn-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .link-btn {
          background: none; border: none; color: #00C9B1;
          font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; text-decoration: underline; transition: opacity 0.2s;
        }
        .link-btn:hover { opacity: 0.75; }

        .spinner {
          display: inline-block; width: 15px; height: 15px;
          border: 2px solid rgba(15,17,23,0.3); border-top-color: #0f1117;
          border-radius: 50%; animation: spin 0.8s linear infinite;
          margin-right: 8px; vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .feature-item { display: flex; align-items: flex-start; gap: 14px; }
        .feature-icon-box {
          width: 42px; height: 42px;
          background: rgba(0,201,177,0.1); border: 1px solid rgba(0,201,177,0.2);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-size: 19px; flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .login-left { display: none; }
          .login-right { width: 100%; padding: 40px 24px; }
        }
      `}</style>

      {/* ─── LEFT PANEL ─── */}
      <div className="login-left">
        {/* Logo */}
        <div onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 72, cursor: 'pointer', position: 'relative', zIndex: 1 }}>
          <CarFlowLogoSVG size={38} />
          <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>
            Car<span style={{ color: '#00C9B1' }}>Flow</span>
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#00C9B1', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>Bienvenue</div>
          <h1 style={{ fontSize: 'clamp(32px,3.5vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            Accédez à votre<br /><span style={{ color: '#00C9B1' }}>espace personnel</span>
          </h1>
          <div style={{ width: 44, height: 3, background: '#00C9B1', borderRadius: 2, marginBottom: 20 }} />
          <p style={{ fontSize: 14, color: '#777', fontWeight: 300, lineHeight: 1.75, maxWidth: 360 }}>
            Gérez vos réservations, consultez votre historique et accédez à nos offres exclusives.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 52 }}>
            {[
              ['🚗', 'Réservation instantanée', 'Confirmez votre véhicule en 2 minutes'],
              ['🛡️', 'Assurance incluse', 'Couverture tous risques garantie'],
              ['📞', 'Support 24/7', 'Une équipe disponible à tout moment'],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon-box">{icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{title}</div>
                  <div style={{ fontSize: 12, color: '#555', fontWeight: 300 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL (form) ─── */}
      <div className="login-right">
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#00C9B1', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Connexion</div>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Connectez-vous</h2>
          <p style={{ fontSize: 13, color: '#555', fontWeight: 300 }}>Administrateur ou client — un seul portail.</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
            color: '#f87171', padding: '12px 16px', borderRadius: 6, fontSize: 13,
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div>
            <label className="field-label">Adresse email</label>
            <input type="email" required className="field-input"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="votre@email.com" />
          </div>
          <div>
            <label className="field-label">Mot de passe</label>
            <input type="password" required className="field-input"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-submit" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <><span className="spinner" />Connexion...</> : 'Se connecter'}
          </button>
        </form>

        <div style={{ marginTop: 28, textAlign: 'center', fontSize: 13, color: '#555' }}>
          Pas encore de compte ?{' '}
          <button className="link-btn" onClick={() => navigate('/signup')}>Créer un compte</button>
        </div>

        <div style={{ marginTop: 36, textAlign: 'center' }}>
          <button className="link-btn" onClick={() => navigate('/')} style={{ fontSize: 12, color: '#444' }}>
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  )
}