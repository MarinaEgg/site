import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './LegalStackSection.css';

const RAGArchitectureDiagram = () => {
  const { t } = useTranslation();
  const bentoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (bentoRef.current) {
      observer.observe(bentoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

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

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: 'clamp(4rem, 8vh, 6rem) 0',
        backgroundColor: 'transparent',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      className="legal-stack-section"
    >
      <motion.div
        ref={bentoRef}
        className="bento-container rag-platform-container"
        style={{
          background: '#faf2d7',
          borderRadius: '3rem',
          border: '4px solid #2f2f2e',
          boxShadow: '0 20px 60px rgba(47, 47, 46, 0.3)',
          width: '95%',
          maxWidth: '1600px',
          position: 'relative',
          padding: 'clamp(3rem, 5vh, 4rem) clamp(2rem, 4vw, 3rem)',
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'pointer'
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 30px 80px rgba(47, 47, 46, 0.4)'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.8 }}
          whileHover={{
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 30px 80px rgba(47, 47, 46, 0.4)'
          }}
          >
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#c4940a',
            border: '2px solid #2f2f2e',
            borderRadius: '12px',
            padding: '0.5rem 1.5rem',
            fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
            fontWeight: '700',
            color: '#faf2d7',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            PLATFORM
          </div>

          {/* Header du contenu à l'intérieur du rectangle */}
          <motion.div
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(2rem, 4vh, 3rem)',
              marginTop: '1rem'
            }}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
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

          <div
            className="horizontal-flow"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(0.8rem, 1.5vw, 1.5rem)',
              marginTop: '2rem',
              flexWrap: 'wrap',
              width: '100%',
              overflow: 'hidden'
            }}
          >
            <motion.div
              style={{
                background: 'rgba(47, 47, 46, 0.12)',
                border: '2px solid rgba(47, 47, 46, 0.25)',
                borderRadius: '16px',
                padding: 'clamp(1.2rem, 2vw, 1.8rem)',
                flex: '1',
                minWidth: '180px',
                maxWidth: '250px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{
                transform: 'translateY(-4px) scale(1.01)',
                background: 'rgba(47, 47, 46, 0.12)',
                borderColor: 'rgba(47, 47, 46, 0.25)',
                boxShadow: '0 8px 24px rgba(47, 47, 46, 0.2)'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                fontWeight: '700',
                color: '#2f2f2e',
                marginBottom: '1.5rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                DATA SOURCES
              </h3>

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
            </motion.div>

            <motion.div
              variants={arrowVariants}
              transition={{ duration: 0.4, delay: 0.4 }}
              style={{ flexShrink: 0 }}
            >
              <ArrowIcon />
            </motion.div>

            <motion.div
              style={{
                background: 'rgba(47, 47, 46, 0.12)',
                border: '2px solid rgba(47, 47, 46, 0.25)',
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                flex: '1',
                minWidth: '280px',
                maxWidth: '450px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{
                transform: 'translateY(-4px) scale(1.01)',
                background: 'rgba(47, 47, 46, 0.12)',
                borderColor: 'rgba(47, 47, 46, 0.25)',
                boxShadow: '0 8px 24px rgba(47, 47, 46, 0.2)'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                fontWeight: '700',
                color: '#2f2f2e',
                marginBottom: '1.5rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.2'
              }}>
                CONTEXTUAL DOCUMENT<br />UNDERSTANDING PIPELINE
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
                      strokeWidth="0.4"
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
            </motion.div>

            <motion.div
              variants={arrowVariants}
              transition={{ duration: 0.4, delay: 0.6 }}
              style={{ flexShrink: 0 }}
            >
              <ArrowIcon />
            </motion.div>

            <motion.div
              style={{
                background: 'rgba(47, 47, 46, 0.12)',
                border: '2px solid rgba(47, 47, 46, 0.25)',
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                flex: '1',
                minWidth: '280px',
                maxWidth: '450px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{
                transform: 'translateY(-4px) scale(1.01)',
                background: 'rgba(47, 47, 46, 0.12)',
                borderColor: 'rgba(47, 47, 46, 0.25)',
                boxShadow: '0 8px 24px rgba(47, 47, 46, 0.2)'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                fontWeight: '700',
                color: '#2f2f2e',
                marginBottom: '1.5rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.2'
              }}>
                CONTEXTUAL<br />RAG AGENT
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
            </motion.div>

            <motion.div
              variants={arrowVariants}
              transition={{ duration: 0.4, delay: 0.8 }}
              style={{ flexShrink: 0 }}
            >
              <ArrowIcon />
            </motion.div>

            <motion.div
              style={{
                background: 'rgba(47, 47, 46, 0.12)',
                border: '2px solid rgba(47, 47, 46, 0.25)',
                borderRadius: '16px',
                padding: 'clamp(1.2rem, 2vw, 1.8rem)',
                flex: '1',
                minWidth: '180px',
                maxWidth: '250px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{
                transform: 'translateY(-4px) scale(1.01)',
                background: 'rgba(47, 47, 46, 0.12)',
                borderColor: 'rgba(47, 47, 46, 0.25)',
                boxShadow: '0 8px 24px rgba(47, 47, 46, 0.2)'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                fontWeight: '700',
                color: '#2f2f2e',
                marginBottom: '1.5rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.2'
              }}>
                SPECIALIZED<br />AGENTS BY DOMAIN
              </h3>

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
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
          .bento-container {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .bento-container.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          
          @media (max-width: 1200px) {
            .horizontal-flow > div {
              flex: 1 1 calc(50% - 1rem);
              min-width: 300px;
            }
          }
          
          @media (max-width: 900px) {
            .horizontal-flow {
              gap: 1rem;
            }
            .horizontal-flow > div {
              min-width: 250px;
              max-width: none;
            }
          }
          
          @media (max-width: 768px) {
            .horizontal-flow {
              flex-direction: column;
              align-items: center;
            }
            .horizontal-flow > div {
              max-width: 100% !important;
              width: 100%;
            }
            
            .bento-container {
              width: 98%;
              padding: clamp(2rem, 4vh, 3rem) clamp(1rem, 3vw, 2rem);
              border-radius: 2rem;
            }
          }
          
          @media (max-width: 480px) {
            .bento-container {
              border-radius: 1.5rem;
              border-width: 3px;
            }
          }
        `}</style>
    </section >
  );
};

export default RAGArchitectureDiagram;
