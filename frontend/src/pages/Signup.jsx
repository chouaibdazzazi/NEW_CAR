import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ── Inline SVG Logo ──────────────────────────────────────────────────────────
function CarFlowLogoSVG({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cfGradS" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C9B1" />
          <stop offset="100%" stopColor="#007a6e" />
        </linearGradient>
      </defs>
      <path d="M80 18 A40 40 0 1 0 80 82"
        stroke="url(#cfGradS)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <g transform="translate(22, 32) scale(0.85)">
        <path d="M4 24 Q4 17 11 15 L24 11 Q32 7 42 9 L54 11 Q62 12 66 17 L70 24 Q74 24 74 28 L74 34 Q74 38 70 38 L8 38 Q4 38 4 34 Z"
          fill="url(#cfGradS)" />
        <path d="M20 15 Q24 6 37 5 Q52 4 56 15"
          fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M37 6 L37 15" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="38" r="8" fill="#0f1117" stroke="url(#cfGradS)" strokeWidth="3.5" />
        <circle cx="17" cy="38" r="3.5" fill="#00C9B1" />
        <circle cx="60" cy="38" r="8" fill="#0f1117" stroke="url(#cfGradS)" strokeWidth="3.5" />
        <circle cx="60" cy="38" r="3.5" fill="#00C9B1" />
      </g>
      <path d="M8 46 L2 46" stroke="#00C9B1" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M8 52 L0 52" stroke="#00C9B1" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M8 58 L3 58" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

export default function Signup() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Veuillez remplir tous les champs'); return
    }
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas'); return
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères'); return
    }
    setLoading(true)
    try {
      const user = await register(form.name, form.email, form.password)
      navigate(user.role === 'admin' ? '/admin' : '/client')
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de créer le compte')
    } finally {
      setLoading(false)
    }
  }

  const strength = (() => {
    const p = form.password; if (!p) return 0
    let s = 0
    if (p.length >= 6) s++
    if (p.length >= 10) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()
  const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#00C9B1'][strength]
  const strengthLabel = ['', 'Très faible', 'Faible', 'Moyen', 'Fort', 'Excellent'][strength]

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', display: 'flex', fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .signup-left {
          width: 480px; display: flex; flex-direction: column;
          justify-content: center; padding: 60px 56px;
          background: #0f1117; overflow-y: auto;
        }
        .signup-right {
          flex: 1;
          background: linear-gradient(135deg, rgba(0,201,177,0.1) 0%, rgba(15,17,23,0) 60%), #0a0c12;
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 72px;
          border-left: 1px solid rgba(0,201,177,0.1);
          position: relative; overflow: hidden;
        }
        .signup-right::before {
          content: ''; position: absolute;
          width: 380px; height: 380px; border-radius: 50%;
          background: rgba(0,201,177,0.06);
          bottom: -80px; right: -80px;
        }

        .field-label {
          display: block; font-size: 11px; font-weight: 600; color: #888;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
        }
        .field-input {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          color: #fff; padding: 13px 18px; border-radius: 6px;
          font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 300;
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

        .benefit { display: flex; gap: 16px; align-items: flex-start; }
        .benefit-icon {
          width: 46px; height: 46px;
          background: rgba(0,201,177,0.1); border: 1px solid rgba(0,201,177,0.2);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          font-size: 21px; flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .signup-right { display: none; }
          .signup-left { width: 100%; padding: 40px 24px; }
        }
      `}</style>

      {/* ─── LEFT: FORM ─── */}
      <div className="signup-left">
        {/* Logo */}
        <div onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48, cursor: 'pointer' }}>
          <CarFlowLogoSVG size={36} />
          <span style={{ fontSize: 19, fontWeight: 700, color: '#fff' }}>
            Car<span style={{ color: '#00C9B1' }}>Flow</span>
          </span>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#00C9B1', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Inscription</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Créer votre compte</h2>
          <p style={{ fontSize: 13, color: '#555', fontWeight: 300 }}>Rejoignez CarFlow et réservez dès aujourd'hui.</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
            color: '#f87171', padding: '12px 16px', borderRadius: 6, fontSize: 13,
            marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label className="field-label">Nom complet</label>
            <input type="text" className="field-input" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" />
          </div>
          <div>
            <label className="field-label">Adresse email</label>
            <input type="email" className="field-input" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} placeholder="vous@example.com" />
          </div>
          <div>
            <label className="field-label">Mot de passe</label>
            <input type="password" className="field-input" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            {form.password && (
              <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                      flex: 1, height: 3, borderRadius: 2,
                      background: i <= strength ? strengthColor : 'rgba(255,255,255,0.08)',
                      transition: 'background 0.3s'
                    }} />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: strengthColor, letterSpacing: 0.5 }}>{strengthLabel}</div>
              </div>
            )}
          </div>
          <div>
            <label className="field-label">Confirmer le mot de passe</label>
            <input type="password" className="field-input" value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })} placeholder="••••••••" />
            {form.confirmPassword && (
              <div style={{ marginTop: 8, fontSize: 12, color: form.password === form.confirmPassword ? '#00C9B1' : '#ef4444' }}>
                {form.password === form.confirmPassword ? '✓ Mots de passe identiques' : '✗ Ne correspondent pas'}
              </div>
            )}
          </div>
          <button type="submit" className="btn-submit" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <><span className="spinner" />Création du compte...</> : "S'inscrire gratuitement"}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#555' }}>
          Déjà membre ?{' '}
          <button className="link-btn" onClick={() => navigate('/login')}>Se connecter</button>
        </div>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <button className="link-btn" onClick={() => navigate('/')} style={{ fontSize: 12, color: '#444' }}>
            ← Retour à l'accueil
          </button>
        </div>
      </div>

      {/* ─── RIGHT: DECORATIVE ─── */}
      <div className="signup-right">
        {/* CarFlow logo watermark */}
        <div style={{ position: 'absolute', top: 48, left: 56, display: 'flex', alignItems: 'center', gap: 10, zIndex: 1 }}>
          <CarFlowLogoSVG size={34} />
          <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>
            Car<span style={{ color: '#00C9B1' }}>Flow</span>
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#00C9B1', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>Rejoignez-nous</div>
          <h2 style={{ fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            Votre voyage<br /><span style={{ color: '#00C9B1' }}>commence ici</span>
          </h2>
          <div style={{ width: 44, height: 3, background: '#00C9B1', borderRadius: 2, marginBottom: 20 }} />
          <p style={{ fontSize: 14, color: '#666', fontWeight: 300, lineHeight: 1.75, maxWidth: 360, marginBottom: 52 }}>
            Créez votre compte en quelques instants et accédez à notre flotte de véhicules disponibles partout au Maroc.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            {[
              ['🎯', 'Réservation instantanée', 'Confirmez en moins de 2 minutes, sans paperasse.'],
              ['🛡️', 'Assurance tous risques', 'Incluse dans chaque location, sans supplément.'],
              ['💎', 'Offres exclusives', 'Tarifs préférentiels et promotions réservées aux membres.'],
              ['📱', 'Suivi en temps réel', 'Gérez vos réservations depuis votre espace client.'],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="benefit">
                <div className="benefit-icon">{icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, color: '#555', fontWeight: 300, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}