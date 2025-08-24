import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './LegalStackSection.css';

const RAGArchitectureDiagram = () => {
  const { t } = useTranslation();
  const bentoRef = useRef(null);
  const cardsRef = useRef([]);

  // États pour gérer les transitions de scroll
  const ragSectionRef = useRef(null);
  const [ragScrollProgress, setRagScrollProgress] = useState(0);

  // useEffect pour gérer les transitions de couleur au scroll
  useEffect(() => {
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  const ArrowIcon = () => (
    <svg
      width="32"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      style={{ color: '#2f2f2e' }}
    >
      <path
        d="M2 12H38M38 12L30 4M38 12L30 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Données pour les cartes RAG
  const ragCards = [
    {
      title: 'DATA SOURCES',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      ),
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {[
            {
              icon: 'file-text',
              text: 'Unstructured Data',
              iconPath: (
                <>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </>
              )
            },
            {
              icon: 'database',
              text: 'Structured Data',
              iconPath: (
                <>
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </>
              )
            },
            {
              icon: 'zap',
              text: 'Application APIs',
              iconPath: (
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              )
            }
          ].map((item, index) => (
            <div
              key={index}
              style={{
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
              }}
            >
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ color: '#2f2f2e' }}
                >
                  {item.iconPath}
                </svg>
              </div>

              <span style={{
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                fontWeight: '600',
                color: '#2f2f2e',
                lineHeight: '1.2'
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'CONTEXTUAL DOCUMENT UNDERSTANDING PIPELINE',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      content: (
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
            display: 'flex',
            alignItems: 'center',
            height: '80px',
            flexShrink: 0
          }}>
            <svg
              width="16"
              height="80"
              viewBox="0 0 16 80"
              fill="none"
              style={{ color: 'rgba(47, 47, 46, 0.3)' }}
            >
              <path
                d="M2 8 Q2 2 6 2 Q12 2 12 8 L12 36 Q12 40 10 40 Q12 40 12 44 L12 72 Q12 78 6 78 Q2 78 2 72"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ color: '#2f2f2e' }}
            >
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
      )
    },
    {
      title: 'CONTEXTUAL RAG AGENT',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
          <polyline points="7.5 19.79 7.5 14.6 3 12" />
          <polyline points="21 12 16.5 14.6 16.5 19.79" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      content: (
        <>
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
              <svg
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                style={{ color: '#2f2f2e' }}
              >
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
              <svg
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                style={{ color: '#2f2f2e' }}
              >
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
              <span style={{ whiteSpace: 'nowrap' }}>Grounded</span>{' '}
              <span style={{ whiteSpace: 'nowrap' }}>Language</span>{' '}
              <span style={{ whiteSpace: 'nowrap' }}>Model</span>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(47, 47, 46, 0.2)',
            paddingTop: '1rem',
            fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
            color: 'rgba(47, 47, 46, 0.9)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.4rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: '#2f2f2e', flexShrink: 0 }}>✓</span>
              <span>Components jointly optimized with RAG 2.0</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.4rem'
            }}>
              <span style={{ color: '#2f2f2e', flexShrink: 0 }}>✓</span>
              <span>Tuning and alignment to specialize to use case</span>
            </div>
          </div>
        </>
      )
    },
    {
      title: 'SPECIALIZED AGENTS BY DOMAIN',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {[
            {
              name: 'Finance',
              iconPath: (
                <>
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </>
              )
            },
            {
              name: 'Law',
              iconPath: (
                <>
                  <path d="M9 12 6.5 9.5a2.5 2.5 0 0 1 0-3.5 2.5 2.5 0 0 1 3.5 0L12 8l2-2a2.5 2.5 0 0 1 3.5 0 2.5 2.5 0 0 1 0 3.5L15 12" />
                  <path d="M12 12v8" />
                  <path d="M8 21h8" />
                </>
              )
            },
            {
              name: 'Technology',
              iconPath: (
                <>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <path d="M12 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  <path d="M8 12h8" />
                  <path d="M6 15h12" />
                </>
              )
            },
            {
              name: 'Your Enterprise',
              iconPath: (
                <>
                  <path d="M3 21h18" />
                  <path d="M5 21V7l8-4v18" />
                  <path d="M19 21V11l-6-4" />
                  <path d="M9 9v.01" />
                  <path d="M9 12v.01" />
                  <path d="M9 15v.01" />
                  <path d="M9 18v.01" />
                </>
              )
            }
          ].map((item, index) => (
            <div
              key={index}
              style={{
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
              }}
            >
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ color: '#2f2f2e' }}
                >
                  {item.iconPath}
                </svg>
              </div>

              <span style={{
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                fontWeight: '600',
                color: '#2f2f2e',
                lineHeight: '1.2'
              }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <section
      ref={ragSectionRef}
      className="legal-stack-section rag-section-enhanced rag-bg-enhanced-start"
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: 'clamp(4rem, 8vh, 6rem) 0',
        background: 'var(--rag-bg-color, transparent)',
        transition: 'background-color 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <motion.div
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
        whileHover={{
          y: -8,
          scale: 1.02
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
          <motion.div
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(2rem, 4vh, 3rem)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
              {t('ragArchitecture.subtitle', 'THE CONTEXTUAL RAG PLATFORM')}
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
              {t('ragArchitecture.title', 'NEXT-GEN ARCHITECTURE FOR AGENTS')}
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
              {t('ragArchitecture.introduction', 'Built by pioneers in RAG, our platform empowers you to seamlessly integrate AI agents with your enterprise knowledge, providing a complete solution for designing cutting-edge RAG systems.')}
            </p>
          </motion.div>

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

          {/* Grille de cartes RAG */}
          <div
            className="rag-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              width: '100%',
              marginTop: '2rem'
            }}
          >
            {ragCards.map((card, index) => {
              const isReducedCard = card.title.includes('CONTEXTUAL DOCUMENT') || card.title.includes('CONTEXTUAL RAG AGENT');

              return (
                <motion.div
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className="rag-card-enhanced"
                  style={{
                    background: 'var(--rag-card-bg, rgba(47, 47, 46, 0.08))',
                    border: '1px solid var(--rag-card-border, rgba(47, 47, 46, 0.15))',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '1rem',
                    padding: isReducedCard ? 'clamp(1.2rem, 2vw, 1.5rem)' : 'clamp(1.5rem, 2.5vw, 2rem)',
                    boxShadow: 'var(--rag-card-shadow, 0 8px 32px rgba(47, 47, 46, 0.2))',
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    opacity: 1,
                    transform: 'translateY(0px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: isReducedCard ? 'center' : 'flex-start',
                    minHeight: isReducedCard ? '150px' : 'initial',
                    maxHeight: isReducedCard ? '200px' : 'auto'
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    borderColor: 'var(--rag-card-border-hover, rgba(47, 47, 46, 0.25))',
                    background: 'var(--rag-card-bg-hover, rgba(47, 47, 46, 0.12))',
                    boxShadow: 'var(--rag-card-shadow-hover, 0 12px 40px rgba(47, 47, 46, 0.3))'
                  }}
                >
                  {/* Icône supprimée */}

                  <h3
                    className="rag-card-title-enhanced"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                      fontWeight: '700',
                      color: '#2f2f2e',
                      marginBottom: isReducedCard ? '1rem' : '1.5rem',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      lineHeight: '1.3'
                    }}
                  >
                    {card.title}
                  </h3>

                  <div className="rag-card-content">
                    {card.content}
                  </div>
                </motion.div>
              );
            })}

            {/* Flèches entre cartes - bien positionnées */}
            <div style={{
              position: 'absolute',
              top: '60%',
              left: '23%',
              fontSize: '1.5rem',
              color: 'rgba(47, 47, 46, 0.5)',
              zIndex: 10
            }}>→</div>

            <div style={{
              position: 'absolute',
              top: '60%',
              left: '48%',
              fontSize: '1.5rem',
              color: 'rgba(47, 47, 46, 0.5)',
              zIndex: 10
            }}>→</div>

            <div style={{
              position: 'absolute',
              top: '60%',
              left: '73%',
              fontSize: '1.5rem',
              color: 'rgba(47, 47, 46, 0.5)',
              zIndex: 10
            }}>→</div>
          </div>
        </div>
      </motion.div>


    </section>
  );
};

export default RAGArchitectureDiagram;
