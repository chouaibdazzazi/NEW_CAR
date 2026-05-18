import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'


export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (path) => {
    const current = location.pathname
    if (path === '/admin/cars') {
      return current.startsWith('/admin/cars') && !current.startsWith('/admin/cars/add')
    }
    return current === path
  }

  const navClass = (path) =>
    `cr-top-nav-item${isActive(path) ? ' active' : ''}`

  const sidebarNavClass = (path) =>
    `cr-nav-item${isActive(path) ? ' active' : ''}`

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

          .cr-root {
            display: flex;
            min-height: 100vh;
            font-family: 'DM Sans', sans-serif;
            background: #0d0f14;
            color: #e4e6ef;
          }

          .cr-sidebar {
            width: 280px;
            min-width: 280px;
            background: #111318;
            border-right: 1px solid #1e2130;
            display: flex;
            flex-direction: column;
            padding: 0;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 50;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .cr-sidebar.open {
            transform: translateX(0);
          }

          .cr-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 0;
            min-height: 100vh;
          }

          .cr-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 40;
            display: none;
          }

          .cr-overlay.show {
            display: block;
          }

          .cr-mobile-header {
            display: none;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            background: #111318;
            border-bottom: 1px solid #1e2130;
          }

          .cr-mobile-nav {
            display: none;
            width: 100%;
            overflow-x: auto;
            padding: 0.75rem 1rem 1rem;
            background: #111318;
            border-bottom: 1px solid #1e2130;
          }

          .cr-mobile-nav::-webkit-scrollbar {
            height: 6px;
          }

          .cr-mobile-nav::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.12);
            border-radius: 999px;
          }

          .cr-mobile-nav-item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            padding: 0.65rem 1rem;
            margin-right: 0.65rem;
            border-radius: 999px;
            border: 1px solid transparent;
            color: #c8cee8;
            background: #161822;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
          }

          .cr-mobile-nav-item:hover {
            background: #1f2435;
            border-color: #2d3350;
          }

          .cr-mobile-nav-item.active {
            border-color: rgba(59,130,246,0.4);
            background: rgba(59,130,246,0.14);
            color: #60a5fa;
          }

          .cr-top-nav {
            display: none;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
            padding: 1rem 1.5rem;
            background: #111318;
            border-bottom: 1px solid #1e2130;
          }

          .cr-top-nav-items {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            align-items: center;
          }

          .cr-top-nav-item {
            padding: 0.75rem 1rem;
            border-radius: 999px;
            background: #161822;
            color: #c8cee8;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
            font-size: 0.85rem;
          }

          .cr-top-nav-item:hover {
            background: #1f2435;
            border-color: #2d3350;
          }

          .cr-top-nav-item.active {
            background: rgba(59,130,246,0.14);
            border-color: rgba(59,130,246,0.4);
            color: #60a5fa;
          }

          .cr-menu-btn {
            background: none;
            border: none;
            color: #7a8099;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.375rem;
            transition: background 0.2s;
          }

          .cr-menu-btn:hover {
            background: #1a1d28;
            color: #c8cee8;
          }

          .cr-logo-zone {
            padding: 1.75rem 1.5rem 1.25rem;
            border-bottom: 1px solid #1e2130;
          }

          .cr-logo-icon {
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
          }

          .cr-logo-text {
            font-family: 'Syne', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.015em;
          }

          .cr-logo-link {
            background: none;
            border: none;
            padding: 0;
            color: inherit;
            cursor: pointer;
            font: inherit;
            text-align: left;
          }

          .cr-logo-text span {
            color: #3b82f6;
          }

          .cr-admin-badge {
            display: inline-block;
            margin-top: 0.375rem;
            font-size: 0.625rem;
            font-weight: 500;
            color: #3b82f6;
            background: rgba(59,130,246,0.12);
            border: 1px solid rgba(59,130,246,0.25);
            border-radius: 1.25rem;
            padding: 0.125rem 0.625rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .cr-nav {
            flex: 1;
            padding: 1.25rem 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .cr-nav-label {
            font-size: 0.625rem;
            font-weight: 500;
            color: #4a5268;
            letter-spacing: 0.125em;
            text-transform: uppercase;
            padding: 0 0.75rem;
            margin: 0.5rem 0 0.375rem;
          }

          .cr-nav-item {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            padding: 0.625rem 0.875rem;
            border-radius: 0.625rem;
            font-size: 0.85rem;
            font-weight: 400;
            color: #7a8099;
            cursor: pointer;
            transition: all 0.15s;
            text-decoration: none;
            border: none;
            background: none;
            width: 100%;
            text-align: left;
          }

          .cr-nav-item i { font-size: 1.0625rem; }

          .cr-nav-item:hover {
            background: #1a1d28;
            color: #c8cee8;
          }

          .cr-nav-item.active {
            background: linear-gradient(135deg, #1d2a4a 0%, #1a2540 100%);
            color: #60a5fa;
            border: 1px solid rgba(59,130,246,0.2);
          }

          .cr-nav-item.active i { color: #3b82f6; }

          .cr-sidebar-footer {
            padding: 1rem 0.75rem;
            border-top: 1px solid #1e2130;
          }

          .cr-user-row {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            padding: 0.5rem 0.625rem;
            border-radius: 0.625rem;
            cursor: pointer;
            transition: background 0.2s;
          }

          .cr-user-row:hover { background: #1a1d28; }

          .cr-avatar {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 600;
            color: white;
            flex-shrink: 0;
          }

          .cr-user-name { font-size: 0.8125rem; font-weight: 500; color: #c8cee8; }
          .cr-user-role { font-size: 0.6875rem; color: #4a5268; }

          /* Media Queries */
          @media (min-width: 768px) {
            .cr-sidebar {
              display: none;
            }

            .cr-main {
              margin-left: 0;
            }

            .cr-mobile-header,
            .cr-mobile-nav {
              display: none;
            }

            .cr-top-nav {
              display: flex;
            }

            .cr-overlay {
              display: none !important;
            }
          }

          @media (max-width: 767px) {
            .cr-mobile-header {
              display: flex;
            }

            .cr-mobile-nav {
              display: flex;
            }

            .cr-top-nav {
              display: none;
            }

            .cr-sidebar {
              width: 280px;
            }
          }
        `}
      </style>

      {/* Mobile Overlay */}
      <div className={`cr-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)}></div>

      {/* Mobile Header */}
      <div className="cr-mobile-header">
        <button className="cr-menu-btn" onClick={() => setSidebarOpen(true)}>
          <i className="ti ti-menu-2"></i>
        </button>
        <div className="cr-logo-text">Car<span>Rental</span></div>
        <div></div>
      </div>

      {/* Desktop top navbar */}
      <div className="cr-top-nav">
        <button className="cr-logo-text cr-logo-link" onClick={() => navigate('/admin')}>Car<span>Rental</span></button>
        <div className="cr-top-nav-items">
          <button className={navClass('/admin')} onClick={() => navigate('/admin')}>
            Tableau de bord
          </button>
          <button className={navClass('/admin/cars')} onClick={() => navigate('/admin/cars')}>
            Voitures
          </button>
          <button className={navClass('/admin/cars/add')} onClick={() => navigate('/admin/cars/add')}>
            Ajouter voiture
          </button>
          <button className={navClass('/admin/reservations')} onClick={() => navigate('/admin/reservations')}>
            Réservations
          </button>
          <button className={navClass('/clients')}onClick={() => navigate('/admin/clients')}>
            Clients
          </button>
          <button className={navClass('/admin/stats')} onClick={() => navigate('/admin/stats')}>
            Statistiques
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`cr-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="cr-logo-zone">
          <div className="cr-logo-icon">🚗</div>
          <button className="cr-logo-text cr-logo-link" onClick={() => navigate('/admin')}>Car<span>Rental</span></button>
          <div className="cr-admin-badge">Admin</div>
        </div>

        <nav className="cr-nav">
          <div className="cr-nav-label">Menu</div>
          <button className={sidebarNavClass('/admin')} onClick={() => { navigate('/admin'); setSidebarOpen(false); }}>
            <i className="ti ti-layout-dashboard"></i> Tableau de bord
          </button>
          <button className={sidebarNavClass('/admin/cars')} onClick={() => { navigate('/admin/cars'); setSidebarOpen(false); }}>
            <i className="ti ti-car"></i> Voitures
          </button>
          <button className={sidebarNavClass('/admin/cars/add')} onClick={() => { navigate('/admin/cars/add'); setSidebarOpen(false); }}>
            <i className="ti ti-plus"></i> Ajouter voiture
          </button>
          <div className="cr-nav-label">Gestion</div>
          <button className={sidebarNavClass('/admin/reservations')} onClick={() => { navigate('/admin/reservations'); setSidebarOpen(false); }}>
            <i className="ti ti-calendar"></i> Réservations
          </button>
          <button className={sidebarNavClass('/clients')} onClick={() => { navigate('/clients'); setSidebarOpen(false); }}>
            <i className="ti ti-users"></i> Clients
          </button>
          <button className={sidebarNavClass('/admin/stats')} onClick={() => { navigate('/admin/stats'); setSidebarOpen(false); }}>
            <i className="ti ti-chart-bar"></i> Statistiques
          </button>
        </nav>

        <div className="cr-sidebar-footer">
          <div className="cr-user-row" onClick={handleLogout}>
            <div className="cr-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            <div>
              <div className="cr-user-name">{user?.name}</div>
              <div className="cr-user-role">Administrateur</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="cr-main">
        <Outlet />
      </main>
    </>
  )
}