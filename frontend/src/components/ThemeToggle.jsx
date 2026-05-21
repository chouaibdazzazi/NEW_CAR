import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

const THEME_STORAGE_KEY = 'carflow-theme'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme) => {
  const root = document.documentElement

  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (event) => {
      if (window.localStorage.getItem(THEME_STORAGE_KEY) === null) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }

    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange)
      return () => mediaQuery.removeListener(handleSystemThemeChange)
    }

    return undefined
  }, [])

  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      aria-label={`Basculer en mode ${nextTheme}`}
      title={`Mode ${nextTheme}`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="icon-btn"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -24, scale: 0.82 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 24, scale: 0.82 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Sun size={18} className="text-amber-300" />
          ) : (
            <Moon size={18} className="text-slate-800" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
