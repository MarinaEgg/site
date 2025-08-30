import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './AgentCard.css';

const AgentCard = ({ 
  title, 
  description, 
  onQuoteRequest,
  className = '' 
}) => {
  const { t } = useTranslation();
  const [userInput, setUserInput] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');
  
  // Animation machine à écrire pour le placeholder
  const typewriterText = "j'ai besoin que mon agent...";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= typewriterText.length) {
        setPlaceholderText(typewriterText.slice(0, currentIndex));
        currentIndex++;
      } else {
        // Recommencer l'animation après une pause
        setTimeout(() => {
          currentIndex = 0;
          setPlaceholderText('');
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim() || !clientEmail.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Appel API pour envoyer la demande de devis
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentTitle: title,
          agentDescription: description,
          userRequirement: userInput.trim(),
          clientEmail: clientEmail.trim(),
          timestamp: new Date().toISOString(),
          email: 'm.jacquet@eggon.fr'
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setUserInput('');
        setClientEmail('');
        
        // Callback optionnel pour le parent
        if (onQuoteRequest) {
          onQuoteRequest({
            agentTitle: title,
            userRequirement: userInput.trim(),
            clientEmail: clientEmail.trim()
          });
        }
        
        // Masquer le message de succès après 3 secondes
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        throw new Error('Erreur lors de l\'envoi de la demande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className={`agent-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Partie descriptive existante */}
      <div className="agent-card-header">
        <h3 className="agent-card-title">{title}</h3>
        <p className="agent-card-description">{description}</p>
      </div>

      {/* Nouvelle section de personnalisation */}
      <div className="agent-card-customization">
        <h4 className="customization-title">
          {t('agentCard.customTitle', 'Description de l\'agent souhaité si différent')}
        </h4>
        
        <form onSubmit={handleSubmit} className="quote-form">
          <div className="input-container">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={placeholderText}
              className="user-input"
              rows="3"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="input-container">
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder={t('agentCard.emailPlaceholder', 'Votre adresse email')}
              className="user-input email-input"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="privacy-notice">
            <p className="privacy-text">
              {t('agentCard.privacyNotice', 'Nous n\'enverrons pas d\'emails commerciaux, simplement votre devis personnalisé.')}
            </p>
          </div>
          
          <button 
            type="submit" 
            className="quote-button"
            disabled={isSubmitting || !userInput.trim() || !clientEmail.trim()}
          >
            <div className="button-content">
              <span className="arrow-left">→</span>
              <span className="button-text">
                {isSubmitting 
                  ? t('agentCard.sending', 'Envoi en cours...') 
                  : t('agentCard.requestQuote', 'Demande devis')
                }
                <span className="arrow-right">→</span>
              </span>
            </div>
          </button>
        </form>

        {/* Message de succès */}
        {showSuccess && (
          <motion.div 
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            ✓ {t('agentCard.successMessage', 'Votre demande a été envoyée')}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AgentCard;