import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { motion } from 'framer-motion'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await api.post('/login', { email: form.email, password: form.password })
      console.log('RÉPONSE DU BACKEND :', response.data)
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      if (response.data.user?.role === 'admin') {
        navigate('/admin/cars')
      } else {
        navigate('/')
      }
    } catch (err) {
      const msg = err?.response?.data?.message || t('login_error_invalid')
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  // Configuration des variantes d'animation pour le titre
  const bannerVariants = {
    animate: { transition: { staggerChildren: 0.05 } }
  };

  const letterVariants = {
    initial: { 
      opacity: 0, 
      y: -80, 
      x: () => (Math.random() - 0.5) * 150, 
      rotate: () => (Math.random() - 0.5) * 90 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      rotate: 0,
      transition: { type: "spring", damping: 12, stiffness: 90 } 
    }
  };

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
        
        .feature-link { text-decoration: none; display: inline-block; flex-shrink: 0; }
        
        .feature-icon-box {
          width: 42px; height: 42px;
          background: rgba(0,201,177,0.04); border: 1px solid rgba(0,201,177,0.15);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          color: #00C9B1; transition: border-color 0.3s, background 0.3s, transform 0.2s;
        }
        .feature-link:hover .feature-icon-box {
          background: rgba(0,201,177,0.15); 
          border-color: rgba(0,201,177,0.4);
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .login-left { display: none; }
          .login-right { width: 100%; padding: 40px 24px; }
        }
      `}</style>

      {/* ─── LEFT PANEL ─── */}
      <div className="login-left">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#00C9B1', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>
            {t('login_welcome_tag', 'Bienvenue')}
          </div>
          
          <motion.h1 
            variants={bannerVariants}
            initial="initial"
            animate="animate"
            style={{ 
              fontSize: 'clamp(32px,3.5vw,52px)', 
              fontWeight: 800, 
              lineHeight: 1.2, 
              marginBottom: 16,
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              cursor: 'default'
            }}
          >
            <span style={{ display: 'flex', color: '#fff', filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.15))' }}>
              {(t('login_left_title_1') || "Accédez à votre").split('').map((letter, index) => (
                <motion.span
                  key={`title1-${index}`}
                  variants={letterVariants}
                  whileHover={{ scale: 1.2, y: -8, color: '#2dd4bf' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  style={{ display: 'inline-block' }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>

            <span style={{ display: 'flex', color: '#00C9B1', filter: 'drop-shadow(0 0 30px rgba(45,212,191,0.35))' }}>
              {(t('login_left_title_2') || "espace personnel").split('').map((letter, index) => (
                <motion.span
                  key={`title2-${index}`}
                  variants={letterVariants}
                  whileHover={{ scale: 1.2, y: -8, color: '#ffffff' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  style={{ display: 'inline-block' }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <div style={{ width: 44, height: 3, background: '#00C9B1', borderRadius: 2, marginBottom: 20 }} />
          
          <p style={{ fontSize: 14, color: '#777', fontWeight: 300, lineHeight: 1.75, maxWidth: 360 }}>
            {t('login_left_desc', 'Gérez vos réservations, consultez votre historique et accédez à nos offres exclusives.')}
          </p>

          {/* ⚡ Liste des fonctionnalités avec redirections intégrées (SVG natifs) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 52 }}>
            {[
              {
                to: "/services",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                ),
                title: t('login_feat_title_1', 'Réservation instantanée'),
                desc: t('login_feat_desc_1', 'Confirmez votre véhicule en 2 minutes')
              },
              {
                to: "/services",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: t('login_feat_title_2', 'Assurance incluse'),
                desc: t('login_feat_desc_2', 'Couverture tous risques garantie')
              },
              {
                to: "/contact",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
                title: t('login_feat_title_3', 'Support 24/7'),
                desc: t('login_feat_desc_3', 'Une équipe disponible à tout moment')
              },
            ].map((item, i) => (
              <div key={i} className="feature-item">
                <Link to={item.to} className="feature-link" title={`Aller vers la page ${item.to === '/services' ? 'Services' : 'Contact'}`}>
                  <div className="feature-icon-box">{item.icon}</div>
                </Link>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#555', fontWeight: 300 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL (form) ─── */}
      <div className="login-right">
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#00C9B1', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>
            {t('login_tag')}
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            {t('login_title')}
          </h2>
          <p style={{ fontSize: 13, color: '#555', fontWeight: 300 }}>
            {t('login_subtitle')}
          </p>
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
            <label className="field-label">{t('email_label')}</label>
            <input type="email" required className="field-input"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder={t('login_placeholder_email')} />
          </div>
          <div>
            <label className="field-label">{t('password_label')}</label>
            <input type="password" required className="field-input"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder={t('login_placeholder_password')} />
          </div>
          <button type="submit" className="btn-submit" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <><span className="spinner" />{t('login_connecting')}</> : t('btn_login')}
          </button>
        </form>

        <div style={{ marginTop: 28, textAlign: 'center', fontSize: 13, color: '#555' }}>
          {t('no_account')}{' '}
          <Link className="link-btn" to="/signup">{t('register_link')}</Link>
        </div>

        <div style={{ marginTop: 36, textAlign: 'center' }}>
          <Link className="link-btn" to="/" style={{ fontSize: 12, color: '#444' }}>
            ← {t('back_home')}
          </Link>
        </div>
      </div>
    </div>
  )
}