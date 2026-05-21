import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import * as Icons from 'lucide-react'

const STATS = [
  { value: '500+', label: 'Véhicules disponibles' },
  { value: '12K+', label: 'Clients satisfaits' },
  { value: '15 ans', label: "D'expérience" },
  { value: '24/7', label: 'Assistance client' },
]

// ── Inline SVG Logo ──────────────────────────────────────────────────────────
function CarFlowLogoSVG({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C9B1" />
          <stop offset="100%" stopColor="#007a6e" />
        </linearGradient>
      </defs>
      {/* Outer C arc */}
      <path d="M80 18 A40 40 0 1 0 80 82"
        stroke="url(#cfGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />
      {/* Car body */}
      <g transform="translate(22, 32) scale(0.85)">
        <path d="M4 24 Q4 17 11 15 L24 11 Q32 7 42 9 L54 11 Q62 12 66 17 L70 24 Q74 24 74 28 L74 34 Q74 38 70 38 L8 38 Q4 38 4 34 Z"
          fill="url(#cfGrad)" />
        {/* Roof outline */}
        <path d="M20 15 Q24 6 37 5 Q52 4 56 15"
          fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Window divider */}
        <path d="M37 6 L37 15" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
        {/* Front wheel */}
        <circle cx="17" cy="38" r="8" fill="#0f1117" stroke="url(#cfGrad)" strokeWidth="3.5" />
        <circle cx="17" cy="38" r="3.5" fill="#00C9B1" />
        {/* Rear wheel */}
        <circle cx="60" cy="38" r="8" fill="#0f1117" stroke="url(#cfGrad)" strokeWidth="3.5" />
        <circle cx="60" cy="38" r="3.5" fill="#00C9B1" />
      </g>
      {/* Speed lines */}
      <path d="M8 46 L2 46" stroke="#00C9B1" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M8 52 L0 52" stroke="#00C9B1" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M8 58 L3 58" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

// ── Large hero logo ──────────────────────────────────────────────────────────
function CarFlowHeroLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
      <CarFlowLogoSVG size={120} />
      <div style={{ fontSize: 'clamp(64px,10vw,110px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-2px' }}>
        <span style={{ color: '#fff' }}>Car</span>
        <span style={{ color: '#00C9B1' }}>Flow</span>
      </div>
    </div>
  )
}

