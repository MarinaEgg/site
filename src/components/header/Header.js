import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import { NavigationSpeedDial } from '../speedDial/NavigationSpeedDial';
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    // Fonction conservée pour compatibilité avec les liens desktop
  };

  const navigationLinks = [
    { href: '/', label: t('navigation.home') },
    { href: '/nog-lab', label: t('navigation.lab') },
    { href: '/learn', label: t('navigation.learn') },
    { href: '/contact', label: t('navigation.contact') }
  ];

  // Variants supprimés car plus besoin du menu hamburger

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

        {/* SpeedDial de navigation mobile - remplace le menu hamburger */}
        <NavigationSpeedDial />
      </nav>
    </header>
  );
};

export default Header;
