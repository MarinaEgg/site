import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NOGProjectSection = () => {
  const { t } = useTranslation();
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  
  // Récupération des données de traduction avec vérification
  const actions = React.useMemo(() => {
    const translatedActions = t('nog.actions', { returnObjects: true });
    return Array.isArray(translatedActions) ? translatedActions : [];
  }, [t]);

  // Rotation automatique des lignes
  React.useEffect(() => {
    if (actions.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentLineIndex((prevIndex) => (prevIndex + 1) % actions.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [actions.length]);

  const handleCasUsageClick = () => {
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAcademyClick = () => {
    window.location.href = '/learn';
  };

  if (actions.length === 0) {
    return (
      <section style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fafafa'
      }}>
        <div>Chargement...</div>
      </section>
    );
  }

  const currentAction = actions[currentLineIndex] || '';

  return (
    <>
      <style>
        {`
          .nog-main-section {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
          }

          .nog-main-section *,
          .nog-main-section *::before,
          .nog-main-section *::after {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
            box-shadow: none !important;
          }

          .dynamic-text {
            color: #fce96b;
            font-weight: 600;
            transition: opacity 0.3s ease;
            position: relative;
            display: inline-block;
            padding-bottom: 4px;
          }

          .dynamic-text::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background: linear-gradient(90deg, #fce96b, #f5d917);
            animation: underlineProgress 2.5s ease-in-out infinite;
            border-radius: 1px;
            box-shadow: 0 0 4px rgba(252, 233, 107, 0.4);
          }

          @keyframes underlineProgress {
            0% { 
              width: 0%; 
              opacity: 0.8;
            }
            20% {
              opacity: 1;
            }
            50% { 
              width: 100%; 
              opacity: 1;
            }
            70% {
              width: 100%;
              opacity: 0.8;
            }
            100% { 
              width: 100%; 
              opacity: 0.6;
            }
          }

          .premium-card {
            background: rgba(255, 255, 255, 0.02) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(252, 233, 107, 0.1) !important;
            transition: all 0.3s ease !important;
          }

          .premium-card:hover {
            border-color: rgba(252, 233, 107, 0.2) !important;
          }

          /* Responsive breakpoints */
          @media (max-width: 768px) {
            .desktop-layout { 
              display: none !important; 
            }
            .mobile-layout { 
              display: flex !important;
              flex-direction: column;
              align-items: center;
              width: 100%;
            }
          }
          
          @media (min-width: 769px) {
            .mobile-layout { 
              display: none !important; 
            }
            .desktop-layout { 
              display: flex !important;
              flex-direction: column;
              align-items: center;
              width: 100%;
            }
          }

          /* FIX: Assurer que le texte reste sur une ligne - CARD ADAPTATIVE */
          .text-content-wrapper {
            display: flex;
            flex-wrap: nowrap;
            align-items: baseline;
            justify-content: center;
            white-space: nowrap;
            overflow-wrap: normal;
            word-break: keep-all;
            width: auto;
            min-width: max-content;
          }

          .intro-text {
            white-space: nowrap;
            margin-right: 0;
          }

          .dynamic-text {
            white-space: nowrap;
          }

          /* Responsive : ajustement pour texte long */
          @media (max-width: 480px) {
            .premium-card {
              width: 98% !important;
              max-width: 98% !important;
              padding: clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem) !important;
              margin: 0 1% !important;
            }
            
            .text-content-wrapper {
              white-space: normal;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            
            .intro-text {
              white-space: normal;
              margin-right: 0;
              margin-bottom: 0.5rem;
            }
            
            .dynamic-text {
              white-space: normal;
              word-break: break-word;
            }
            
            .nog-action-button-mobile {
              min-width: 160px !important;
            }
          }
        `}
      </style>
      
      <section 
        className="nog-main-section"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          padding: 'clamp(2rem, 5vh, 4rem) clamp(1rem, 3vw, 2rem)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{
          textAlign: 'center',
          width: '100%',
          maxWidth: 'none',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <motion.div 
            className="premium-card"
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1.6rem)',
              color: '#fafafa',
              lineHeight: '1.6',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: '400',
              margin: '0 auto',
              textAlign: 'center',
              padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(2rem, 5vw, 3rem)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(1.2rem, 3vw, 2rem)',
              width: 'auto',
              minWidth: 'max-content',
              maxWidth: '98vw',
              minHeight: 'auto',
              overflow: 'visible',
              boxSizing: 'border-box'
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Phrase principale avec texte dynamique animé - RECTANGLE ADAPTATIF */}
            <div style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1.6rem)',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: '400',
              textAlign: 'center',
              lineHeight: '1.7',
              width: 'auto',
              whiteSpace: 'nowrap',
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div className="text-content-wrapper">
                <span className="intro-text">{t('nog.intro')}&nbsp;</span>
                <span className="dynamic-text" key={currentLineIndex}>
                  {currentAction}
                </span>
              </div>
            </div>

            {/* Version Desktop - Boutons côte à côte avec style uniforme */}
            <div className="desktop-layout">
              <div className="button-container-desktop">
                <button
                  className="nog-action-button"
                  onClick={handleCasUsageClick}
                >
                  <div className="button-content">
                    <span className="arrow-left">→</span>
                    <span className="button-text">
                      {t('nog.useCases')}
                      <span className="arrow-right">→</span>
                    </span>
                  </div>
                </button>

                <button
                  className="nog-action-button"
                  onClick={handleAcademyClick}
                >
                  <div className="button-content">
                    <span className="arrow-left">→</span>
                    <span className="button-text">
                      {t('nog.aiAcademy')}
                      <span className="arrow-right">→</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Version Mobile - Boutons empilés avec style uniforme */}
            <div className="mobile-layout">
              <div className="button-container-mobile">
                <button
                  className="nog-action-button-mobile"
                  onClick={handleCasUsageClick}
                >
                  <div className="button-content">
                    <span className="arrow-left">→</span>
                    <span className="button-text">
                      {t('nog.useCases')}
                      <span className="arrow-right">→</span>
                    </span>
                  </div>
                </button>

                <button
                  className="nog-action-button-mobile"
                  onClick={handleAcademyClick}
                >
                  <div className="button-content">
                    <span className="arrow-left">→</span>
                    <span className="button-text">
                      {t('nog.aiAcademy')}
                      <span className="arrow-right">→</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NOGProjectSection;
