import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

// Pages Client
import Home from './pages/Home'
import Cars from './pages/Cars'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CarDetails from './pages/CarDetails';

// Pages Admin
import Dashboard from './pages/admin/Dashboard'
import DashboardHome from './pages/admin/DashboardHome'
import CarList from './pages/admin/CarList'
import AddCar from './pages/admin/AddCar'
import EditCar from './pages/admin/EditCar'
import ReservationList from './pages/admin/ReservationList'
import ClientList from './pages/admin/ClientList'

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <AuthProvider>
      {/* Affiche la Navbar client uniquement si on n'est pas sur une page admin */}
      {!isAdminRoute && <Navbar />}
      
      <Routes>
        {/* ── ROUTES PUBLIQUES CLIENT ───────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cars/:id" element={<CarDetails />} />

        {/* Redirections de sécurité vers le login */}
        <Route path="/clients" element={<Navigate to="/login" replace />} />
        <Route path="/client" element={<Navigate to="/login" replace />} />
        <Route path="/available" element={<Navigate to="/login" replace />} />
        <Route path="/rented" element={<Navigate to="/login" replace />} />

        {/* ── ROUTES ADMIN IMBRIQUÉES ET SÉCURISÉES (Sous /admin) ──── */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* URL: /admin -> Accueil du tableau de bord */}
          <Route index element={<DashboardHome />} />
          
          {/* URL: /admin/cars */}
          <Route path="cars" element={<CarList />} />
          
          {/* URL: /admin/cars/add */}
          <Route path="cars/add" element={<AddCar />} />
          
          {/* URL: /admin/cars/edit/:id */}
          <Route path="cars/edit/:id" element={<EditCar />} />
          
          {/* URL: /admin/reservations */}
          <Route path="reservations" element={<ReservationList />} />
          
          {/* URL: /admin/clients */}
          <Route path="clients" element={<ClientList />} />
        </Route>

        {/* ── REDIRECTION PAR DÉFAUT SI L'URL N'EXISTE PAS ─────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}