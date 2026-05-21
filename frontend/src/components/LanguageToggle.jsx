import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('fr') ? 'en' : 'fr'
    i18n.changeLanguage(nextLang)
  }

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.04 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-teal-400 font-bold text-xs uppercase tracking-wider hover:text-teal-500 transition-colors shadow-sm"
      type="button"
      aria-label="Changer la langue"
      title="Changer la langue"
    >
      <Globe className="w-4 h-4 text-teal-500" />
      <span>{i18n.language.startsWith('fr') ? 'EN' : 'FR'}</span>
    </motion.button>
  )
}
