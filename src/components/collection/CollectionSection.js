import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CollectionSection.css';
import { useTranslation } from 'react-i18next';

const legalPrompts = [
  // LEGAL
  {
    title: "AI Contract Analysis",
    context: "Legal / Risk Review",
    body: "Analyze a commercial contract and flag clauses that present legal risk (e.g. indemnities, termination, governing law). Output a summary with explanations and suggestions."
  },
  {
    title: "AI Case Law Research",
    context: "Legal / Case Search",
    body: "Search and summarize case law relevant to a given legal question, including links and jurisdiction-specific reasoning."
  },

  // PRODUCTIVITY
  {
    title: "AI Meeting Prep Agent",
    context: "Productivity / Team Support",
    body: "Prepare structured meeting packs for internal teams including agenda, links, previous action items, and a summary of relevant updates."
  },
  {
    title: "AI Wiki Builder",
    context: "Internal Knowledge / Documentation",
    body: "Build and update a private internal wiki by scanning documents and internal conversations. Automatically tag and categorize entries."
  },

  // COMPLIANCE
  {
    title: "Audit Trail Review Agent",
    context: "Compliance / Cybersecurity",
    body: "Analyze audit logs and identify anomalies or risks. Generate compliance-ready summaries and flag irregularities."
  },
  {
    title: "Supplier Compliance Monitor",
    context: "Compliance / Procurement",
    body: "Track supplier certifications and regulatory documents. Alert on missing files, expired documents, or inconsistent legal status."
  },

  // BUSINESS OPS
  {
    title: "AI Quotation Agent",
    context: "Sales / B2B Quoting",
    body: "Generate and send client-ready professional quotations based on product configurations, pricing rules, and customer data."
  },
  {
    title: "Client Onboarding Agent",
    context: "Operations / Customer Management",
    body: "Automate the onboarding of new clients by generating checklists, requesting documents, verifying completeness, and storing profiles."
  },

  // STRATEGY / R&D
  {
    title: "Tech Intelligence Agent",
    context: "R&D / Strategy",
    body: "Every week, summarize key news and trends in a selected technology sector, including key sources, highlights, and regulatory updates."
  },

  // PUBLIC SECTOR / TENDERS
  {
    title: "RFP Drafting Agent",
    context: "Public Sector / Tenders",
    body: "Assist teams in answering public RFPs by drafting structured responses using past documents and regulatory templates."
  },

  // ADDITIONAL
  {
    title: "ESG Compliance Agent",
    context: "Sustainability / Governance",
    body: "Monitor environmental, social, and governance criteria across suppliers and internal reports. Alert on non-compliance and prepare ESG audit summaries."
  },
  {
    title: "Data Privacy Audit Agent",
    context: "Legal / GDPR",
    body: "Review internal processes for data privacy compliance (GDPR/CCPA). Generate a report on data usage, consent collection, and breach risk exposure."
  }
];

