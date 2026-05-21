import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion'; // 🌟 Importation de framer-motion

const ServiceIcon = ({ name }) => {
  const formattedName = name
    ? name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    : '';

  const IconComponent = Icons[formattedName];

  if (IconComponent) {
    return <IconComponent className="w-8 h-8 text-teal-400" />;
  }
  return <Icons.HelpCircle className="w-8 h-8 text-teal-400" />;
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/services')
      .then(response => {
        setServices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des services :", error);
        setLoading(false);
      });
  }, []);

  // 🎭 Configuration des variantes d'animation pour les lettres
  const bannerVariants = {
    animate: { transition: { staggerChildren: 0.05 } } // Décale l'apparition de chaque lettre
  };

  const letterVariants = {
    initial: { 
      opacity: 0, 
      y: -80, 
      x: () => (Math.random() - 0.5) * 150, // Éparpille les lettres aléatoirement sur les côtés
      rotate: () => (Math.random() - 0.5) * 90 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      rotate: 0,
      transition: { type: "spring", damping: 12, stiffness: 90 } // Effet rebond élastique premium
    }
  };

  // Découpage des mots en tableaux de lettres pour l'animation
  const word1 = "Nos".split("");
  const word2 = "Services".split("");

  return (
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white min-h-screen pt-24 pb-16 px-8 relative overflow-hidden">
      
      {/* 🔮 Effet de particules lumineuses en arrière-plan */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* En-tête de la page centré */}
        <div className="text-center mb-16 flex flex-col items-center">
          
          {/* Sous-titre animé */}
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-4"
          >
            Ce que nous offrons
          </motion.span>
          
          {/* 💥 TITRE ANIME AVEC EFFET DE LETTRES FLOTTANTES */}
          <motion.h1 
            variants={bannerVariants}
            initial="initial"
            animate="animate"
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 select-none flex items-center justify-center gap-x-4 flex-wrap cursor-default"
          >
            {/* Premier mot : "Nos" (Blanc) */}
            <span className="flex text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
              {word1.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  whileHover={{ scale: 1.3, y: -15, color: '#2dd4bf' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </span>

            {/* Deuxième mot : "Services" (Teal avec Glow) */}
            <span className="flex text-teal-400 drop-shadow-[0_0_30px_rgba(45,212,191,0.35)]">
              {word2.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  whileHover={{ scale: 1.3, y: -15, color: '#ffffff' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Barre décorative centrale animée (effet de dessin) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="w-32 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mb-6"
          />

          {/* Description animée en fondu */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Plus qu'une simple location de voiture, nous vous offrons une expérience de route fluide, sécurisée et totalement flexible.
          </motion.p>
        </div>

        {/* État de chargement */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-teal-400"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            Aucun service disponible pour le moment.
          </div>
        ) : (
          /* La Grille de cartes dynamiques */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }} // Effet cascade sur les cartes
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(45,212,191,0.05)] transition-all duration-300 flex flex-col items-start text-left group"
              >
                {/* Conteneur de l'icône */}
                <div className="p-3 bg-slate-800/50 rounded-xl inline-block mb-6 border border-slate-700/50 group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-300">
                  <ServiceIcon name={service.icon_name} />
                </div>

                {/* Titre du service */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}