import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import axios from 'axios'

export default function AuthSection() {
  const navigate = useNavigate()

  // Login State
  const [login, setLogin] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Signup State
  const [signup, setSignup] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [signupError, setSignupError] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)

  const handleLoginChange = (e) => {
    setLogin(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setLoginError('')
  }

  const handleSignupChange = (e) => {
    setSignup(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setSignupError('')
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    if (!login.email || !login.password) {
      setLoginError('Veuillez remplir tous les champs')
      return
    }

    setLoginLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: login.email,
        password: login.password
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      navigate('/')
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Identifiants incorrects')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    if (!signup.fullName || !signup.email || !signup.password || !signup.confirmPassword) {
      setSignupError('Veuillez remplir tous les champs')
      return
    }
    if (signup.password !== signup.confirmPassword) {
      setSignupError('Les mots de passe ne correspondent pas')
      return
    }
    if (signup.password.length < 8) {
      setSignupError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }

    setSignupLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name: signup.fullName,
        email: signup.email,
        password: signup.password
      })

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token)
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }

      alert('Compte créé avec succès !')
      navigate('/')
    } catch (err) {
      setSignupError(err.response?.data?.message || "Impossible de créer le compte")
    } finally {
      setSignupLoading(false)
    }
  }

  const inputClasses = "w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all placeholder-slate-400 dark:placeholder-slate-500"
  const labelClasses = "block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300"
  const iconClasses = "absolute left-3 top-[38px] text-slate-400 dark:text-slate-500 w-5 h-5"

  return (
    <section id="auth" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Espace Client
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Connectez-vous pour gérer vos réservations ou créez un compte pour profiter de nos offres exclusives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* ----- CONNEXION ----- */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-700 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-5 blur-3xl" />
            
            <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Se Connecter</h3>
            
            {loginError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-6 relative z-10">
              <div className="relative">
                <label className={labelClasses}>Email</label>
                <div className="relative">
                  <Mail className={iconClasses} style={{ top: '12px' }} />
                  <input
                    type="email"
                    name="email"
                    value={login.email}
                    onChange={handleLoginChange}
                    placeholder="votre@email.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="relative">
                <label className={labelClasses}>Mot de passe</label>
                <div className="relative">
                  <Lock className={iconClasses} style={{ top: '12px' }} />
                  <input
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Mot de passe oublié ?</a>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Connexion
              </button>
            </form>
          </div>

          {/* ----- INSCRIPTION ----- */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            
            <h3 className="text-2xl font-bold mb-8 relative z-10">Créer un compte</h3>
            
            {signupError && (
              <div className="mb-6 p-4 bg-white/10 border border-white/20 rounded-xl font-medium relative z-10">
                {signupError}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-6 relative z-10">
              <div className="relative">
                <label className="block text-sm font-semibold mb-2 text-white/90">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-[12px] text-white/50 w-5 h-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={signup.fullName}
                    onChange={handleSignupChange}
                    placeholder="Jean Dupont"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder-white/50"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold mb-2 text-white/90">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-[12px] text-white/50 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={signup.email}
                    onChange={handleSignupChange}
                    placeholder="votre@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder-white/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-semibold mb-2 text-white/90">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-[12px] text-white/50 w-5 h-5" />
                    <input
                      type="password"
                      name="password"
                      value={signup.password}
                      onChange={handleSignupChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder-white/50"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold mb-2 text-white/90">Confirmer</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-[12px] text-white/50 w-5 h-5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={signup.confirmPassword}
                      onChange={handleSignupChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder-white/50"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 bg-white text-blue-600 font-bold rounded-xl hover:shadow-lg hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                S'inscrire gratuitement
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
