import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'


export default function Signup() {
  const { t } = useTranslation()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError(t('error_all_fields')); return
    }
    if (form.password !== form.confirmPassword) {
      setError(t('error_password_match')); return
    }
    if (form.password.length < 6) {
      setError(t('error_password_length')); return
    }
    setLoading(true)
    try {
      const user = await register(form.name, form.email, form.password)
      navigate(user.role === 'admin' ? '/admin' : '/client')
    } catch (err) {
      setError(err.response?.data?.message || t('Impossible de créer le compte'))
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
  const strengthLabel = ['', t('password_strength_1'), t('password_strength_2'), t('password_strength_3'), t('password_strength_4'), t('password_strength_5')][strength]

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

        .signup-left {
          width: 480px; display: flex; flex-direction: column;
          justify-content: center; padding: 60px 56px;
          background: #0f1117; overflow-y: auto;
        }
        .signup-right {
          flex: 1;
          background: linear-gradient(135deg, rgba(0,201,177,0.12) 0%, rgba(15,17,23,0) 60%), #0a0c12;
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
        
        .benefit-link { text-decoration: none; display: inline-block; flex-shrink: 0; }
        
        .benefit-icon {
          width: 46px; height: 46px;
          background: rgba(0,201,177,0.04); border: 1px solid rgba(0,201,177,0.15);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          color: #00C9B1; transition: border-color 0.3s, background 0.3s, transform 0.2s;
        }
        .benefit-link:hover .benefit-icon {
          background: rgba(0,201,177,0.15); 
          border-color: rgba(0,201,177,0.4);
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .signup-right { display: none; }
          .signup-left { width: 100%; padding: 40px 24px; }
        }
      `}</style>

      {/* ─── LEFT: FORM ─── */}
      <div className="signup-left">
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#00C9B1', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>
            {t('signup_tag')}
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            {t('signup_title')}
          </h2>
          <p style={{ fontSize: 13, color: '#555', fontWeight: 300 }}>
            {t('signup_subtitle')}
          </p>
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
            <label className="field-label">{t('signup_name_label')}</label>
            <input type="text" className="field-input" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" />
          </div>
          <div>
            <label className="field-label">{t('email_label')}</label>
            <input type="email" className="field-input" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} placeholder="vous@example.com" />
          </div>
          <div>
            <label className="field-label">{t('password_label')}</label>
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
            <label className="field-label">{t('signup_confirm_password_label')}</label>
            <input type="password" className="field-input" value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })} placeholder="••••••••" />
            {form.confirmPassword && (
              <div style={{ marginTop: 8, fontSize: 12, color: form.password === form.confirmPassword ? '#00C9B1' : '#ef4444' }}>
                {form.password === form.confirmPassword ? t('password_match_success') : t('password_match_error')}
              </div>
            )}
          </div>
          <button type="submit" className="btn-submit" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <><span className="spinner" />{t('signup_loading')}</> : t('signup_btn')}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#555' }}>
          {t('signup_already_member')}{' '}
          <Link className="link-btn" to="/login">{t('signup_login_link')}</Link>
        </div>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Link className="link-btn" to="/" style={{ fontSize: 12, color: '#444' }}>
            ← {t('back_home')}
          </Link>
        </div>
      </div>

      {/* ─── RIGHT: DECORATIVE ─── */}
      <div className="signup-right">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#00C9B1', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>
            {t('signup_welcome_tag')}
          </div>
          
          <motion.h2 
            variants={bannerVariants}
            initial="initial"
            animate="animate"
            style={{ 
              fontSize: 'clamp(32px,3.5vw,50px)', 
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
              {(t('signup_right_title_1') || "Votre voyage").split('').map((letter, index) => (
                <motion.span
                  key={`su-title1-${index}`}
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
              {(t('signup_right_title_2') || "commence ici").split('').map((letter, index) => (
                <motion.span
                  key={`su-title2-${index}`}
                  variants={letterVariants}
                  whileHover={{ scale: 1.2, y: -8, color: '#ffffff' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  style={{ display: 'inline-block' }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
          </motion.h2>

          <div style={{ width: 44, height: 3, background: '#00C9B1', borderRadius: 2, marginBottom: 20 }} />
          <p style={{ fontSize: 14, color: '#777', fontWeight: 300, lineHeight: 1.75, maxWidth: 360, marginBottom: 52 }}>
            {t('signup_right_desc')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
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
                title: t('signup_feat_title_1'),
                desc: t('signup_feat_desc_1')
              },
              {
                to: "/services",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: t('signup_feat_title_2'),
                desc: t('signup_feat_desc_2')
              },
              {
                to: "/services",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
                title: t('signup_feat_title_3'),
                desc: t('signup_feat_desc_3')
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
                title: t('signup_feat_title_4'),
                desc: t('signup_feat_desc_4')
              }
            ].map((item, i) => (
              <div key={i} className="benefit">
                <Link to={item.to} className="benefit-link" title={`Aller vers la page ${item.to === '/services' ? 'Services' : 'Contact'}`}>
                  <div className="benefit-icon">{item.icon}</div>
                </Link>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#555', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}