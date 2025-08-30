import React from 'react';
import AgentCard from './AgentCard';
import './AgentCard.css';

// Exemple d'utilisation du composant AgentCard
const AgentCardExample = () => {
  
  // Fonction de callback pour gérer les demandes de devis
  const handleQuoteRequest = (data) => {
    console.log('Nouvelle demande de devis reçue:', data);
    console.log('Email client:', data.clientEmail);
    console.log('Agent demandé:', data.agentTitle);
    console.log('Besoins:', data.userRequirement);
    // Ici vous pouvez ajouter d'autres actions :
    // - Analytics tracking
    // - Notification interne
    // - Redirection vers une page de confirmation
  };

  // Données d'exemple pour les agents
  const exampleAgents = [
    {
      title: "Agent Juridique Spécialisé",
      description: "Analyse automatisée de contrats, recherche jurisprudentielle et conseil juridique personnalisé pour votre domaine d'expertise. Intégration avec vos bases documentaires existantes."
    },
    {
      title: "Agent Financier Intelligent", 
      description: "Analyse de risques en temps réel, reporting automatisé et aide à la décision financière basée sur vos données métier et les tendances du marché."
    },
    {
      title: "Agent Conformité Réglementaire",
      description: "Surveillance réglementaire continue, audit automatisé et mise en conformité selon votre secteur d'activité. Alertes proactives sur les changements réglementaires."
    }
  ];

  return (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: '#1a1a1a', 
      minHeight: '100vh',
      color: '#fafafa'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto' 
      }}>
        
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '4rem' 
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            color: '#fafafa'
          }}>
            Agents IA Personnalisables
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(250, 250, 250, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Décrivez vos besoins spécifiques et obtenez un devis personnalisé pour votre agent IA sur mesure.
          </p>
        </div>

        {/* Grille des cartes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          justifyItems: 'center'
        }}>
          {exampleAgents.map((agent, index) => (
            <AgentCard
              key={index}
              title={agent.title}
              description={agent.description}
              onQuoteRequest={handleQuoteRequest}
            />
          ))}
        </div>

        {/* Section d'information */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ 
            color: '#fce96b', 
            marginBottom: '1rem' 
          }}>
            Comment ça marche ?
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <div>
              <strong style={{ color: '#fafafa' }}>1. Choisissez votre agent</strong>
              <p style={{ color: 'rgba(250, 250, 250, 0.8)', margin: '0.5rem 0 0 0' }}>
                Sélectionnez le type d'agent qui correspond à vos besoins métier.
              </p>
            </div>
            <div>
              <strong style={{ color: '#fafafa' }}>2. Décrivez vos besoins</strong>
              <p style={{ color: 'rgba(250, 250, 250, 0.8)', margin: '0.5rem 0 0 0' }}>
                Précisez vos exigences spécifiques dans le champ de texte.
              </p>
            </div>
            <div>
              <strong style={{ color: '#fafafa' }}>3. Recevez votre devis</strong>
              <p style={{ color: 'rgba(250, 250, 250, 0.8)', margin: '0.5rem 0 0 0' }}>
                Notre équipe vous contacte avec une proposition personnalisée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCardExample;