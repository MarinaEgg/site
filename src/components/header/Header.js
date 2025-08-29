import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import './Header.css';

// Composant CircularTexte avec Framer Motion
const CircularText = ({ text, spinDuration = 20, onHover, className = '', onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAnimationConfig = () => {
    const baseConfig = {
      rotate: 360,
      transition: {
        duration: spinDuration,
        ease: "linear",
        repeat: Infinity,
      }
    };

    if (!isHovered) return baseConfig;

    switch (onHover) {
      case 'slowDown':
        return {
          ...baseConfig,
          transition: {
            ...baseConfig.transition,
            duration: spinDuration * 3,
          }
        };
      case 'speedUp':
        return {
          ...baseConfig,
          transition: {
            ...baseConfig.transition,
            duration: spinDuration / 3,
          }
        };
      case 'pause':
        return {
          rotate: 0,
          transition: { duration: 0.5 }
        };
      case 'goBonkers':
        return {
          rotate: [0, 360, -180, 720, 0],
          scale: [1, 1.2, 0.8, 1.1, 1],
          transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }
        };
      default:
        return baseConfig;
    }
  };

  const chars = text.split('');
  const angleStep = 360 / chars.length;

  return (
    <motion.div
      className={`header-circular-text ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      animate={getAnimationConfig()}
    >
      {chars.map((char, index) => {
        const angle = index * angleStep;
        return (
          <span
            key={index}
            className="header-char-span"
            style={{
              transform: `rotate(${angle}deg)`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </motion.div>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = [
    { href: '/', label: t('navigation.home') },
    { href: '/nog-lab', label: t('navigation.lab') },
    { href: '/learn', label: t('navigation.learn') },
    { href: '/contact', label: t('navigation.contact') }
  ];

  // Variants pour les animations Framer Motion
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const hamburgerVariants = {
    closed: {
      rotate: 0,
      y: 0
    },
    open: {
      rotate: 45,
      y: 6
    }
  };

  const hamburgerMiddleVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };

  const hamburgerBottomVariants = {
    closed: {
      rotate: 0,
      y: 0
    },
    open: {
      rotate: -45,
      y: -6
    }
  };

  return (
    <header className={`eggon-header ${isScrolled ? 'eggon-header-scrolled' : ''}`}>
      <nav className="eggon-nav">
        {/* Logo desktop */}
        <motion.a 
          href="/" 
          className="eggon-logo"
          whileHover={{ scale: 1.05, color: '#fafafa' }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src="/jo.svg" 
            alt="EggOn Technology Logo" 
            className="header-logo-icon"
          />
          <span className="header-brand-name">EggOn Technology</span>
        </motion.a>
        
        {/* Logo circulaire mobile */}
        <div className="eggon-circular-logo">
          <CircularText
            text="EGGON * TECHNOLOGY * "
            spinDuration={15}
            onHover="speedUp"
            onClick={() => window.location.href = '/'}
          />
        </div>
        
        {/* Navigation desktop avec sélecteur de langue */}
        <div className="eggon-nav-links">
          {navigationLinks.map((link, index) => (
            <motion.a 
              key={index}
              href={link.href} 
              className="eggon-nav-link" 
              onClick={handleLinkClick}
              whileHover={{ 
                scale: 1.05, 
                color: '#fafafa',
                y: -2
              }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
            </motion.a>
          ))}
          {/* Sélecteur de langue pour desktop */}
          <LanguageSelector variant="header" />
        </div>

        {/* Bouton hamburger mobile */}
        <motion.div 
          className="eggon-mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="eggon-hamburger-line"
            variants={hamburgerVariants}
            animate={isMobileMenuOpen ? "open" : "closed"}
          />
          <motion.div 
            className="eggon-hamburger-line"
            variants={hamburgerMiddleVariants}
            animate={isMobileMenuOpen ? "open" : "closed"}
          />
          <motion.div 
            className="eggon-hamburger-line"
            variants={hamburgerBottomVariants}
            animate={isMobileMenuOpen ? "open" : "closed"}
          />
        </motion.div>

        {/* Navigation mobile - CORRECTION ICI */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="eggon-mobile-nav"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                right: '0',
                width: '100%',
                // CORRECTION : Utiliser backgroundColor au lieu de background
                backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.75)',
                backdropFilter: isScrolled ? 'blur(25px)' : 'blur(20px)',
                WebkitBackdropFilter: isScrolled ? 'blur(25px)' : 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                boxSizing: 'border-box',
                zIndex: 1001,
                padding: '0',
                filter: 'saturate(1.2)',
                display: 'block'
              }}
            >
              {/* Conteneur interne - CORRECTION ICI AUSSI */}
              <div style={{
                // CORRECTION : Utiliser backgroundColor au lieu de background
                backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                backdropFilter: isScrolled ? 'blur(30px)' : 'blur(25px)',
                WebkitBackdropFilter: isScrolled ? 'blur(30px)' : 'blur(25px)',
                padding: '1.5rem 2rem',
                width: '100%',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)'
              }}>
                {navigationLinks.map((link, index) => (
                  <motion.div key={index} variants={linkVariants}>
                    <div style={{
                      position: 'relative',
                      textAlign: 'center',
                      margin: '1rem 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {/* Trait gauche */}
                      <div style={{
                        flex: 1,
                        height: '1px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        marginRight: '1rem',
                        alignSelf: 'center'
                      }} />
                      
                      <motion.a 
                        href={link.href} 
                        className="eggon-mobile-nav-link"
                        onClick={handleLinkClick}
                        style={{
                          display: 'block',
                          padding: '0.5rem 1rem',
                          color: 'rgba(250, 250, 250, 0.9)',
                          textDecoration: 'none',
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '1rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          borderRadius: '8px',
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}
                        whileHover={{ 
                          color: '#fafafa',
                          // CORRECTION : Utiliser backgroundColor au lieu de background
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        {link.label}
                      </motion.a>
                      
                      {/* Trait droit */}
                      <div style={{
                        flex: 1,
                        height: '1px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        marginLeft: '1rem',
                        alignSelf: 'center'
                      }} />
                    </div>
                  </motion.div>
                ))}
                
                {/* Sélecteur de langue en bas du menu mobile */}
                <motion.div 
                  variants={linkVariants}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <LanguageSelector variant="header" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
