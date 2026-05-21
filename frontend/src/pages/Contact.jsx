

import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <div style={{ background: '#0a0c12', color: '#fff', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
      <style>{`
        .wrap { max-width: 1200px; margin: 0 auto; padding: 48px; }
        .tag { font-size: 11px; font-weight: 600; color: #00C9B1; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
        .ttl { font-size: clamp(26px,3.5vw,42px); font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 10px; }
        .ttl span { color: #00C9B1; }
        .bar { width: 44px; height: 3px; background: #00C9B1; border-radius: 2px; margin: 18px 0 20px; }
        
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
        
        .btn-teal {
          background: linear-gradient(135deg,#00C9B1,#009e8e); color: #0f1117;
          border: none; padding: 13px 34px; font-weight: 700; border-radius: 5px;
          cursor: pointer; transition: opacity 0.3s, transform 0.2s;
          box-shadow: 0 4px 20px rgba(0,201,177,0.3);
        }
        .btn-teal:hover { opacity: 0.88; transform: translateY(-2px); }

        @media (max-width: 768px) {
          .contact-box { padding: 32px 20px; }
          .wrap { padding: 20px; }
        }
      `}</style>
      <div className="wrap">
        <div className="contact-box">
          <div className="tag" style={{ textAlign: 'center' }}>{t('contact_tag')}</div>
          <h2 className="ttl" style={{ textAlign: 'center' }}>{t('contact_title')}</h2>
          <div className="bar" style={{ margin: '14px auto' }} />
          <div className="c-form">
            <input className="f-in" placeholder={t('contact_name_placeholder')} />
            <input className="f-in" type="email" placeholder={t('contact_email_placeholder')} />
            <textarea className="f-in" placeholder={t('contact_message_placeholder')} />
            <button className="btn-teal">{t('contact_submit')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
