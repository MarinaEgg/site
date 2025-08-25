import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = ({ variant = 'header' }) => {
  const { i18n, ready } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const languages = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'es', label: 'ES', name: 'Español' }
  ];

  // Utiliser directement i18n.language avec fallback
  const getCurrentLanguage = () => {
    return i18n.language || i18n.resolvedLanguage || 'en';
  };

  // Forcer la mise à jour du composant quand la langue change
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setForceUpdate(prev => prev + 1);
    };

    const handleInitialized = () => {
      setForceUpdate(prev => prev + 1);
    };

    // S'abonner aux événements
    i18n.on('languageChanged', handleLanguageChange);
    i18n.on('initialized', handleInitialized);

    // Vérification agressive toutes les 50ms pendant 3 secondes
    let attempts = 0;
    const maxAttempts = 60; // 3 secondes / 50ms

    const checkLanguage = () => {
      attempts++;
      const currentLang = getCurrentLanguage();
      
      if (currentLang && currentLang !== 'en') {
        setForceUpdate(prev => prev + 1);
        return; // Arrêter la vérification si on a trouvé une langue différente
      }
      
      if (attempts < maxAttempts) {
        setTimeout(checkLanguage, 50);
      }
    };

    // Démarrer la vérification après un petit délai
    setTimeout(checkLanguage, 100);

    // Nettoyer les écouteurs au démontage
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      i18n.off('initialized', handleInitialized);
    };
  }, [i18n]);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const currentLang = getCurrentLanguage();
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  // Debug temporaire - à supprimer plus tard
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('LanguageSelector Debug:', {
        'i18n.language': i18n.language,
        'i18n.resolvedLanguage': i18n.resolvedLanguage,
        'currentLang': currentLang,
        'ready': ready,
        'isInitialized': i18n.isInitialized,
        'currentLanguage.label': currentLanguage.label,
        'forceUpdate': forceUpdate
      });
    }
  }, [currentLang, i18n.language, ready, forceUpdate]);

  const handleLanguageChange = (languageCode) => {
    // Changer la langue via i18n (cela déclenchera automatiquement l'événement 'languageChanged')
    i18n.changeLanguage(languageCode);
    
    // Fermer le dropdown
    setIsOpen(false);
    
    // Forcer la mise à jour du composant
    setForceUpdate(prev => prev + 1);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Styles pour le header
  const headerStyles = {
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1002,
    },
    trigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'rgba(250, 250, 250, 0.9)',
      fontSize: '0.875rem',
      fontWeight: '500',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      minWidth: '60px',
      justifyContent: 'center',
    },
    triggerHover: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#fafafa',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: '0',
      marginTop: '0.5rem',
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      overflow: 'hidden',
      minWidth: '120px',
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'rgba(250, 250, 250, 0.8)',
      fontSize: '0.875rem',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    optionHover: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#fafafa',
    }
  };

  // Styles pour le footer
  const footerStyles = {
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    trigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'rgba(250, 250, 250, 0.7)',
      fontSize: '0.8rem',
      fontWeight: '500',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      minWidth: '55px',
      justifyContent: 'center',
    },
    triggerHover: {
      background: 'rgba(255, 255, 255, 0.15)',
      color: 'rgba(250, 250, 250, 0.9)',
      transform: 'translateY(-1px)',
    },
    dropdown: {
      position: 'absolute',
      bottom: '100%',
      right: '0',
      marginBottom: '0.5rem',
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '8px',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
      minWidth: '110px',
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.6rem 0.8rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'rgba(250, 250, 250, 0.7)',
      fontSize: '0.8rem',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    optionHover: {
      background: 'rgba(255, 255, 255, 0.08)',
      color: 'rgba(250, 250, 250, 0.9)',
      transform: 'translateX(2px)',
    }
  };

  const styles = variant === 'header' ? headerStyles : footerStyles;

  const chevronVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: variant === 'footer' ? 10 : -10,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
        staggerChildren: 0.05
      }
    }
  };

  const optionVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.trigger}
        onClick={toggleDropdown}
        whileHover={styles.triggerHover}
        whileTap={{ scale: 0.95 }}
      >
        <span>{currentLanguage.label}</span>
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          variants={chevronVariants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ marginLeft: '0.25rem' }}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay pour fermer le dropdown en cliquant à côté */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1001,
                background: 'transparent',
              }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              style={styles.dropdown}
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {languages.map((language, index) => (
                <motion.div
                  key={language.code}
                  style={{
                    ...styles.option,
                    ...(index === languages.length - 1 ? { borderBottom: 'none' } : {})
                  }}
                  variants={optionVariants}
                  onClick={() => handleLanguageChange(language.code)}
                  whileHover={styles.optionHover}
                  whileTap={{ scale: 0.98 }}
                >
                  <span style={{ fontWeight: language.code === currentLanguage.code ? '600' : '400' }}>
                    {language.label}
                  </span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    {language.name}
                  </span>
                  {language.code === currentLanguage.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: 'absolute',
                        left: '0.5rem',
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        background: '#fce96b',
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
