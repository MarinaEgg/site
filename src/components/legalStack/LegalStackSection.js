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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rag-icon-outline">
          <rect x="6" y="4" width="12" height="16" rx="1" ry="1" fill="currentColor" fillOpacity="0.15" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="15" y2="16" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
          <circle cx="18" cy="10" r="1" fill="currentColor" />
          <circle cx="6" cy="18" r="1" fill="currentColor" />
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" fillOpacity="0.1" />
                  <polyline points="14,2 14,8 20,8" fill="currentColor" fillOpacity="0.2" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="10" x2="14" y2="10" />
                  <circle cx="8" cy="10" r="1" fill="currentColor" />
                  <circle cx="16" cy="15" r="0.8" fill="currentColor" />
                  <circle cx="10" cy="19" r="0.8" fill="currentColor" />
                </>
              )
            },
            {
              icon: 'database',
              text: 'Structured Data',
              iconPath: (
                <>
                  <ellipse cx="12" cy="5" rx="9" ry="3" fill="currentColor" fillOpacity="0.2" />
                  <ellipse cx="12" cy="12" rx="9" ry="3" fill="currentColor" fillOpacity="0.15" />
                  <ellipse cx="12" cy="19" rx="9" ry="3" fill="currentColor" fillOpacity="0.1" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  <circle cx="8" cy="5" r="0.8" fill="currentColor" />
                  <circle cx="16" cy="5" r="0.8" fill="currentColor" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                </>
              )
            },
            {
              icon: 'zap',
              text: 'Application APIs',
              iconPath: (
                <>
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity="0.2" />
                  <path d="M13 2l-2 8h6l-8 12 2-8H5l8-12z" fill="currentColor" fillOpacity="0.1" />
                  <circle cx="13" cy="6" r="1" fill="currentColor" />
                  <circle cx="11" cy="18" r="1" fill="currentColor" />
                  <circle cx="8" cy="12" r="0.8" fill="currentColor" />
                  <circle cx="16" cy="12" r="0.8" fill="currentColor" />
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
                  strokeWidth="2"
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rag-icon-outline">
          <rect x="4" y="6" width="6" height="12" rx="1" ry="1" fill="currentColor" fillOpacity="0.2" />
          <rect x="14" y="6" width="6" height="12" rx="1" ry="1" fill="currentColor" fillOpacity="0.2" />
          <line x1="10" y1="12" x2="14" y2="12" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M10 10l2-2 2 2" fill="currentColor" fillOpacity="0.3" />
          <line x1="6" y1="9" x2="8" y2="9" />
          <line x1="16" y1="15" x2="18" y2="15" />
        </svg>
      ),
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
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rag-icon-outline">
          <rect x="6" y="6" width="12" height="12" rx="2" ry="2" fill="currentColor" fillOpacity="0.1" />
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="9" x2="12" y2="15" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <circle cx="9" cy="9" r="1" fill="currentColor" />
          <circle cx="15" cy="9" r="1" fill="currentColor" />
          <circle cx="9" cy="15" r="1" fill="currentColor" />
          <circle cx="15" cy="15" r="1" fill="currentColor" />
        </svg>
      ),
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
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rag-icon-outline">
          <circle cx="9" cy="7" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="15" cy="7" r="2" fill="currentColor" fillOpacity="0.3" />
          <line x1="9" y1="10" x2="9" y2="18" />
          <line x1="15" y1="9" x2="15" y2="18" />
          <rect x="7" y="15" width="4" height="2" fill="currentColor" fillOpacity="0.15" />
          <rect x="13" y="16" width="4" height="1" fill="currentColor" fillOpacity="0.15" />
          <line x1="6" y1="18" x2="12" y2="18" />
          <line x1="13" y1="18" x2="17" y2="18" />
          <circle cx="9" cy="7" r="1" fill="currentColor" />
          <circle cx="15" cy="7" r="0.8" fill="currentColor" />
        </svg>
      ),
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {[
            {
              name: 'Finance',
              iconPath: (
                <>
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  <circle cx="9.5" cy="8.5" r="2.5" fill="currentColor" fillOpacity="0.2" />
                  <circle cx="14.5" cy="15.5" r="2.5" fill="currentColor" fillOpacity="0.2" />
                  <circle cx="12" cy="5" r="1" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                  <circle cx="12" cy="19" r="1" fill="currentColor" />
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
                  <circle cx="8.5" cy="7.5" r="1.8" fill="currentColor" fillOpacity="0.2" />
                  <circle cx="15.5" cy="7.5" r="1.8" fill="currentColor" fillOpacity="0.2" />
                  <rect x="10" y="18" width="4" height="2" fill="currentColor" fillOpacity="0.15" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                  <circle cx="12" cy="15" r="0.8" fill="currentColor" />
                </>
              )
            },
            {
              name: 'Assurance',
              iconPath: (
                <>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.15" />
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="8" r="2" fill="currentColor" fillOpacity="0.2" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                  <circle cx="8" cy="10" r="0.8" fill="currentColor" />
                  <circle cx="16" cy="10" r="0.8" fill="currentColor" />
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
                  strokeWidth="2"
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
                background: 'transparent',
                textAlign: 'center',
                wordBreak: 'keep-all',
                hyphens: 'none'
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

          {/* Label PLATFORM amélioré */}
          <div style={{
            width: '100%',
            margin: '2.5rem 0 2rem 0',
            display: 'flex',
            justifyContent: 'center'
          }}>
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
          </div>

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
            {ragCards.map((card, index) => {
              const isReducedCard = card.title.includes('CONTEXTUAL DOCUMENT') || card.title.includes('CONTEXTUAL RAG AGENT');

              return (
                <React.Fragment key={index}>


                  <motion.div
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
                      minHeight: isReducedCard ? '180px' : 'initial',
                      maxHeight: isReducedCard ? '220px' : 'none',
                      flex: isReducedCard ? '1.5' : '0.8',
                      minWidth: isReducedCard ? '220px' : '160px',
                      maxWidth: isReducedCard ? '320px' : '200px'
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      borderColor: 'var(--rag-card-border-hover, rgba(47, 47, 46, 0.25))',
                      background: 'var(--rag-card-bg-hover, rgba(47, 47, 46, 0.12))',
                      boxShadow: 'var(--rag-card-shadow-hover, 0 12px 40px rgba(47, 47, 46, 0.3))'
                    }}
                  >
                    <h3
                      className="rag-card-title-enhanced"
                      style={{
                        fontSize: isReducedCard ? 'clamp(0.75rem, 1.2vw, 0.9rem)' : 'clamp(0.9rem, 1.4vw, 1.1rem)',
                        fontWeight: '700',
                        color: '#2f2f2e',
                        marginBottom: isReducedCard ? '1rem' : '1.5rem',
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

                  {/* Flèche entre les conteneurs (sauf après le dernier) */}
                  {index < ragCards.length - 1 && (
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
              );
            })}
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


    </section>
  );
};

export default RAGArchitectureDiagram;

