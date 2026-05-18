import { useNavigate } from 'react-router-dom'

const STATS = [
  { value: '500+', label: 'Véhicules disponibles' },
  { value: '12K+', label: 'Clients satisfaits' },
  { value: '15 ans', label: "D'expérience" },
  { value: '24/7', label: 'Assistance client' },
]

const SERVICES = [
  { icon: '🚗', title: 'Location courte durée', desc: 'De quelques heures à plusieurs jours, trouvez le véhicule parfait pour chaque occasion.' },
  { icon: '📅', title: 'Location longue durée', desc: 'Des offres avantageuses pour les locations de plusieurs semaines ou mois.' },
  { icon: '✈️', title: 'Transfert aéroport', desc: "Service de prise en charge directement à votre arrivée à l'aéroport." },
  { icon: '🛡️', title: 'Assurance incluse', desc: 'Chaque véhicule est couvert par une assurance tous risques complète.' },
]

const CARS = [
  { name: 'Toyota Corolla', category: 'Berline', price: '350', seats: 5, fuel: 'Essence', gear: 'Auto', icon: '🚘' },
  { name: 'Hyundai Tucson', category: 'SUV', price: '480', seats: 5, fuel: 'Diesel', gear: 'Auto', icon: '🚙' },
  { name: 'BMW Série 3', category: 'Premium', price: '720', seats: 5, fuel: 'Essence', gear: 'Auto', icon: '🏎️' },
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
        .tag { font-size: 11px; font-weight: 600; color: #00C9B1; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
        .ttl { font-size: clamp(26px,3.5vw,42px); font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 10px; }
        .ttl span { color: #00C9B1; }
        .bar { width: 44px; height: 3px; background: #00C9B1; border-radius: 2px; margin: 18px 0 20px; }
        .sub { font-size: 14px; color: #777; font-weight: 300; line-height: 1.75; max-width: 520px; }

        /* Services */
        .svc-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; margin-top: 52px; }
        .svc-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 32px 28px;
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
        }
        .svc-card:hover { border-color: rgba(0,201,177,0.35); transform: translateY(-4px); background: rgba(0,201,177,0.04); }
        .svc-icon { font-size: 34px; margin-bottom: 16px; }
        .svc-title { font-size: 17px; font-weight: 600; color: #fff; margin-bottom: 9px; }
        .svc-desc { font-size: 13px; color: #666; line-height: 1.7; font-weight: 300; }

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
        .car-specs { display: flex; gap: 14px; margin-bottom: 18px; }
        .spec { font-size: 11px; color: #555; }
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
          <p className="hero-tagline">Votre partenaire de confiance en location automobile</p>
          <div className="hero-btns">
            <button className="btn-teal" onClick={() => navigate('/login')}>Réserver maintenant</button>
            <button className="btn-ghost" onClick={() => scrollTo('cars')}>Voir nos véhicules</button>
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
          <div className="tag">Ce que nous offrons</div>
          <h2 className="ttl">Nos <span>Services</span></h2>
          <div className="bar" />
          <p className="sub">Des solutions de mobilité adaptées à tous vos besoins, avec un service de qualité premium.</p>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card">
                <div className="svc-icon">{s.icon}</div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CARS ─── */}
      <div id="cars" style={{ background: '#0a0c12' }}>
        <div className="wrap">
          <div className="tag">Notre flotte</div>
          <h2 className="ttl">Véhicules <span>Disponibles</span></h2>
          <div className="bar" />
          <p className="sub">Des voitures récentes, entretenues et inspectées avant chaque location.</p>
          <div className="cars-grid">
            {CARS.map((car, i) => (
              <div key={i} className="car-card">
                <div className="car-img">{car.icon}</div>
                <div className="car-body">
                  <div className="car-cat">{car.category}</div>
                  <div className="car-name">{car.name}</div>
                  <div className="car-specs">
                    <span className="spec">👥 {car.seats} places</span>
                    <span className="spec">⛽ {car.fuel}</span>
                    <span className="spec">⚙️ {car.gear}</span>
                  </div>
                  <div className="car-footer">
                    <div className="price">{car.price} DH <span>/ jour</span></div>
                    <button className="btn-res" onClick={() => navigate('/login')}>Réserver</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <button className="btn-teal" onClick={() => navigate('/login')}>Voir tout le catalogue →</button>
          </div>
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <div id="about" style={{ background: '#0f1117' }}>
        <div className="wrap">
          <div className="about-grid">
            <div>
              <div className="tag">À propos de nous</div>
              <h2 className="ttl">Pourquoi choisir <span>CarFlow</span> ?</h2>
              <div className="bar" />
              <p className="sub">Depuis 15 ans, CarFlow est votre partenaire de confiance pour la location automobile au Maroc et à l&apos;international.</p>
              <div className="points">
                {[
                  'Véhicules récents, propres et vérifiés avant chaque location.',
                  'Réservation 100% en ligne, rapide et sécurisée.',
                  'Assistance disponible 24h/24 et 7j/7.',
                  'Prix transparents, sans frais cachés.',
                ].map((p, i) => (
                  <div key={i} className="point">
                    <div className="dot" />
                    <div className="pt">{p}</div>
                  </div>
                ))}
              </div>
              <button className="btn-teal" style={{ marginTop: 32 }} onClick={() => navigate('/signup')}>
                Créer un compte gratuit
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
            <div className="tag" style={{ textAlign: 'center' }}>Nous contacter</div>
            <h2 className="ttl" style={{ textAlign: 'center' }}>Une question ? <span>Écrivez-nous</span></h2>
            <div className="bar" style={{ margin: '14px auto' }} />
            <div className="c-form">
              <input className="f-in" placeholder="Votre nom complet" />
              <input className="f-in" type="email" placeholder="Votre adresse email" />
              <textarea className="f-in" placeholder="Votre message..." />
              <button className="btn-teal">Envoyer le message</button>
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
        <p className="f-copy">© {new Date().getFullYear()} CarFlow — Tous droits réservés. Votre partenaire de confiance en location automobile.</p>
      </footer>
    </div>
  )
}