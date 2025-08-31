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

