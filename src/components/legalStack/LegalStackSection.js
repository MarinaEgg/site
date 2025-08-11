import React, { useRef } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useInViewport } from '../../hooks/useInViewport';
import './LegalStackSection.css';
import { useTranslation } from 'react-i18next';

const LegalStackSection = () => {
  const sectionRef = useRef(null);
  const isVisible = useInViewport(sectionRef, false, { threshold: 0.2 });
  const { scrollY } = useViewportScroll();
  const { t } = useTranslation();
  
  // Effets parallax pour différents éléments
  const headerY = useTransform(scrollY, [0, 1000], [0, -25]);
  const benefitsY = useTransform(scrollY, [0, 1000], [0, 15]);
  const stackY = useTransform(scrollY, [0, 1000], [0, 30]);

  const benefits = [
    {
      title: "Connected to Your World",
      description: "We build AI agents exclusively for legal and defense — no gimmicks, just secure, usable workflows tailored to your enterprise, by a team with real experience in your field."
    },
    {
      title: "Solves Your Toughest Challenges",
      description: "From simple tasks to complex reasoning, we connect your documents, tools, and AI with ROI in mind — and we stay aligned with your mission."
    },
    {
      title: "From Complexity to Clarity",
      description: "We transform legal and technical complexity into clear, actionable outputs — with an experienced team that manages the project and stays by your side."
    },
    {
      title: "Real AI Engineering",
      description: "We build, develop, and deploy real AI systems. Whether from a simple agent in your Copilot Studio to a more complex AI using our custom chat interface, private API, and a vector database built for you — we deliver what works: fast, reliable, and integrated."
    }
  ];

const stackComponents = [
    {
      badge: "RAG",
      title: "Connect Your Internal Databases to a Large Model (RAG)",
      category: "DATA INTEGRATION",
      description: "We connect your case files, contracts, and legal databases directly to AI models. Your confidential data stays secure while you get instant answers from your entire knowledge base."
    },
    {
      badge: "Azure Studio",
      title: "Build AI Agents",
      category: "AI DEVELOPMENT",
      description: "We create AI agents using Microsoft Azure Studio that handle your specific legal workflows. Deploy in your office or cloud - your choice. Process sensitive documents with models that never leave your infrastructure."
    },
    {
      badge: "Custom Dev",
      title: "Build Custom Agents",
      category: "CUSTOM SOLUTIONS",
      description: "Need something specific? We build custom agents that integrate with your existing tools (case management, billing, document review). Everything runs on your servers for maximum confidentiality."
    },
    {
      badge: "API Connect",
      title: "Chatbot Interface & API Connectivity",
      category: "INTERFACE & APIs",
      description: "Ask questions in plain language, get instant answers from all your files. Auto-analyze contracts, process legal documents, assist with legal research. Works with your existing databases."
    },
    {
      badge: "AI Solutions",
      title: "Total AI Custom Solutions",
      category: "INTEGRATION",
      description: "Full AI integration with your practice. For sensitive work, we use local models (GPT OSS, Mistral) that never send data externally. Complete confidentiality guaranteed."
    },
    {
      badge: "Microsoft Fabric",
      title: "Microsoft Fabric Components",
      category: "DATA PLATFORM",
      description: "Unified data platform connecting all your sources - from case files to billing data. Real-time analytics, secure cloud storage, seamless integration with existing Microsoft tools."
    }
  ];

  // Fonction pour gérer le hover sans créer de rectangles
  const handleCardMouseEnter = (e) => {
    e.stopPropagation();
    const card = e.currentTarget;
    
    // Appliquer SEULEMENT les transformations et bordures
    card.style.setProperty('transform', 'translateY(-5px)', 'important');
    card.style.setProperty('box-shadow', '0 12px 40px rgba(0, 0, 0, 0.4)', 'important');
    card.style.setProperty('border-color', 'rgba(255, 255, 255, 0.25)', 'important');
    
    // FORCER la transparence complète
    card.style.setProperty('background', 'none', 'important');
    card.style.setProperty('background-color', 'transparent', 'important');
    card.style.setProperty('background-image', 'none', 'important');
    
    // FORCER tous les éléments enfants à rester transparents
    const allChildren = card.querySelectorAll('*');
    allChildren.forEach(child => {
      // Ne pas toucher aux éléments qui ont explicitement besoin d'un background
      if (!child.style.borderRadius || !child.style.borderRadius.includes('50%')) {
        child.style.setProperty('background', 'transparent', 'important');
        child.style.setProperty('background-color', 'transparent', 'important');
        child.style.setProperty('background-image', 'none', 'important');
        child.style.setProperty('box-shadow', 'none', 'important');
      }
    });
  };

  const handleCardMouseLeave = (e) => {
    e.stopPropagation();
    const card = e.currentTarget;
    
    // Remettre les styles de base
    card.style.setProperty('transform', 'translateY(0)', 'important');
    card.style.setProperty('box-shadow', 'none', 'important');
    card.style.setProperty('border-color', 'rgba(255, 255, 255, 0.15)', 'important');
    
    // Maintenir la transparence
    card.style.setProperty('background', 'none', 'important');
    card.style.setProperty('background-color', 'transparent', 'important');
    card.style.setProperty('background-image', 'none', 'important');
    
    // Garder les enfants transparents
    const allChildren = card.querySelectorAll('*');
    allChildren.forEach(child => {
      if (!child.style.borderRadius || !child.style.borderRadius.includes('50%')) {
        child.style.setProperty('background', 'transparent', 'important');
        child.style.setProperty('background-color', 'transparent', 'important');
        child.style.setProperty('background-image', 'none', 'important');
        child.style.setProperty('box-shadow', 'none', 'important');
      }
    });
  };

  // Fonction pour gérer le hover des composants stack
  const handleStackMouseEnter = (e) => {
    const element = e.currentTarget;
    element.style.setProperty('background', 'rgba(255, 255, 255, 0.1)', 'important');
    element.style.setProperty('border-color', 'rgba(255, 255, 255, 0.2)', 'important');
    
    // Forcer tous les enfants à rester transparents
    const allChildren = element.querySelectorAll('*');
    allChildren.forEach(child => {
      if (!child.matches('[style*="rgba(252, 233, 107"]')) { // Garder les badges
        child.style.setProperty('background', 'transparent', 'important');
        child.style.setProperty('background-color', 'transparent', 'important');
      }
    });
  };

  const handleStackMouseLeave = (e) => {
    const element = e.currentTarget;
    element.style.setProperty('background', 'rgba(255, 255, 255, 0.06)', 'important');
    element.style.setProperty('border-color', 'rgba(255, 255, 255, 0.1)', 'important');
  };

  return (
    <section 
      ref={sectionRef} 
      className={`legal-stack-section ${isVisible ? 'visible' : ''}`}
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: 'clamp(4rem, 8vh, 6rem) clamp(1rem, 3vw, 2rem)',
        backgroundColor: 'transparent',
        color: '#fafafa',
        position: 'relative',
        opacity: 1,
        visibility: 'visible'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          opacity: 1,
          visibility: 'visible'
        }}
      >
        {/* Hero Section */}
        <motion.div 
          style={{ 
            textAlign: 'center', 
            marginBottom: 'clamp(4rem, 8vh, 6rem)',
            y: headerY
          }}
        >
          <h3 
            style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              fontWeight: '600',
              color: 'rgba(250, 250, 250, 0.8)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              textDecoration: 'underline',
              background: 'transparent'
            }}
          >
            {t('legalStack.subtitle')}
          </h3>
          
          <h2 
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '900',
              color: '#fafafa',
              lineHeight: '1.1',
              marginBottom: '2rem',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
              background: 'transparent'
            }}
          >
            {t('legalStack.title')}
          </h2>

          <p 
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
              color: 'rgba(250, 250, 250, 0.9)',
              lineHeight: '1.6',
              maxWidth: '80ch',
              margin: '0 auto',
              background: 'transparent'
            }}
          >
            {t('legalStack.description')}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: 'clamp(6rem, 10vh, 8rem)',
            y: benefitsY
          }}
        >
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              style={{
                padding: 'clamp(1.8rem, 3vw, 2.4rem)',
                background: 'none',
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                cursor: 'default',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: 'none'
              }}
              className="benefit-card"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  background: 'transparent',
                  backgroundColor: 'transparent'
                }}
              >
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {/* Icône SVG simple sans background */}
                  <svg 
                    width="24" 
                    height="24"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    style={{ 
                      color: '#fafafa',
                      background: 'transparent',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <circle cx="12" cy="12" r="10" style={{ background: 'transparent' }}/>
                    <path d="M8 12l2 2 4-4" style={{ background: 'transparent' }}/>
                  </svg>
                </div>
              </div>
              
              <div style={{ 
                flex: 1, 
                textAlign: 'center',
                background: 'transparent',
                backgroundColor: 'transparent'
              }}>
                <h3 
                  style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                    fontWeight: '700',
                    color: '#fafafa',
                    marginBottom: '1.2rem',
                    lineHeight: '1.3',
                    background: 'transparent',
                    backgroundColor: 'transparent'
                  }}
                >
                  {benefit.title}
                </h3>
                
                <p 
                  style={{
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                    color: 'rgba(250, 250, 250, 0.85)',
                    lineHeight: '1.6',
                    textAlign: 'left',
                    margin: 0,
                    background: 'transparent',
                    backgroundColor: 'transparent'
                  }}
                >
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Technical Stack Section */}
        <motion.div 
          style={{ 
            marginBottom: '4rem',
            y: stackY
          }}
        >
          <h3 
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '700',
              color: '#fafafa',
              textAlign: 'center',
              marginBottom: 'clamp(3rem, 6vh, 4rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: 'transparent'
            }}
          >
            {t('legalStack.stackTitle')}
          </h3>

          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.5rem, 3vh, 2rem)',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {stackComponents.map((component, index) => (
              <div 
                key={index}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  background: 'none',
                  backgroundColor: 'transparent',
                  backgroundImage: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  boxShadow: 'none'
                }}
                onMouseEnter={handleStackMouseEnter}
                onMouseLeave={handleStackMouseLeave}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '1.5rem',
                  background: 'transparent',
                  backgroundColor: 'transparent'
                }}>
                  <div 
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(252, 233, 107, 0.2)',
                      backgroundColor: 'rgba(252, 233, 107, 0.2)',
                      border: '1px solid rgba(252, 233, 107, 0.4)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: '#fce96b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                      marginTop: '0.2rem'
                    }}
                  >
                    {component.badge}
                  </div>
                  
                  <div style={{ 
                    flex: 1,
                    background: 'transparent',
                    backgroundColor: 'transparent'
                  }}>
                    <div 
                      style={{
                        fontSize: '0.8rem',
                        color: 'rgba(250, 250, 250, 0.6)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        background: 'transparent',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {component.category}
                    </div>
                    
                    <h4 
                      style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        fontWeight: '700',
                        color: '#fafafa',
                        marginBottom: '0.8rem',
                        lineHeight: '1.3',
                        background: 'transparent',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {component.title}
                    </h4>
                    
                    <p 
                      style={{
                        fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                        color: 'rgba(250, 250, 250, 0.8)',
                        lineHeight: '1.5',
                        margin: 0,
                        background: 'transparent',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {component.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LegalStackSection;
