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

  // Nouvelles icônes personnalisées dans le style WhyEggOn
  const DataSourcesIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5" cy="5" r="2" fill="currentColor" />
      <circle cx="19" cy="5" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="5" cy="19" r="2" fill="currentColor" />
      <circle cx="19" cy="19" r="2" fill="currentColor" />
      <path d="M7 5h10" />
      <path d="M5 7v10" />
      <path d="M19 7v10" />
      <path d="M7 19h10" />
      <path d="M10 12h4" />
      <path d="M12 10v4" />
    </svg>
  );

  const PipelineIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="18" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
      <path d="M9 12h6" />
      <path d="M6 9v6" />
      <path d="M18 9v6" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <circle cx="12" cy="6" r="1" fill="currentColor" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      <path d="M12 7v4" />
      <path d="M12 13v4" />
    </svg>
  );

  const RAGAgentIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity="0.1" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
      <path d="M9 9l6 6" />
      <path d="M15 9l-6 6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );

  const SpecializedAgentsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <circle cx="18" cy="18" r="1" fill="currentColor" />
      <path d="M8 8l8 8" />
      <path d="M16 8l-8 8" />
    </svg>
  );

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

  // Données pour les cartes RAG avec nouvelles icônes
  const ragCards = [
    {
      title: 'DATA SOURCES',
      icon: <DataSourcesIcon />,
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
      icon: <PipelineIcon />,
      content: (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.4rem, 1vw, 0.6rem)',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.4rem, 0.8vw, 0.6rem)',
            flex: '1',
            minWidth: '80px'
          }}>
            <div style={{
              padding: 'clamp(0.4rem, 0.8vw, 0.6rem)',
              background: 'rgba(47, 47, 46, 0.12)',
              border: '1px solid rgba(47, 47, 46, 0.25)',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
              fontWeight: '600',
              color: '#2f2f2e',
              lineHeight: '1.1'
            }}>
              Multimodal<br />Extraction
            </div>

            <div style={{
              padding: 'clamp(0.4rem, 0.8vw, 0.6rem)',
              background: 'rgba(47, 47, 46, 0.12)',
              border: '1px solid rgba(47, 47, 46, 0.25)',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
              fontWeight: '600',
              color: '#2f2f2e',
              lineHeight: '1.1'
            }}>
              Continuous<br />Ingestion
            </div>
          </div>

          <div style={{
            width: 'clamp(24px, 5vw, 32px)',
            height: 'clamp(24px, 5vw, 32px)',
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
              width="clamp(10px, 2.5vw, 12px)"
              height="clamp(10px, 2.5vw, 12px)"
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
            padding: 'clamp(0.3rem, 0.6vw, 0.4rem) clamp(0.2rem, 0.5vw, 0.3rem)',
            background: 'rgba(47, 47, 46, 0.12)',
            border: '1px solid rgba(47, 47, 46, 0.25)',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)',
            fontWeight: '600',
            color: '#2f2f2e',
            flex: '1',
            alignSelf: 'center',
            minWidth: '60px',
            maxWidth: '90px',
            lineHeight: '1.1'
          }}>
            Datastore
          </div>
        </div>
      )
    },
    {
      title: 'CONTEXTUAL RAG AGENT',
      icon: <RAGAgentIcon />,
      content: (
        <>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            width: '100%',
            flexWrap: 'wrap'
          }}>
            <div style={{
              padding: 'clamp(0.25rem, 0.6vw, 0.4rem)',
              background: 'rgba(47, 47, 46, 0.18)',
              border: '1px solid rgba(47, 47, 46, 0.3)',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: 'clamp(0.45rem, 0.75vw, 0.6rem)',
              fontWeight: '600',
              color: '#2f2f2e',
              flex: '1',
              minWidth: '50px',
              lineHeight: '1.1'
            }}>
              Mixture of retrievers
            </div>

            <div style={{
              width: 'clamp(16px, 3vw, 20px)',
              height: 'clamp(16px, 3vw, 20px)',
              borderRadius: '50%',
              background: 'rgba(47, 47, 46, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg
                width="clamp(6px, 1.5vw, 8px)"
                height="clamp(6px, 1.5vw, 8px)"
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
              padding: 'clamp(0.25rem, 0.6vw, 0.4rem)',
              background: 'rgba(47, 47, 46, 0.18)',
              border: '1px solid rgba(47, 47, 46, 0.3)',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: 'clamp(0.45rem, 0.75vw, 0.6rem)',
              fontWeight: '600',
              color: '#2f2f2e',
              flex: '1',
              minWidth: '50px',
              lineHeight: '1.1'
            }}>
              Reranker
            </div>

            <div style={{
              width: 'clamp(16px, 3vw, 20px)',
              height: 'clamp(16px, 3vw, 20px)',
              borderRadius: '50%',
              background: 'rgba(47, 47, 46, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg
                width="clamp(6px, 1.5vw, 8px)"
                height="clamp(6px, 1.5vw, 8px)"
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
              padding: 'clamp(0.25rem, 0.6vw, 0.4rem)',
              background: 'rgba(47, 47, 46, 0.18)',
              border: '1px solid rgba(47, 47, 46, 0.3)',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: 'clamp(0.45rem, 0.75vw, 0.6rem)',
              fontWeight: '600',
              color: '#2f2f2e',
              flex: '1',
              minWidth: '50px',
              lineHeight: '1.1'
            }}>
              Grounded Language Model
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(47, 47, 46, 0.2)',
            paddingTop: 'clamp(0.6rem, 1.2vw, 1rem)',
            fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
            color: 'rgba(47, 47, 46, 0.9)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.3rem',
              marginBottom: 'clamp(0.3rem, 0.6vw, 0.5rem)'
            }}>
              <span style={{ color: '#2f2f2e', flexShrink: 0, fontSize: '0.8em' }}>✓</span>
              <span style={{ lineHeight: '1.2' }}>Components jointly optimized with RAG 2.0</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.3rem'
            }}>
              <span style={{ color: '#2f2f2e', flexShrink: 0, fontSize: '0.8em' }}>✓</span>
              <span style={{ lineHeight: '1.2' }}>Tuning and alignment to specialize to use case</span>
            </div>
          </div>
        </>
      )
    },
    {
      title: 'SPECIALIZED AGENTS BY DOMAIN',
      icon: <SpecializedAgentsIcon />,
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
              marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
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

          {/* Grille de cartes RAG avec flèches intégrées */}
          <div
            className="rag-cards-grid"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.8rem, 1.5vw, 1.2rem)',
              width: '100%',
              marginTop: '1.5rem',
              flexWrap: 'nowrap'
            }}
          >
            {/* Première carte - DATA SOURCES */}
            {ragCards.slice(0, 1).map((card, index) => (
              <React.Fragment key={index}>
                <motion.div
                  ref={el => cardsRef.current[index] = el}
                  className="rag-card-enhanced"
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
                    flex: '0.7',
                    minWidth: '140px',
                    maxWidth: '180px'
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    borderColor: 'var(--rag-card-border-hover, rgba(47, 47, 46, 0.25))',
                    background: 'var(--rag-card-bg-hover, rgba(47, 47, 46, 0.12))',
                    boxShadow: 'var(--rag-card-shadow-hover, 0 12px 40px rgba(47, 47, 46, 0.3))'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    margin: '0 auto 1.5rem auto',
                    borderRadius: '50%',
                    background: 'rgba(252, 233, 107, 0.1)',
                    border: '2px solid rgba(252, 233, 107, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ width: '30px', height: '30px', color: '#2f2f2e' }}>
                      {card.icon}
                    </div>
                  </div>

                  <h3
                    className="rag-card-title-enhanced"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                      fontWeight: '700',
                      color: '#2f2f2e',
                      marginBottom: '1.5rem',
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

                {/* Flèche après DATA SOURCES */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '100%'
                }}>
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    style={{
                      color: 'rgba(47, 47, 46, 0.6)',
                      flexShrink: 0
                    }}
                  >
                    <path
                      d="M2 8H22M22 8L16 2M22 8L16 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </React.Fragment>
            ))}

            {/* Section centrale avec PLATFORM et les deux cartes centrales */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              flex: '3.6'
            }}>
              {/* Label PLATFORM repositionné */}
              <div style={{
                background: 'transparent',
                padding: '0.8rem 2rem',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontWeight: '900',
                color: '#2f2f2e',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                textAlign: 'center',
                borderTop: '2px solid rgba(47, 47, 46, 0.2)',
                borderBottom: '2px solid rgba(47, 47, 46, 0.2)'
              }}>
                PLATFORM
              </div>

              {/* Conteneur des deux cartes centrales */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.8rem, 1.5vw, 1.2rem)',
                width: '100%',
                justifyContent: 'center'
              }}>
                {ragCards.slice(1, 3).map((card, index) => (
                  <React.Fragment key={index + 1}>
                    <motion.div
                      ref={el => cardsRef.current[index + 1] = el}
                      className="rag-card-enhanced"
                      style={{
                        background: 'var(--rag-card-bg, rgba(47, 47, 46, 0.08))',
                        border: '1px solid var(--rag-card-border, rgba(47, 47, 46, 0.15))',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '1rem',
                        padding: 'clamp(1.2rem, 2vw, 1.5rem)',
                        boxShadow: 'var(--rag-card-shadow, 0 8px 32px rgba(47, 47, 46, 0.2))',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        cursor: 'pointer',
                        opacity: 1,
                        transform: 'translateY(0px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '180px',
                        maxHeight: '220px',
                        flex: '1.8',
                        minWidth: '280px',
                        maxWidth: '380px'
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        borderColor: 'var(--rag-card-border-hover, rgba(47, 47, 46, 0.25))',
                        background: 'var(--rag-card-bg-hover, rgba(47, 47, 46, 0.12))',
                        boxShadow: 'var(--rag-card-shadow-hover, 0 12px 40px rgba(47, 47, 46, 0.3))'
                      }}
                    >
                      <div style={{
                        width: '60px',
                        height: '60px',
                        margin: '0 auto 1rem auto',
                        borderRadius: '50%',
                        background: 'rgba(252, 233, 107, 0.1)',
                        border: '2px solid rgba(252, 233, 107, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}>
                        <div style={{ width: '30px', height: '30px', color: '#2f2f2e' }}>
                          {card.icon}
                        </div>
                      </div>

                      <h3
                        className="rag-card-title-enhanced"
                        style={{
                          fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                          fontWeight: '700',
                          color: '#2f2f2e',
                          marginBottom: '1rem',
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          lineHeight: '1.3',
                          hyphens: 'auto',
                          wordBreak: 'break-word'
                        }}
                      >
                        {card.title}
                      </h3>

                      <div className="rag-card-content">
                        {card.content}
                      </div>
                    </motion.div>

                    {/* Flèche entre les cartes centrales */}
                    {index === 0 && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '40px',
                        height: '100%'
                      }}>
                        <svg
                          width="24"
                          height="16"
                          viewBox="0 0 24 16"
                          fill="none"
                          style={{
                            color: 'rgba(47, 47, 46, 0.6)',
                            flexShrink: 0
                          }}
                        >
                          <path
                            d="M2 8H22M22 8L16 2M22 8L16 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Flèche avant SPECIALIZED AGENTS */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '40px',
              height: '100%'
            }}>
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                style={{
                  color: 'rgba(47, 47, 46, 0.6)',
                  flexShrink: 0
                }}
              >
                <path
                  d="M2 8H22M22 8L16 2M22 8L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Dernière carte - SPECIALIZED AGENTS BY DOMAIN */}
            {ragCards.slice(3, 4).map((card, index) => (
              <motion.div
                key={index + 3}
                ref={el => cardsRef.current[index + 3] = el}
                className="rag-card-enhanced"
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
                  flex: '0.7',
                  minWidth: '140px',
                  maxWidth: '180px'
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  borderColor: 'var(--rag-card-border-hover, rgba(47, 47, 46, 0.25))',
                  background: 'var(--rag-card-bg-hover, rgba(47, 47, 46, 0.12))',
                  boxShadow: 'var(--rag-card-shadow-hover, 0 12px 40px rgba(47, 47, 46, 0.3))'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 1.5rem auto',
                  borderRadius: '50%',
                  background: 'rgba(252, 233, 107, 0.1)',
                  border: '2px solid rgba(252, 233, 107, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ width: '30px', height: '30px', color: '#2f2f2e' }}>
                    {card.icon}
                  </div>
                </div>

                <h3
                  className="rag-card-title-enhanced"
                  style={{
                    fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                    fontWeight: '700',
                    color: '#2f2f2e',
                    marginBottom: '1.5rem',
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
            ))}
          </div>

        </div>

        {/* Styles responsive améliorés */}
        <style jsx>{`
            @media (max-width: 1200px) {
              .rag-cards-grid {
                gap: 1rem !important;
              }
              
              .rag-card-enhanced {
                min-width: 180px !important;
              }
            }

            @media (max-width: 1024px) {
              .rag-cards-grid {
                flex-wrap: wrap !important;
                justify-content: center !important;
                gap: 1rem !important;
              }
              
              .rag-card-enhanced {
                flex: 1 1 calc(50% - 0.5rem) !important;
                min-width: 200px !important;
                max-width: 300px !important;
              }
            }

            @media (max-width: 768px) {
              .rag-cards-grid {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 1.5rem !important;
              }

              .rag-cards-grid > div:nth-child(2n) {
                transform: rotate(90deg) !important;
                margin: 1rem 0 !important;
              }

              .rag-card-enhanced {
                min-width: 100% !important;
                max-width: 100% !important;
                flex: none !important;
                min-height: auto !important;
                max-height: none !important;
              }
            }

            @media (max-width: 480px) {
              .rag-cards-grid {
                gap: 1rem !important;
              }

              .rag-card-enhanced {
                padding: 1rem !important;
                min-height: auto !important;
              }

              .rag-card-title-enhanced {
                font-size: 0.75rem !important;
                line-height: 1.2 !important;
                margin-bottom: 0.8rem !important;
              }
            }
          `}</style>
      </div>
    </motion.div>
    </motion.div >
    </section >
  );
};

export default RAGArchitectureDiagram;
