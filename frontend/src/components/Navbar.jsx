import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function CarFlowLogoSVG({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C9B1" />
          <stop offset="100%" stopColor="#007a6e" />
        </linearGradient>
      </defs>
      <path d="M80 18 A40 40 0 1 0 80 82" stroke="url(#cfGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <g transform="translate(22, 32) scale(0.85)">
        <path d="M4 24 Q4 17 11 15 L24 11 Q32 7 42 9 L54 11 Q62 12 66 17 L70 24 Q74 24 74 28 L74 34 Q74 38 70 38 L8 38 Q4 38 4 34 Z" fill="url(#cfGrad)" />
        <path d="M20 15 Q24 6 37 5 Q52 4 56 15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M37 6 L37 15" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="38" r="8" fill="#0f1117" stroke="url(#cfGrad)" strokeWidth="3.5" />
        <circle cx="17" cy="38" r="3.5" fill="#00C9B1" />
        <circle cx="60" cy="38" r="8" fill="#0f1117" stroke="url(#cfGrad)" strokeWidth="3.5" />
        <circle cx="60" cy="38" r="3.5" fill="#00C9B1" />
      </g>
      <path d="M8 46 L2 46" stroke="#00C9B1" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M8 52 L0 52" stroke="#00C9B1" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M8 58 L3 58" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'CARS', path: '/cars' },
    { name: 'SERVICES', path: '/services' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 64px;
          transition: background 0.4s, box-shadow 0.4s;
          font-family: 'Poppins', sans-serif;
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
        .nav-logo { display: flex; align-items: center; gap: 8px; cursor: pointer; text-decoration: none; }
        .nav-center { display: flex; align-items: center; gap: 28px; }
        .nav-btn {
          background: none; border: none; color: #bbb;
          font-size: 12.5px; font-weight: 500;
          letter-spacing: 1.2px; padding: 4px 0;
          transition: color 0.2s; position: relative;
          text-decoration: none; cursor: pointer;
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
        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .nav-center { display: none; }
        }
      `}</style>
      <nav className={`navbar ${scrolled ? 'scrolled' : 'top'}`}>
        <NavLink to="/" className="nav-logo">
          <CarFlowLogoSVG size={36} />
          <span style={{ fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>
            Car<span style={{ color: '#00C9B1' }}>Flow</span>
          </span>
        </NavLink>

        <div className="nav-center">
          {navLinks.map(lnk => (
            <NavLink 
              key={lnk.name} 
              to={lnk.path} 
              className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            >
              {lnk.name}
            </NavLink>
          ))}
          <button className="nav-btn" onClick={() => navigate('/login')}>LOGIN/SIGNUP</button>
        </div>

        <div className="nav-right">
          <button className="icon-btn" title="Rechercher">🔍</button>
          <button className="icon-btn" onClick={() => navigate('/login')} title="Profil">👤</button>
        </div>
      </nav>
    </>
  );
}