// ── Navbar logo ──────────────────────────────────────────────────────────────
export function NavLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <CarFlowLogoSVG size={36} />
      <span style={{ fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>
        Car<span style={{ color: '#00C9B1' }}>Flow</span>
      </span>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  // État pour les voitures dynamiques
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [services, setServices] = useState([])
  const [servicesLoading, setServicesLoading] = useState(true)
  const [servicesError, setServicesError] = useState(null)

  /**
   * Récupération des voitures depuis l'API Laravel au chargement du composant
   */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:8000/api/cars')
        // Limiter à 6 voitures pour la page d'accueil
        setCars(response.data.slice(0, 6))
        setError(null)
      } catch (err) {
        console.error('Erreur lors du chargement des voitures:', err)
        setError('Impossible de charger les véhicules')
        setCars([])
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true)
        const response = await axios.get('http://localhost:8000/api/services')
        const data = Array.isArray(response.data) ? response.data : response.data?.data || []
        setServices(data)
        setServicesError(null)
      } catch (err) {
        console.error('Erreur lors du chargement des services :', err)
        setServicesError('Impossible de charger les services pour le moment.')
        setServices([])
      } finally {
        setServicesLoading(false)
      }
    }

    fetchServices()
  }, [])

  /**
   * Formate un nom d'icône depuis kebab-case vers PascalCase
   * Exemples : 'calendar-x' → 'CalendarX', 'shield' → 'Shield'
   */
  const formatIconName = (iconName) => {
    if (!iconName) return 'HelpCircle'
    
    return String(iconName)
      .toLowerCase()
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }

  /**
   * Recherche et retourne le composant d'icône depuis lucide-react
   * Utilise un fallback HelpCircle si l'icône n'existe pas
   */
  const renderIcon = (iconName) => {
    const formattedName = formatIconName(iconName)
    const IconComponent = Icons[formattedName] || Icons.HelpCircle
    
    return (
      <IconComponent 
        size={32} 
        strokeWidth={1.5}
        style={{ color: '#2dd4bf' }}
      />
    )
  }

  /**
   * Catégorie de voiture basée sur le modèle ou la marque
   */
  const getCategoryBadge = (brand, model) => {
    const modelLower = model.toLowerCase()
    const brandLower = brand.toLowerCase()
    
    if (modelLower.includes('tucson') || modelLower.includes('duster') || brandLower.includes('suv')) {
      return 'SUV'
    }
    if (modelLower.includes('série 3') || brandLower.includes('bmw')) {
      return 'PREMIUM'
    }
    return 'BERLINE'
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif", background: '#0f1117', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0f1117; }
        ::-webkit-scrollbar-thumb { background: #00C9B1; border-radius: 3px; }

        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 64px;
          transition: background 0.4s, box-shadow 0.4s;
        }
        .navbar.scrolled {
          background: rgba(15,17,23,0.97);
          box-shadow: 0 2px 24px rgba(0,0,0,0.5);
          backdrop-filter: blur(16px);
        }
        .navbar.top {
          background: rgba(15,17,23,0.6);
          backdrop-filter: blur(6px);
        }

        .nav-logo { display: flex; align-items: center; gap: 8px; cursor: pointer; }

        .nav-center { display: flex; align-items: center; gap: 28px; }
        .nav-btn {
          background: none; border: none; color: #bbb;
          font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 500;
          letter-spacing: 1.2px; cursor: pointer; padding: 4px 0;
          transition: color 0.2s; position: relative;
        }
        .nav-btn::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 2px; background: #00C9B1; transform: scaleX(0); transition: transform 0.3s;
        }
        .nav-btn:hover, .nav-btn.active { color: #00C9B1; }
        .nav-btn:hover::after, .nav-btn.active::after { transform: scaleX(1); }

        .nav-right { display: flex; align-items: center; gap: 12px; }
        .icon-btn {
          background: none; border: none; color: #bbb; cursor: pointer;
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; font-size: 17px;
          transition: background 0.2s, color 0.2s;
        }
        .icon-btn:hover { background: rgba(0,201,177,0.15); color: #00C9B1; }

        /* Hero */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .hero-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          text-align: center; padding: 100px 24px 60px;
        }

        .hero-tagline {
          font-size: clamp(13px,1.8vw,17px); font-weight: 300;
          color: rgba(255,255,255,0.75); letter-spacing: 3px;
          text-transform: uppercase; margin-bottom: 44px;
        }
        .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }

        .btn-teal {
          background: linear-gradient(135deg,#00C9B1,#009e8e); color: #0f1117;
          border: none; padding: 13px 34px;
          font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
          border-radius: 5px; cursor: pointer; letter-spacing: 0.5px;
          transition: opacity 0.3s, transform 0.2s;
          box-shadow: 0 4px 20px rgba(0,201,177,0.3);
        }
        .btn-teal:hover { opacity: 0.88; transform: translateY(-2px); }

        .btn-ghost {
          background: transparent; color: #fff;
          border: 1.5px solid rgba(255,255,255,0.35); padding: 13px 34px;
          font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 500;
          border-radius: 5px; cursor: pointer; transition: border-color 0.3s, color 0.3s;
        }
        .btn-ghost:hover { border-color: #00C9B1; color: #00C9B1; }

        /* Stats */
        .stats {
          background: rgba(0,201,177,0.07);
          border-top: 1px solid rgba(0,201,177,0.18);
          border-bottom: 1px solid rgba(0,201,177,0.18);
          padding: 36px 48px;
          display: grid; grid-template-columns: repeat(4,1fr); text-align: center;
        }
        .stat-v { font-size: 38px; font-weight: 700; color: #00C9B1; line-height: 1; }
        .stat-l { font-size: 11px; color: #666; margin-top: 7px; letter-spacing: 1.5px; text-transform: uppercase; }

        /* Common */
        .wrap { max-width: 1200px; margin: 0 auto; padding: 96px 48px; }
        .tag { font-size: 11px; font-weight: 600; color: #2dd4bf; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
        .ttl { font-size: clamp(26px,3.5vw,42px); font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 10px; }
        .ttl span { color: #2dd4bf; }
        .bar { width: 44px; height: 3px; background: #2dd4bf; border-radius: 2px; margin: 18px 0 20px; }
        .sub { font-size: 14px; color: #777; font-weight: 300; line-height: 1.75; max-width: 520px; }

        /* Services */
        .svc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-top: 52px; }
        .svc-card {
          background: rgba(15,23,42,0.9); border: 1px solid rgba(148,163,184,0.18);
          border-radius: 16px; padding: 32px 28px;
          transition: border-color 0.3s, transform 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .svc-card:hover { border-color: #2dd4bf; transform: translateY(-4px); background: rgba(45,212,191,0.06); box-shadow: 0 18px 40px rgba(45,212,191,0.16); }
        .svc-icon {
          width: 54px; height: 54px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; background: rgba(45,212,191,0.1);
          color: #2dd4bf;
        }
        .svc-icon-svg { color: #2dd4bf; }
        .svc-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .svc-desc { font-size: 14px; color: #cbd5e1; line-height: 1.8; font-weight: 300; }

        /* Cars */
        .cars-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; margin-top: 52px; }
        .car-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; overflow: hidden; transition: border-color 0.3s, transform 0.3s;
        }
        .car-card:hover { border-color: rgba(0,201,177,0.35); transform: translateY(-6px); }
        .car-img {
          height: 155px; background: rgba(0,201,177,0.05);
          display: flex; align-items: center; justify-content: center;
          font-size: 68px; border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .car-body { padding: 22px; }
        .car-cat { font-size: 10px; font-weight: 600; color: #00C9B1; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; }
        .car-name { font-size: 17px; font-weight: 600; color: #fff; margin-bottom: 14px; }
        .car-specs { display: flex; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
        .spec { font-size: 11px; color: #555; display: flex; align-items: center; gap: 4px; }
        .car-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06);
        }
        .price { font-size: 22px; font-weight: 700; color: #00C9B1; }
        .price span { font-size: 11px; color: #555; font-weight: 400; }
        .btn-res {
          background: none; border: 1.5px solid #00C9B1; color: #00C9B1;
          padding: 7px 16px; border-radius: 4px;
          font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
          cursor: pointer; transition: background 0.3s, color 0.3s; letter-spacing: 0.5px;
        }
        .btn-res:hover { background: #00C9B1; color: #0f1117; }

        /* Loading spinner */
        .spinner {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0,201,177,0.3);
          border-top: 3px solid #00C9B1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* About */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .about-img-box {
          border-radius: 12px; overflow: hidden; height: 360px;
          background: rgba(0,201,177,0.06); border: 1px solid rgba(0,201,177,0.15);
          display: flex; align-items: center; justify-content: center;
        }
        .about-img-box img { width: 100%; height: 100%; object-fit: cover; }
        .points { display: flex; flex-direction: column; gap: 18px; margin-top: 32px; }
        .point { display: flex; gap: 14px; align-items: flex-start; }
        .dot { width: 7px; height: 7px; background: #00C9B1; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
        .pt { font-size: 13.5px; color: #999; line-height: 1.65; font-weight: 300; }

        /* Contact */
        .contact-box {
          background: rgba(0,201,177,0.05); border: 1px solid rgba(0,201,177,0.15);
          border-radius: 14px; padding: 60px; text-align: center;
        }
        .c-form { display: flex; flex-direction: column; gap: 14px; max-width: 460px; margin: 36px auto 0; }
        .f-in {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: #fff; padding: 13px 18px; border-radius: 6px;
          font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 300;
          outline: none; transition: border-color 0.3s;
        }
        .f-in:focus { border-color: #00C9B1; }
        .f-in::placeholder { color: #444; }
        textarea.f-in { resize: vertical; min-height: 110px; }

        footer {
          background: #080a0f; border-top: 1px solid rgba(255,255,255,0.07);
          padding: 44px 48px; text-align: center;
        }
        .f-logo { font-size: 22px; font-weight: 700; margin-bottom: 10px; }
        .f-logo span { color: #00C9B1; }
        .f-copy { font-size: 12px; color: #444; letter-spacing: 0.5px; }

        /* Sparkle (bottom-right corner like the reference image) */
        .sparkle {
          position: absolute; bottom: 36px; right: 36px; z-index: 3;
          opacity: 0.7; animation: sparkle-spin 6s linear infinite;
        }
        @keyframes sparkle-spin {
          0%  { transform: rotate(0deg) scale(1); opacity: 0.7; }
          50% { transform: rotate(180deg) scale(1.15); opacity: 1; }
          100%{ transform: rotate(360deg) scale(1); opacity: 0.7; }
        }

        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .nav-center { display: none; }
          .stats { grid-template-columns: repeat(2,1fr); gap: 24px; padding: 28px 20px; }
          .wrap { padding: 64px 20px; }
          .svc-grid, .cars-grid { grid-template-columns: 1fr; }
          .about-grid { grid-template-columns: 1fr; }
          .contact-box { padding: 32px 20px; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section id="hero" className="hero" style={{
        background: `linear-gradient(to bottom, rgba(15,17,23,0.45), rgba(15,17,23,0.72)),
                     url('/1778946314774_image.png') center/cover no-repeat`
      }}>
        {/* Dark overlay for readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(0,201,177,0.05) 0%, transparent 60%)',
          zIndex: 1
        }} />

        <div className="hero-content">
          <CarFlowHeroLogo />
          <p className="hero-tagline">{t('home_hero_tagline')}</p>
          <div className="hero-btns">
            <button className="btn-teal" onClick={() => navigate('/login')}>{t('home_cta_book_now')}</button>
            <button className="btn-ghost" onClick={() => scrollTo('cars')}>{t('home_cta_view_vehicles')}</button>
          </div>
        </div>

        {/* Sparkle detail (matches reference screenshot) */}
        <div className="sparkle">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 0 L17.5 14.5 L32 16 L17.5 17.5 L16 32 L14.5 17.5 L0 16 L14.5 14.5 Z"
              fill="white" fillOpacity="0.9" />
          </svg>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <div className="stats">
        {STATS.map((s, i) => (
          <div key={i}>
            <div className="stat-v">{s.value}</div>
            <div className="stat-l">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─── SERVICES ─── */}
      <div id="services" style={{ background: '#0f1117' }}>
        <div className="wrap">
          <div className="tag">{t('hero_subtitle')}</div>
          <h2 className="ttl">{t('home_section_services_title')}</h2>
          <div className="bar" />
          <p className="sub">{t('home_section_about_subtitle')}</p>
          <div className="svc-grid">
            {servicesLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', gridColumn: '1 / -1' }}>
                <div className="spinner" style={{ margin: '0 auto' }} />
                <p style={{ marginTop: 16, color: '#94a3b8', fontSize: 14 }}>Chargement des services...</p>
              </div>
            ) : servicesError ? (
              <div style={{ textAlign: 'center', padding: '40px 0', gridColumn: '1 / -1', color: '#fecaca' }}>
                <p>{servicesError}</p>
              </div>
            ) : services.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', gridColumn: '1 / -1', color: '#94a3b8' }}>
                <p>{t('home_service_error')}</p>
              </div>
            ) : (
              services.map((service) => (
                <div key={service.id} className="svc-card">
                  <div className="svc-icon">{renderIcon(service.icon_name)}</div>
                  <div className="svc-title">{service.title}</div>
                  <div className="svc-desc">{service.description}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ─── CARS (DYNAMIQUE) ─── */}
      <div id="cars" style={{ background: '#0a0c12' }}>
        <div className="wrap">
          <div className="tag">{t('home_section_about_title')}</div>
          <h2 className="ttl">{t('cars_title')}</h2>
          <div className="bar" />
          <p className="sub">{t('cars_subtitle')}</p>

          {/* État de chargement */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div className="spinner" style={{ margin: '0 auto' }} />
              <p style={{ marginTop: 20, color: '#999', fontSize: 14 }}>Chargement des véhicules...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#ff6b6b', fontSize: 14 }}>
              <p>{error}</p>
              <button className="btn-teal" style={{ marginTop: 20 }} onClick={() => window.location.reload()}>
                {t('home_cta_view_vehicles')}
              </button>
            </div>
          ) : cars.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#999', fontSize: 14 }}>
              <p>{t('home_car_no_results')}</p>
            </div>
          ) : (
            <div className="cars-grid">
              {cars.map((car) => (
                <div key={car.id} className="car-card">
                  <div className="car-img" style={{ background: 'rgba(0,201,177,0.08)' }}>
                    {/* Image ou emoji par défaut */}
                    {car.image_url ? (
                      <img 
                        src={car.image_url} 
                        alt={`${car.brand} ${car.model}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'block'
                        }}
                      />
                    ) : null}
                    <span style={{ fontSize: 68, display: car.image_url ? 'none' : 'block' }}>🚗</span>
                  </div>
                  <div className="car-body">
                    <div className="car-cat">{getCategoryBadge(car.brand, car.model)}</div>
                    <div className="car-name">{car.brand} {car.model}</div>
                    <div className="car-specs">
                      <span className="spec">
                        <Icons.Users size={14} />
                        {car.seats || 5} places
                      </span>
                      <span className="spec">
                        <Icons.Fuel size={14} />
                        Essence
                      </span>
                      <span className="spec">
                        <Icons.Settings size={14} />
                        Auto
                      </span>
                    </div>
                    <div className="car-footer">
                      <div className="price">{car.price_per_day} DH <span>/ jour</span></div>
                      <button className="btn-res" onClick={() => navigate('/cars')}>{t('home_car_book')}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bouton "Voir tout le catalogue" */}
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <button className="btn-teal" onClick={() => navigate('/cars')}>{t('home_car_view_catalog')}</button>
          </div>
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <div id="about" style={{ background: '#0f1117' }}>
        <div className="wrap">
          <div className="about-grid">
            <div>
              <div className="tag">{t('about_tag')}</div>
              <h2 className="ttl">{t('about_title')}</h2>
              <div className="bar" />
              <p className="sub">{t('about_subtitle')}</p>
              <div className="points">
                {[
                  t('about_point1'),
                  t('about_point2'),
                  t('about_point3'),
                  t('about_point4'),
                ].map((p, i) => (
                  <div key={i} className="point">
                    <div className="dot" />
                    <div className="pt">{p}</div>
                  </div>
                ))}
              </div>
              <button className="btn-teal" style={{ marginTop: 32 }} onClick={() => navigate('/signup')}>
                {t('about_cta_signup')}
              </button>
            </div>
            {/* Use the uploaded car image in the about section */}
            <div className="about-img-box">
              <img
                src="/1778946314774_image.png"
                alt="CarFlow fleet"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<span style="font-size:100px">🚙</span>'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONTACT ─── */}
      <div id="contact" style={{ background: '#0a0c12' }}>
        <div className="wrap">
          <div className="contact-box">
            <div className="tag" style={{ textAlign: 'center' }}>{t('contact_tag')}</div>
            <h2 className="ttl" style={{ textAlign: 'center' }}>{t('contact_title')}</h2>
            <div className="bar" style={{ margin: '14px auto' }} />
            <div className="c-form">
              <input className="f-in" placeholder={t('home_contact_name_placeholder')} />
              <input className="f-in" type="email" placeholder={t('home_contact_email_placeholder')} />
              <textarea className="f-in" placeholder={t('home_contact_message_placeholder')} />
              <button className="btn-teal">{t('home_contact_submit')}</button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10 }}>
          <CarFlowLogoSVG size={28} />
          <div className="f-logo">Car<span>Flow</span></div>
        </div>
        <p className="f-copy">{t('home_footer', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  )
}