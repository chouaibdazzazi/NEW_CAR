
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#0f1117', color: '#fff', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
      <style>{`
        .wrap { max-width: 1200px; margin: 0 auto; padding: 48px; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .tag { font-size: 11px; font-weight: 600; color: #00C9B1; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
        .ttl { font-size: clamp(26px,3.5vw,42px); font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 10px; }
        .ttl span { color: #00C9B1; }
        .bar { width: 44px; height: 3px; background: #00C9B1; border-radius: 2px; margin: 18px 0 20px; }
        .sub { font-size: 14px; color: #777; font-weight: 300; line-height: 1.75; max-width: 520px; }
        
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
        
        .btn-teal {
          background: linear-gradient(135deg,#00C9B1,#009e8e); color: #0f1117;
          border: none; padding: 13px 34px; font-weight: 700; border-radius: 5px;
          cursor: pointer; transition: opacity 0.3s, transform 0.2s;
          box-shadow: 0 4px 20px rgba(0,201,177,0.3);
        }
        .btn-teal:hover { opacity: 0.88; transform: translateY(-2px); }

        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; }
          .wrap { padding: 20px; }
        }
      `}</style>
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
          <div className="about-img-box">
            <img
              src="/1778946314774_image.png"
              alt="CarFlow fleet"
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span style="font-size:100px">🚙</span>';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
