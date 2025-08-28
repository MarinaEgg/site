// ... code existant ...

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
