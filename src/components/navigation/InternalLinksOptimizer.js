// src/components/navigation/InternalLinksOptimizer.js
// Composant pour ajouter des liens internes contextuels dans le contenu

export const InternalLinksOptimizer = ({ children, currentPage }) => {
  const linkSuggestions = {
    'home': [
      { text: 'NOG Lab', path: '/nog-lab', context: 'innovation laboratory' },
      { text: 'Learn AI', path: '/learn', context: 'AI training programs' },
      { text: 'Contact us', path: '/contact', context: 'get expert consultation' }
    ],
    'nog-lab': [
      { text: 'AI Platform', path: '/', context: 'main platform features' },
      { text: 'Learn more', path: '/learn', context: 'training and certification' },
      { text: 'Contact our team', path: '/contact', context: 'discuss your project' }
    ],
    'learn': [
      { text: 'NOG Lab research', path: '/nog-lab', context: 'innovation projects' },
      { text: 'AI Platform', path: '/', context: 'practical applications' },
      { text: 'Get started', path: '/contact', context: 'begin your AI journey' }
    ],
    'contact': [
      { text: 'Our platform', path: '/', context: 'platform capabilities' },
      { text: 'Innovation lab', path: '/nog-lab', context: 'research projects' },
      { text: 'Training programs', path: '/learn', context: 'education offerings' }
    ]
  };

  return (
    <div>
      {children}
      
      {/* Section de liens contextuels */}
      {linkSuggestions[currentPage] && (
        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          backgroundColor: 'rgba(255,255,153,0.1)',
          borderRadius: '8px'
        }}>
          <Typography variant="h6" style={{ marginBottom: '16px', color: 'var(--eggon-primary)' }}>
            Explore More
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {linkSuggestions[currentPage].map((link, index) => (
              <Link
                key={index}
                to={link.path}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontWeight: 600 }}>{link.text}</span>
                <span style={{ opacity: 0.8, marginLeft: '8px' }}>— {link.context}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