const CollectionSection = () => {
  const sectionRef = useRef(null);
  // Remplace useId() par useState pour React 16
  const [uniqueId] = useState(() => `collection-${Math.random().toString(36).substr(2, 9)}`);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [editedPrompt, setEditedPrompt] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleCardClick = (prompt) => {
    setSelectedPrompt(prompt);
    setEditedPrompt(prompt.body);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      setSelectedPrompt(null);
      setEditedPrompt('');
    }, 300);
  };

  const handleSubmit = () => {
    // Save the modified prompt
    console.log('Modified prompt:', editedPrompt);
    
    // Redirect to hub
    window.location.href = '/hub'; // Adjust URL according to your routing
    
    handleCloseDialog();
  };

  const PromptIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      className="prompt-icon"
    >
      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
    </svg>
  );

  return (
    <>
      <section ref={sectionRef} className="collection-section">
        <div className="collection-content">
          <div className="collection-header">
            <h3 className="section-label">COLLECTION</h3>
            
            <h2 className="collection-title">
              {t('collection.title')}
            </h2>

            <p className="collection-intro">
              {t('collection.subtitle')}
            </p>

            <button className="early-access-button">
              <div className="button-content">
                <span className="arrow-left">→</span>
                <span className="button-text">
                  {t('collection.cta')}
                  <span className="arrow-right">→</span>
                </span>
              </div>
            </button>
          </div>

          <div className="cards-container">
            <div className="cards-row top">
              {legalPrompts.slice(0, 6).map((prompt, index) => (
                <div 
                  key={index} 
                  className="prompt-card"
                  onClick={() => handleCardClick(prompt)}
                >
                  <div className="card-context">{prompt.context}</div>
                  <h3 className="card-title">{prompt.title}</h3>
                  <div className="card-body">{prompt.body}</div>
                </div>
              ))}
            </div>

            {/* Time Indicator */}
            <div className="time-indicator">
              <div className="year-text">2025</div>
              <div className="last-update-text">last update</div>
            </div>

            <div className="cards-row bottom">
              {legalPrompts.slice(6, 12).map((prompt, index) => (
                <div 
                  key={index} 
                  className="prompt-card"
                  onClick={() => handleCardClick(prompt)}
                >
                  <div className="card-context">{prompt.context}</div>
                  <h3 className="card-title">{prompt.title}</h3>
                  <div className="card-body">{prompt.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Section */}
          <div className="editorial-section">
            <div className="editorial-line">
              <span className="editorial-title">WHAT ARE AGENTS?</span>
            </div>
            
            <div className="editorial-content">
              <p>
                The "Agent" can be defined in several ways. Some customers define agents as fully autonomous systems that operate independently over extended periods, using various tools to accomplish complex tasks. 
                Others use the term to describe more prescriptive implementations that follow predefined workflows. 
                At EggOn, we categorize all these variations as agentic systems, but we draw an important architectural distinction between workflows and agents:
              </p>
              <p>
                - Workflows are systems where LLMs and tools are orchestrated through predefined code paths.
                - Agents, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks.
              </p>
              <p>
                When building applications with LLMs, we recommend starting with the simplest possible solution and only increasing complexity when necessary. 
                In many cases, this means not building agentic systems at all. Often, optimizing single LLM calls with retrieval and in-context examples provides sufficient performance.
                When more complexity is warranted, workflows offer predictability and consistency for well-defined tasks, while agents are better suited for scenarios that require flexibility and model-driven decision-making at scale.

                Let our AI engineers guide you toward the most efficient architecture—and deliver the right system, in production, for your needs.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="benefits-section">
            <div className="benefits-title-line">
              <span className="benefits-title">BENEFITS FOR HOLDERS</span>
            </div>
            
            <div className="benefits-list">
              <div className="benefits-item">
                <div className="benefit-icon-circle">
                  <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <span>Contribute to the evolution of legal prompting strategies and frameworks</span>
              </div>
              <div className="benefits-item">
                <div className="benefit-icon-circle">
                  <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                    <circle cx="16" cy="11" r="3"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  </svg>
                </div>
                <span>Access a free hub for share prompts and work for transparency</span>
              </div>
              <div className="benefits-item">
                <div className="benefit-icon-circle">
                  <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7A5 5 0 0 1 17 7V11"/>
                  </svg>
                </div>
                <span>Create your prompts in private and keep your strategy</span>
              </div>
              <div className="benefits-item">
                <div className="benefit-icon-circle">
                  <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
                  </svg>
                </div>
                <span>Enjoy early access to new prompt collections, the legal agents will coming soon</span>
              </div>
              <div className="benefits-item">
                <div className="benefit-icon-circle">
                  <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2V6"/>
                    <path d="M12 18V22"/>
                    <path d="M4.93 4.93L7.76 7.76"/>
                    <path d="M16.24 16.24L19.07 19.07"/>
                    <path d="M2 12H6"/>
                    <path d="M18 12H22"/>
                    <path d="M4.93 19.07L7.76 16.24"/>
                    <path d="M16.24 7.76L19.07 4.93"/>
                  </svg>
                </div>
                <span>Unlock progressive roadmap features, including legal model, multiple integrations with legaltechs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Dialog with animation */}
        <AnimatePresence>
          {isDialogOpen && selectedPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="modal-overlay"
              onClick={handleCloseDialog}
            >
              <motion.div
                initial={{ 
                  opacity: 0,
                  scale: 0.3,
                  x: '-50%',
                  y: '-50%'
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.3,
                  x: '-50%',
                  y: '-50%'
                }}
                transition={{ 
                  type: 'spring', 
                  bounce: 0.05, 
                  duration: 0.4 
                }}
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div className="modal-title-section">
                    <div className="modal-context">
                      {selectedPrompt.context}
                    </div>
                    <h2 className="modal-title">
                      {selectedPrompt.title}
                    </h2>
                  </div>
                  <button
                    className="close-button"
                    onClick={handleCloseDialog}
                    aria-label="close"
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="prompt-textarea-container">
                    <PromptIcon />
                    <textarea
                      className="prompt-textarea"
                      value={editedPrompt}
                      onChange={(e) => setEditedPrompt(e.target.value)}
                      placeholder="Modifiez votre prompt ici..."
                      autoFocus
                    />
                  </div>
                  
                  <div className="modal-actions">
                    <button
                      className="action-button cancel-button"
                      onClick={handleCloseDialog}
                    >
                      Annuler
                    </button>
                    <button
                      className="action-button submit-button"
                      onClick={handleSubmit}
                    >
                      Submit →
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

// Export par défaut pour que l'import fonctionne
export default CollectionSection;
