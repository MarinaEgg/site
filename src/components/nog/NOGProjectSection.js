import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NOGProjectSection = () => {
  const { t } = useTranslation();
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  
  const lines = [
    t('nog.lineBuildAgents'),
    t('nog.linePromptEngineering'), 
    t('nog.lineAdviseSecurity'),
    t('nog.lineConnectData'),
    t('nog.lineDeliverTraining')
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prevIndex) => (prevIndex + 1) % lines.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [lines.length]);

  // Fonction pour diviser le texte en caractères
  const splitIntoCharacters = (text) => {
    return Array.from(text);
  };

  // Fonction pour calculer le délai de stagger
  const getStaggerDelay = (index) => {
    return index * 0.05; // 50ms entre chaque caractère
  };

  // Fonctions de hover pour les boutons SANS créer de rectangles
  const handleButtonMouseEnter = (e) => {
    const button = e.currentTarget;
    button.style.setProperty('transform', 'translateY(-2px)', 'important');
    button.style.setProperty('border-color', '#fce96b', 'important');
    button.style.setProperty('color', '#fce96b', 'important');
    button.style.setProperty('background', 'rgba(252, 233, 107, 0.1)', 'important');
    button.style.setProperty('background-color', 'rgba(252, 233, 107, 0.1)', 'important');
    button.style.setProperty('background-image', 'none', 'important');
  };

  const handleButtonMouseLeave = (e) => {
    const button = e.currentTarget;
    button.style.setProperty('transform', 'translateY(0)', 'important');
    button.style.setProperty('border-color', 'rgba(255, 255, 255, 0.3)', 'important');
    button.style.setProperty('color', '#fafafa', 'important');
    button.style.setProperty('background', 'transparent', 'important');
    button.style.setProperty('background-color', 'transparent', 'important');
    button.style.setProperty('background-image', 'none', 'important');
  };

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        background: 'transparent',
        backgroundImage: 'none',
        padding: 'clamp(2rem, 5vh, 4rem) clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        minHeight: '50vh'
      }}
    >
      <div
        style={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '1200px',
          position: 'relative',
          zIndex: 1,
          background: 'transparent',
          backgroundColor: 'transparent',
          backgroundImage: 'none'
        }}
      >
        <div
          style={{
            fontSize: 'clamp(0.9rem, 2.2vw, 1.6rem)',
            color: '#fafafa',
            lineHeight: '1.6',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: '400',
            margin: '0 auto',
            textAlign: 'center',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            background: 'none',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            boxShadow: 'none',
            minHeight: 'clamp(6rem, 15vh, 8rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 1.5rem)'
          }}
        >
          {/* Première ligne avec le texte animé */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            gap: 'clamp(0.2rem, 1vw, 0.5rem)',
            textAlign: 'center',
            width: '100%',
            background: 'transparent',
            backgroundColor: 'transparent',
            backgroundImage: 'none'
          }}>
            <span style={{ 
              display: 'inline-block',
              marginRight: 'clamp(0.3rem, 1vw, 0.5rem)',
              background: 'transparent',
              backgroundColor: 'transparent',
              backgroundImage: 'none'
            }}>
              {t('nog.lead')}
            </span>
            <div style={{ 
              minWidth: 'clamp(200px, 40vw, 300px)',
              width: 'auto',
              height: 'clamp(1.8rem, 4vw, 2.2rem)',
              overflow: 'hidden',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              lineHeight: 'clamp(1.8rem, 4vw, 2.2rem)',
              backgroundColor: 'transparent',
              background: 'transparent',
              backgroundImage: 'none',
              border: 'none'
            }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentLineIndex}
                  style={{
                    display: 'inline-flex',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                    background: 'transparent',
                    backgroundColor: 'transparent',
                    backgroundImage: 'none'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {splitIntoCharacters(lines[currentLineIndex]).map((char, index) => (
                    <motion.span
                      key={`${currentLineIndex}-${index}`}
                      initial={{ 
                        y: '100%', 
                        opacity: 0 
                      }}
                      animate={{ 
                        y: 0, 
                        opacity: 1 
                      }}
                      exit={{ 
                        y: '-100%', 
                        opacity: 0 
                      }}
                      transition={{ 
                        duration: 0.5,
                        delay: getStaggerDelay(index),
                        ease: [0.4, 0.0, 0.2, 1],
                        type: "tween"
                      }}
                      style={{
                        color: '#fce96b',
                        fontWeight: '600',
                        display: 'inline-block',
                        lineHeight: 'clamp(1.8rem, 4vw, 2.2rem)',
                        backgroundColor: 'transparent',
                        background: 'transparent',
                        backgroundImage: 'none'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Deuxième ligne - version desktop/tablet */}
          <div
            className="desktop-layout"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              gap: 'clamp(0.8rem, 2vw, 1.2rem)',
              width: '100%',
              background: 'transparent',
              backgroundColor: 'transparent',
              backgroundImage: 'none'
            }}
          >
            <div
              style={{
                fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)',
                color: '#fce96b',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: 'transparent',
                backgroundColor: 'transparent',
                backgroundImage: 'none'
              }}
            >
              {t('nog.getExamples')}
            </div>
            
            <button
              style={{
                padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(1rem, 2.5vw, 1.5rem)',
                fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
                fontWeight: '600',
                color: '#fafafa',
                backgroundColor: 'transparent',
                background: 'transparent',
                backgroundImage: 'none',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Inter", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                boxShadow: 'none'
              }}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              {t('nog.useCasesButton')}
            </button>

            <button
              style={{
                padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(1rem, 2.5vw, 1.5rem)',
                fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
                fontWeight: '600',
                color: '#fafafa',
                backgroundColor: 'transparent',
                background: 'transparent',
                backgroundImage: 'none',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Inter", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                boxShadow: 'none'
              }}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              {t('nog.academyButton')}
            </button>
          </div>

          {/* Version mobile - affichage vertical */}
          <div
            className="mobile-layout"
            style={{
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              width: '100%',
              background: 'transparent',
              backgroundColor: 'transparent',
              backgroundImage: 'none'
            }}
          >
            <div
              style={{
                fontSize: '0.9rem',
                color: '#fce96b',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: 'transparent',
                backgroundColor: 'transparent',
                backgroundImage: 'none'
              }}
            >
              {t('nog.getExamples')}
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '0.8rem',
              width: '100%',
              maxWidth: '280px',
              background: 'transparent',
              backgroundColor: 'transparent',
              backgroundImage: 'none'
            }}>
              <button
                style={{
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#fafafa',
                  backgroundColor: 'transparent',
                  background: 'transparent',
                  backgroundImage: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Inter", sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  width: '100%',
                  boxShadow: 'none'
                }}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
              >
                {t('nog.useCasesButton')}
              </button>

              <button
                style={{
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#fafafa',
                  backgroundColor: 'transparent',
                  background: 'transparent',
                  backgroundImage: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Inter", sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  width: '100%',
                  boxShadow: 'none'
                }}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
              >
                {t('nog.academyButton')}
              </button>
            </div>
          </div>
        </div>

        {/* Indicateurs de progression */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(0.3rem, 1vw, 0.5rem)',
            marginTop: 'clamp(1.5rem, 3vw, 2rem)',
            background: 'transparent',
            backgroundColor: 'transparent',
            backgroundImage: 'none'
          }}
        >
          {lines.map((_, index) => (
            <div
              key={index}
              style={{
                width: index === currentLineIndex ? 'clamp(1.5rem, 3vw, 2rem)' : 'clamp(0.4rem, 1vw, 0.5rem)',
                height: 'clamp(0.3rem, 1vw, 0.5rem)',
                backgroundColor: index === currentLineIndex ? '#fce96b' : 'rgba(255, 255, 255, 0.3)',
                background: index === currentLineIndex ? '#fce96b' : 'rgba(255, 255, 255, 0.3)',
                backgroundImage: 'none',
                borderRadius: '1rem',
                transition: 'all 0.5s ease'
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-layout {
            display: none !important;
          }
          
          .mobile-layout {
            display: flex !important;
          }
        }
        
        @media (max-width: 480px) {
          section {
            padding: clamp(1.5rem, 4vh, 2.5rem) 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NOGProjectSection;
