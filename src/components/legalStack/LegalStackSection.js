import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './LegalStackSection.css';

const RAGArchitectureDiagram = () => {
  console.log("🔍 WHY EGGON SECTION - DÉBUT DU CHARGEMENT");
  
  const { t } = useTranslation();
  const bentoRef = useRef(null);
  const cardsRef = useRef([]);

  // États pour gérer les transitions de scroll
  const ragSectionRef = useRef(null);
  const [ragScrollProgress, setRagScrollProgress] = useState(0);

  // useEffect pour gérer les transitions de couleur au scroll
  useEffect(() => {
    console.log("🔍 WHY EGGON SECTION - useEffect scroll setup");
    
    const handleScroll = () => {
      if (!ragSectionRef.current) return;

      const element = ragSectionRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calcul accéléré comme dans deployment
      const startPoint = windowHeight * 0.8;
      const endPoint = -elementHeight * 0.2;

      let progress;
      if (rect.top > startPoint) {
        progress = 0;
      } else if (rect.top < endPoint) {
        progress = 1;
      } else {
        progress = (startPoint - rect.top) / (startPoint - endPoint);
      }

      progress = Math.pow(progress, 0.7);
      setRagScrollProgress(progress);

      // Appliquer les classes de transition
      if (progress < 0.15) {
        element.className = element.className.replace(/rag-bg-enhanced-\w+/g, '') + ' rag-bg-enhanced-start';
      } else if (progress < 0.45) {
        element.className = element.className.replace(/rag-bg-enhanced-\w+/g, '') + ' rag-bg-enhanced-middle';
      } else {
        element.className = element.className.replace(/rag-bg-enhanced-\w+/g, '') + ' rag-bg-enhanced-end';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    console.log("🔍 WHY EGGON SECTION - useEffect intersection observer setup");
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("🔍 WHY EGGON SECTION - Intersection detected, adding visible class");
          entry.target.classList.add('visible');

          // Animer les cartes individuellement
          const cards = entry.target.querySelectorAll('.rag-card-enhanced');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 100);
          });
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    if (bentoRef.current) {
      observer.observe(bentoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  console.log("🔍 WHY EGGON SECTION - Avant le return du JSX");

  return (
    <section
      ref={ragSectionRef}
      className="legal-stack-section rag-section-enhanced rag-bg-enhanced-start"
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: 'clamp(4rem, 8vh, 6rem) 0',
        background: '#ff0000', // ROUGE VIF pour debug
        transition: 'background-color 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        ref={bentoRef}
        className="bento-container rag-content-container visible"
        style={{
          background: 'var(--rag-container-bg, #faf2d7)',
          borderRadius: '3rem',
          border: 'var(--rag-container-border, 4px solid #2f2f2e)',
          boxShadow: 'var(--rag-container-shadow, 0 20px 60px rgba(47, 47, 46, 0.3))',
          width: '95%',
          maxWidth: '1600px',
          position: 'relative',
          padding: 'clamp(3rem, 5vh, 4rem) clamp(2rem, 4vw, 3rem)',
          cursor: 'pointer'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          {/* Header du contenu à l'intérieur du rectangle */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                fontWeight: '600',
                color: '#2f2f2e',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                textDecoration: 'underline',
                background: 'transparent'
              }}
            >
              {t('ragArchitecture.subtitle', 'LA PLATEFORME AI CONTEXTUELLE')}
            </h3>

            <h2
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '900',
                color: '#2f2f2e',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                textShadow: 'none',
                background: 'transparent'
              }}
            >
              {t('ragArchitecture.title', 'ARCHITECTURE DE NOUVELLE GÉNÉRATION')}
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                fontWeight: '400',
                color: '#2f2f2e',
                lineHeight: '1.6',
                marginBottom: '2rem',
                maxWidth: '900px',
                margin: '0 auto 2rem auto',
                textAlign: 'center',
                background: 'transparent',
                opacity: 0.9
              }}
            >
              {t('ragArchitecture.introduction', 'La génération à enrichissement contextuel (RAG) optimise les réponses des modèles de langage en exploitant vos données internes ou externes, sans réentraînement.')}
            </p>
          </div>

          {/* Label PLATFORM simplifié */}
          <div style={{
            width: '100%',
            margin: '2rem 0 3rem 0',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'transparent',
              padding: '0.5rem 1.5rem',
              fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
              fontWeight: '700',
              color: '#2f2f2e',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              PLATFORM
            </div>
          </div>

          {/* Grille de cartes RAG avec flèches intégrées */}
          <div
            className="rag-cards-grid"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              width: '100%',
              marginTop: '2rem',
              flexWrap: 'wrap'
            }}
          >
            {/* DATA SOURCES */}
            <div
              className="rag-card-enhanced visible"
              style={{
                background: 'var(--rag-card-bg, rgba(47, 47, 46, 0.08))',
                border: '1px solid var(--rag-card-border, rgba(47, 47, 46, 0.15))',
                backdropFilter: 'blur(20px)',
                borderRadius: '1rem',
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                boxShadow: 'var(--rag-card-shadow, 0 8px 32px rgba(47, 47, 46, 0.2))',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                opacity: 1,
                transform: 'translateY(0px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flex: '1',
                minWidth: '250px'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                fontWeight: '700',
                color: '#2f2f2e',
                marginBottom: '1.5rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.3'
              }}>
                DATA SOURCES
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.8rem',
                  background: 'rgba(47, 47, 46, 0.12)',
                  border: '2px solid rgba(47, 47, 46, 0.25)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(47, 47, 46, 0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(47, 47, 46, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#2f2f2e' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                  </div>
                  <span style={{
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    fontWeight: '600',
                    color: '#2f2f2e',
                    lineHeight: '1.2'
                  }}>
                    Unstructured Data
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.8rem',
                  background: 'rgba(47, 47, 46, 0.12)',
                  border: '2px solid rgba(47, 47, 46, 0.25)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(47, 47, 46, 0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(47, 47, 46, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#2f2f2e' }}>
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  </div>
                  <span style={{
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    fontWeight: '600',
                    color: '#2f2f2e',
                    lineHeight: '1.2'
                  }}>
                    Structured Data
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.8rem',
                  background: 'rgba(47, 47, 46, 0.12)',
                  border: '2px solid rgba(47, 47, 46, 0.25)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(47, 47, 46, 0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(47, 47, 46, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#2f2f2e' }}>
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <span style={{
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    fontWeight: '600',
                    color: '#2f2f2e',
                    lineHeight: '1.2'
                  }}>
                    Application APIs
                  </span>
                </div>
              </div>
            </div>

            {/* Flèche 1 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '40px',
              height: '100%'
            }}>
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" style={{ color: 'rgba(47, 47, 46, 0.6)', flexShrink: 0 }}>
                <path d="M2 8H22M22 8L16 2M22 8L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* CONTEXTUAL DOCUMENT UNDERSTANDING PIPELINE */}
            <div
              className="rag-card-enhanced visible"
              style={{
                background: 'var(--rag-card-bg, rgba(47, 47, 46, 0.08))',
                border: '1px solid var(--rag-card-border, rgba(47, 47, 46, 0.15))',
                backdropFilter: 'blur(20px)',
                borderRadius: '1rem',
                padding: 'clamp(1.2rem, 2vw, 1.5rem) clamp(1.2rem, 2vw, 1.5rem) clamp(2rem, 3vw, 2.5rem) clamp(1.2rem, 2vw, 1.5rem)',
                boxShadow: 'var(--rag-card-shadow, 0 8px 32px rgba(47, 47, 46, 0.2))',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                opacity: 1,
                transform: 'translateY(0px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '150px',
                maxHeight: '200px',
                flex: '1',
                minWidth: '250px'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                fontWeight: '700',
                color: '#2f2f2e',
                marginBottom: '1rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.3'
              }}>
                CONTEXTUAL DOCUMENT UNDERSTANDING PIPELINE
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  flex: '1'
                }}>
                  <div style={{
                    padding: '0.6rem',
                    background: 'rgba(47, 47, 46, 0.12)',
                    border: '1px solid rgba(47, 47, 46, 0.25)',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                    fontWeight: '600',
                    color: '#2f2f2e'
                  }}>
                    Multimodal<br />Extraction
                  </div>
                  <div style={{
                    padding: '0.6rem',
                    background: 'rgba(47, 47, 46, 0.12)',
                    border: '1px solid rgba(47, 47, 46, 0.25)',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                    fontWeight: '600',
                    color: '#2f2f2e'
                  }}>
                    Continuous<br />Ingestion
                  </div>
                </div>

                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(47, 47, 46, 0.12)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(47, 47, 46, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#2f2f2e' }}>
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </div>

                <div style={{
                  padding: '0.4rem 0.3rem',
                  background: 'rgba(47, 47, 46, 0.12)',
                  border: '1px solid rgba(47, 47, 46, 0.25)',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)',
                  fontWeight: '600',
                  color: '#2f2f2e',
                  flex: '1',
                  alignSelf: 'center',
                  minWidth: '50px',
                  maxWidth: '80px'
                }}>
                  Datastore
                </div>
              </div>
            </div>

            {/* Flèche 2 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '40px',
              height: '100%'
            }}>
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" style={{ color: 'rgba(47, 47, 46, 0.6)', flexShrink: 0 }}>
                <path d="M2 8H22M22 8L16 2M22 8L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* CONTEXTUAL RAG AGENT */}
            <div
              className="rag-card-enhanced visible"
              style={{
                background: 'var(--rag-card-bg, rgba(47, 47, 46, 0.08))',
                border: '1px solid var(--rag-card-border, rgba(47, 47, 46, 0.15))',
                backdropFilter: 'blur(20px)',
                borderRadius: '1rem',
                padding: 'clamp(1.2rem, 2vw, 1.5rem) clamp(1.2rem, 2vw, 1.5rem) clamp(2rem, 3vw, 2.5rem) clamp(1.2rem, 2vw, 1.5rem)',
                boxShadow: 'var(--rag-card-shadow, 0 8px 32px rgba(47, 47, 46, 0.2))',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                opacity: 1,
                transform: 'translateY(0px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '150px',
                maxHeight: '200px',
                flex: '1',
                minWidth: '250px'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                fontWeight: '700',
                color: '#2f2f2e',
                marginBottom: '1rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.3'
              }}>
                CONTEXTUAL RAG AGENT
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                width: '100%'
              }}>
                <div style={{
                  padding: 'clamp(0.3rem, 0.8vw, 0.5rem)',
                  background: 'rgba(47, 47, 46, 0.18)',
                  border: '1px solid rgba(47, 47, 46, 0.3)',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)',
                  fontWeight: '600',
                  color: '#2f2f2e',
                  flex: '1',
                  minWidth: '60px',
                  lineHeight: '1.1'
                }}>
                  <span style={{ whiteSpace: 'nowrap' }}>Mixture</span>{' '}
                  <span style={{ whiteSpace: 'nowrap' }}>of</span>{' '}
                  <span style={{ whiteSpace: 'nowrap' }}>retrievers</span>
                </div>

                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(47, 47, 46, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2f2f2e' }}>
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </div>

                <div style={{
                  padding: 'clamp(0.3rem, 0.8vw, 0.5rem)',
                  background: 'rgba(47, 47, 46, 0.18)',
                  border: '1px solid rgba(47, 47, 46, 0.3)',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)',
                  fontWeight: '600',
                  color: '#2f2f2e',
                  flex: '1',
                  minWidth: '60px',
                  lineHeight: '1.1'
                }}>
                  <span style={{ whiteSpace: 'nowrap' }}>Reranker</span>
                </div>

                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(47, 47, 46, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2f2f2e' }}>
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </div>

                <div style={{
                  padding: 'clamp(0.3rem, 0.8vw, 0.5rem)',
                  background: 'rgba(47, 47, 46, 0.18)',
                  border: '1px solid rgba(47, 47, 46, 0.3)',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)',
                  fontWeight: '600',
                  color: '#2f2f2e',
                  flex: '1',
                  minWidth: '60px',
                  lineHeight: '1.1'
                }}>
                  <span style={{ whiteSpace: 'nowrap' }}>LLM</span>
                </div>
              </div>
            </div>

            {/* Flèche 3 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '40px',
              height: '100%'
            }}>
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" style={{ color: 'rgba(47, 47, 46, 0.6)', flexShrink: 0 }}>
                <path d="M2 8H22M22 8L16 2M22 8L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* APPLICATION */}
            <div
              className="rag-card-enhanced visible"
              style={{
                background: 'var(--rag-card-bg, rgba(47, 47, 46, 0.08))',
                border: '1px solid var(--rag-card-border, rgba(47, 47, 46, 0.15))',
                backdropFilter: 'blur(20px)',
                borderRadius: '1rem',
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                boxShadow: 'var(--rag-card-shadow, 0 8px 32px rgba(47, 47, 46, 0.2))',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                opacity: 1,
                transform: 'translateY(0px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flex: '1',
                minWidth: '250px'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                fontWeight: '700',
                color: '#2f2f2e',
                marginBottom: '1.5rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.3'
              }}>
                APPLICATION
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.8rem',
                  background: 'rgba(47, 47, 46, 0.12)',
                  border: '2px solid rgba(47, 47, 46, 0.25)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(47, 47, 46, 0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(47, 47, 46, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#2f2f2e' }}>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span style={{
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    fontWeight: '600',
                    color: '#2f2f2e',
                    lineHeight: '1.2'
                  }}>
                    Chat Interface
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.8rem',
                  background: 'rgba(47, 47, 46, 0.12)',
                  border: '2px solid rgba(47, 47, 46, 0.25)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(47, 47, 46, 0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(47, 47, 46, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#2f2f2e' }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  </div>
                  <span style={{
                    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                    fontWeight: '600',
                    color: '#2f2f2e',
                    lineHeight: '1.2'
                  }}>
                    Search Interface
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RAGArchitectureDiagram;
