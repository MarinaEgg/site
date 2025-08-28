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
      <div style={{ 
        color: 'white', 
        fontSize: '2rem', 
        textAlign: 'center',
        padding: '2rem',
        background: '#0000ff',
        borderRadius: '10px',
        margin: '2rem'
      }}>
        🔥 SECTION WHY EGGON - JE SUIS VISIBLE ! 🔥
      </div>

      <div
        ref={bentoRef}
        className="bento-container rag-content-container visible"
        style={{
          background: '#faf2d7',
          borderRadius: '3rem',
          border: '4px solid #2f2f2e',
          boxShadow: '0 20px 60px rgba(47, 47, 46, 0.3)',
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
              POURQUOI EGGON
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
              LIBÉREZ LA PUISSANCE DE L'IA CONTEXTUELLE
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
              Exploitez une plateforme d'IA de pointe avec une expertise en droit et finance pour générer des performances mesurables et des gains opérationnels.
            </p>
          </div>

          {/* Contenu simplifié pour debug */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <div style={{
              background: 'rgba(47, 47, 46, 0.08)',
              border: '1px solid rgba(47, 47, 46, 0.15)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#2f2f2e', marginBottom: '1rem' }}>
                Expertise intégrée au domaine
              </h4>
              <p style={{ color: '#2f2f2e', fontSize: '0.9rem' }}>
                IA, agents IA et workflows conçus par des experts issus de la legaltech et de la fintech.
              </p>
            </div>

            <div style={{
              background: 'rgba(47, 47, 46, 0.08)',
              border: '1px solid rgba(47, 47, 46, 0.15)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#2f2f2e', marginBottom: '1rem' }}>
                Contextualisation de votre IA
              </h4>
              <p style={{ color: '#2f2f2e', fontSize: '0.9rem' }}>
                Architecture RAG spécialisée par domaine réduisant les hallucinations.
              </p>
            </div>

            <div style={{
              background: 'rgba(47, 47, 46, 0.08)',
              border: '1px solid rgba(47, 47, 46, 0.15)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#2f2f2e', marginBottom: '1rem' }}>
                Du pilote à la production
              </h4>
              <p style={{ color: '#2f2f2e', fontSize: '0.9rem' }}>
                Accompagnement opérationnel et mise en production à vos côtés.
              </p>
            </div>

            <div style={{
              background: 'rgba(47, 47, 46, 0.08)',
              border: '1px solid rgba(47, 47, 46, 0.15)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#2f2f2e', marginBottom: '1rem' }}>
                Sécurité et gouvernance
              </h4>
              <p style={{ color: '#2f2f2e', fontSize: '0.9rem' }}>
                Conformité et traçabilité intégrées — SOC 2, contrôle d'accès par rôle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RAGArchitectureDiagram;
