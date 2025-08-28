import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const WhyEggOnSection = () => {
  const { t } = useTranslation();

  // Icônes pour les trois points
  const ConnectIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L3 14h9l1 8 10-12h-9l-1-8z"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <path d="M8 8L4 4"/>
      <path d="M20 4L16 8"/>
      <path d="M16 16L20 20"/>
      <path d="M8 16L4 20"/>
    </svg>
  );

  const SolveIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
      <path d="M8 6h8"/>
      <path d="M8 18h8"/>
      <path d="M12 2v20" strokeDasharray="2,2"/>
    </svg>
  );

  const AugmentIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2"/>
      <path d="M8 12h8"/>
      <path d="M12 8v8"/>
      <circle cx="12" cy="8" r="1" fill="currentColor"/>
      <circle cx="12" cy="16" r="1" fill="currentColor"/>
      <circle cx="8" cy="12" r="1" fill="currentColor"/>
      <circle cx="16" cy="12" r="1" fill="currentColor"/>
    </svg>
  );

  const handleCtaClick = () => {
    // Rediriger vers la section collection ou une autre page
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const points = [
    {
      id: 'connects',
      icon: <ConnectIcon />,
      title: t('whyEggon.points.connects.title'),
      description: t('whyEggon.points.connects.description')
    },
    {
      id: 'solves',
      icon: <SolveIcon />,
      title: t('whyEggon.points.solves.title'),
      description: t('whyEggon.points.solves.description')
    },
    {
      id: 'augments',
      icon: <AugmentIcon />,
      title: t('whyEggon.points.augments.title'),
      description: t('whyEggon.points.augments.description')
    }
  ];

  return (
    <>
      <style>
        {`
          /* ===== SECTION WHY EGGON ===== */
          .why-eggon-section {
            position: relative;
            overflow: hidden;
            padding: 8rem 2rem;
            min-height: 100vh;
            width: 100%;
            background: var(--why-eggon-bg-color, transparent);
            transition: background-color 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .why-eggon-content-container {
            background: var(--why-eggon-container-bg, rgba(255, 255, 255, 0.08));
            backdrop-filter: blur(20px);
            border: var(--why-eggon-container-border, 1px solid rgba(255, 255, 255, 0.15));
            border-radius: 3rem;
            box-shadow: var(--why-eggon-container-shadow, 0 20px 60px rgba(0, 0, 0, 0.3));
            width: 95%;
            max-width: 1400px;
            position: relative;
            padding: clamp(3rem, 5vh, 4rem) clamp(2rem, 4vw, 3rem);
            transform: translateY(0);
            opacity: 1;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .why-eggon-content-container:hover {
            transform: translateY(-5px);
            box-shadow: var(--why-eggon-container-shadow-hover, 0 30px 80px rgba(0, 0, 0, 0.4));
          }

          .why-eggon-header {
            text-align: center;
            margin-bottom: clamp(4rem, 8vh, 6rem);
          }

          .why-eggon-section-label {
            font-size: clamp(0.9rem, 1.5vw, 1.2rem);
            font-weight: 600;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
            color: var(--why-eggon-text-color, #fafafa);
            transition: color 0.8s ease;
          }

          .why-eggon-title {
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            color: var(--why-eggon-title-color, #fafafa);
            transition: color 0.8s ease;
          }

          .why-eggon-intro {
            font-size: clamp(1rem, 2vw, 1.3rem);
            font-weight: 400;
            line-height: 1.6;
            margin: 0 auto 2rem auto;
            max-width: 900px;
            text-align: center;
            color: var(--why-eggon-text-color, rgba(250, 250, 250, 0.9));
            transition: color 0.8s ease;
          }

          .why-eggon-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: clamp(2rem, 4vw, 3rem);
            margin-top: 3rem;
            width: 100%;
          }

          .why-eggon-card {
            background: var(--why-eggon-card-bg, rgba(255, 255, 255, 0.08));
            border: var(--why-eggon-card-border, 1px solid rgba(255, 255, 255, 0.15));
            backdrop-filter: blur(20px);
            border-radius: 1.5rem;
            padding: clamp(2rem, 3vw, 2.5rem);
            box-shadow: var(--why-eggon-card-shadow, 0 8px 32px rgba(0, 0, 0, 0.3));
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            text-align: center;
          }

          .why-eggon-card:hover {
            transform: translateY(-8px);
            border-color: var(--why-eggon-card-border-hover, rgba(252, 233, 107, 0.3));
            background: var(--why-eggon-card-bg-hover, rgba(255, 255, 255, 0.12));
            box-shadow: var(--why-eggon-card-shadow-hover, 0 12px 40px rgba(0, 0, 0, 0.4));
          }

          .why-eggon-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 2rem auto;
            border-radius: 50%;
            background: var(--why-eggon-icon-bg, rgba(252, 233, 107, 0.1));
            border: var(--why-eggon-icon-border, 2px solid rgba(252, 233, 107, 0.2));
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .why-eggon-icon svg {
            width: 40px;
            height: 40px;
            color: var(--why-eggon-icon-color, #fce96b);
            transition: color 0.8s ease;
          }

          .why-eggon-card:hover .why-eggon-icon {
            background: var(--why-eggon-icon-bg-hover, rgba(252, 233, 107, 0.2));
            border-color: var(--why-eggon-icon-border-hover, rgba(252, 233, 107, 0.4));
            transform: scale(1.05);
          }

          .why-eggon-card-title {
            font-size: clamp(1.3rem, 2.2vw, 1.6rem);
            font-weight: 700;
            margin-bottom: 1.5rem;
            text-align: center;
            line-height: 1.3;
            color: var(--why-eggon-card-title-color, #fafafa);
            transition: color 0.8s ease;
          }

          .why-eggon-card-description {
            font-size: clamp(1rem, 1.8vw, 1.1rem);
            line-height: 1.6;
            text-align: left;
            color: var(--why-eggon-card-text-color, rgba(250, 250, 250, 0.85));
            transition: color 0.8s ease;
          }

          .why-eggon-cta-container {
            text-align: center;
            margin-top: clamp(3rem, 6vh, 4rem);
          }

          .why-eggon-cta-button {
            padding: 0.8rem 2rem;
            font-size: 0.9rem;
            font-weight: 700;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            letter-spacing: 0.1em;
            text-transform: none;
            background: transparent;
            color: var(--why-eggon-cta-color, #fce96b);
            border: var(--why-eggon-cta-border, 2px solid #fce96b);
            border-radius: 50px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease-out;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 220px;
            height: 50px;
          }

          .why-eggon-cta-button .button-content {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: all 0.4s ease-out;
            transform: translateX(0);
          }

          .why-eggon-cta-button .button-text {
            display: flex;
            align-items: center;
            white-space: nowrap;
          }

          .why-eggon-cta-button .arrow-right {
            margin-left: 8px;
            opacity: 1;
            transition: all 0.4s ease-out;
          }

          .why-eggon-cta-button .arrow-left {
            margin-right: 8px;
            opacity: 0;
            transition: all 0.4s ease-out;
          }

          .why-eggon-cta-button:hover {
            background: var(--why-eggon-cta-bg-hover, #fce96b) !important;
            color: var(--why-eggon-cta-color-hover, #2f2f2e) !important;
            border-color: var(--why-eggon-cta-border-hover, #fce96b) !important;
          }

          .why-eggon-cta-button:hover .button-content {
            transform: translateX(12px);
          }

          .why-eggon-cta-button:hover .arrow-right {
            opacity: 0;
          }

          .why-eggon-cta-button:hover .arrow-left {
            opacity: 1;
          }

          .why-eggon-cta-button:active {
            transform: translateY(-1px);
          }

          /* Variables CSS par défaut pour Why EggOn (thème sombre) */
          .why-eggon-section {
            --why-eggon-bg-color: transparent;
            --why-eggon-container-bg: rgba(255, 255, 255, 0.08);
            --why-eggon-container-border: 1px solid rgba(255, 255, 255, 0.15);
            --why-eggon-container-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            --why-eggon-container-shadow-hover: 0 30px 80px rgba(0, 0, 0, 0.4);
            --why-eggon-text-color: rgba(250, 250, 250, 0.9);
            --why-eggon-title-color: #fafafa;
            --why-eggon-card-bg: rgba(255, 255, 255, 0.08);
            --why-eggon-card-border: 1px solid rgba(255, 255, 255, 0.15);
            --why-eggon-card-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            --why-eggon-card-bg-hover: rgba(255, 255, 255, 0.12);
            --why-eggon-card-border-hover: rgba(252, 233, 107, 0.3);
            --why-eggon-card-shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.4);
            --why-eggon-icon-bg: rgba(252, 233, 107, 0.1);
            --why-eggon-icon-border: 2px solid rgba(252, 233, 107, 0.2);
            --why-eggon-icon-color: #fce96b;
            --why-eggon-icon-bg-hover: rgba(252, 233, 107, 0.2);
            --why-eggon-icon-border-hover: rgba(252, 233, 107, 0.4);
            --why-eggon-card-title-color: #fafafa;
            --why-eggon-card-text-color: rgba(250, 250, 250, 0.85);
            --why-eggon-cta-color: #fce96b;
            --why-eggon-cta-border: 2px solid #fce96b;
            --why-eggon-cta-bg-hover: #fce96b;
            --why-eggon-cta-color-hover: #2f2f2e;
            --why-eggon-cta-border-hover: #fce96b;
          }

          /* Responsive Design pour Why EggOn */
          @media (max-width: 768px) {
            .why-eggon-section {
              padding: clamp(3rem, 6vh, 4rem) clamp(0.5rem, 2vw, 1rem);
            }
            
            .why-eggon-content-container {
              width: 98%;
              padding: clamp(2rem, 4vh, 2.5rem) clamp(1rem, 3vw, 1.5rem);
            }
            
            .why-eggon-cards-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
            
            .why-eggon-card {
              padding: 1.8rem;
            }
            
            .why-eggon-icon {
              width: 70px;
              height: 70px;
              margin-bottom: 1.5rem;
            }
            
            .why-eggon-icon svg {
              width: 35px;
              height: 35px;
            }
            
            .why-eggon-cta-button {
              min-width: 180px;
              height: 45px;
              font-size: 0.85rem;
            }
          }

          @media (max-width: 480px) {
            .why-eggon-section {
              padding: clamp(2rem, 4vh, 3rem) 1rem;
            }
            
            .why-eggon-content-container {
              width: 100%;
              padding: 1.5rem 1rem;
              border-radius: 1.5rem;
            }
            
            .why-eggon-cards-grid {
              gap: 1.5rem;
            }
            
            .why-eggon-card {
              padding: 1.5rem;
            }
            
            .why-eggon-icon {
              width: 60px;
              height: 60px;
            }
            
            .why-eggon-icon svg {
              width: 30px;
              height: 30px;
            }
            
            .why-eggon-cta-button {
              min-width: 160px;
              height: 42px;
              font-size: 0.8rem;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .why-eggon-section *,
            .why-eggon-section *::before,
            .why-eggon-section *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>

      <section className="why-eggon-section" id="why-eggon">
        <div className="why-eggon-content-container">
          {/* Header de la section */}
          <div className="why-eggon-header">
            <h3 className="why-eggon-section-label">
              {t('whyEggon.sectionLabel')}
            </h3>
            <h2 className="why-eggon-title">
              {t('whyEggon.title')}
            </h2>
            <p className="why-eggon-intro">
              {t('whyEggon.subtitle')}
            </p>
          </div>

          {/* Grille des cartes */}
          <div className="why-eggon-cards-grid">
            {points.map((point, index) => (
              <motion.div 
                key={point.id} 
                className="why-eggon-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut" 
                }}
              >
                <div className="why-eggon-icon">
                  {point.icon}
                </div>
                <h3 className="why-eggon-card-title">
                  {point.title}
                </h3>
                <p className="why-eggon-card-description">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bouton CTA */}
          <div className="why-eggon-cta-container">
            <button
              className="why-eggon-cta-button"
              onClick={handleCtaClick}
            >
              <div className="button-content">
                <span className="arrow-left">→</span>
                <span className="button-text">
                  {t('whyEggon.cta')}
                  <span className="arrow-right">→</span>
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyEggOnSection;
