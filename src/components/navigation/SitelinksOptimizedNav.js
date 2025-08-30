// src/components/navigation/SitelinksOptimizedNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sitelinksNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
      padding: '8px 0',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderBottomColor: 'var(--eggon-primary)',
        color: 'var(--eggon-primary)',
      }
    }
  },
  linkTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '4px',
  },
  linkDescription: {
    fontSize: '0.9rem',
    opacity: 0.8,
    lineHeight: 1.4,
  }
}));

export const SitelinksOptimizedNav = () => {
  const classes = useStyles();

  const navigationItems = [
    {
      path: '/',
      title: 'AI Platform',
      description: 'Explainable AI governance platform for enterprise deployment',
      keywords: 'ai platform, governance, enterprise, orchestrator, agents'
    },
    {
      path: '/nog-lab',
      title: 'NOG Lab',
      description: 'Innovation laboratory for explainable AI research and development',
      keywords: 'innovation, laboratory, research, development, nog lab'
    },
    {
      path: '/learn',
      title: 'Learn AI',
      description: 'AI training and certification for legal and business professionals',
      keywords: 'training, education, academy, certification, learn ai'
    },
    {
      path: '/contact',
      title: 'Contact',
      description: 'Get in touch with EggOn Technology experts',
      keywords: 'contact, support, experts, get in touch'
    }
  ];

  return (
    <nav 
      className={classes.sitelinksNav}
      itemScope 
      itemType="https://schema.org/SiteNavigationElement"
      aria-label="Main Navigation"
    >
      {navigationItems.map((item, index) => (
        <Link 
          key={item.path}
          to={item.path}
          itemProp="url"
          title={item.description}
          data-keywords={item.keywords}
        >
          <div 
            itemScope 
            itemType="https://schema.org/WebPage"
            itemProp="about"
          >
            <div className={classes.linkTitle} itemProp="name">
              {item.title}
            </div>
            <div className={classes.linkDescription} itemProp="description">
              {item.description}
            </div>
          </div>
        </Link>
      ))}
    </nav>
  );
};

// src/components/navigation/BreadcrumbsOptimized.js
import { Breadcrumbs, Typography } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';

export const BreadcrumbsOptimized = ({ currentPage, items = [] }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      style={{ margin: '20px 0', color: 'white' }}
    >
      <Link
        to="/"
        itemProp="itemListElement"
        itemScope
        itemType="https://schema.org/ListItem"
        style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}
      >
        <span itemProp="name">Home</span>
        <meta itemProp="position" content="1" />
      </Link>
      
      {items.map((item, index) => (
        <Link
          key={item.path}
          to={item.path}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}
        >
          <span itemProp="name">{item.name}</span>
          <meta itemProp="position" content={index + 2} />
        </Link>
      ))}
      
      <Typography 
        color="inherit"
        itemProp="itemListElement"
        itemScope
        itemType="https://schema.org/ListItem"
      >
        <span itemProp="name">{currentPage}</span>
        <meta itemProp="position" content={items.length + 2} />
      </Typography>
    </Breadcrumbs>
  );
};

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
