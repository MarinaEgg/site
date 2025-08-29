import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NOGLabHero } from './NOGLabHero';
import './NOGLabSection.css';

const useStyles = makeStyles((theme) => ({
    heroSection: {
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        '@media (max-width: 768px)': {
            minHeight: 'calc(100vh - 70px)',
        },
    },
    mainContentTitle: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: '700',
        fontSize: 'clamp(2rem, 5.2vw, 3.6rem)',
        lineHeight: '1.1',
        color: '#ffffff',
        textAlign: "center",
        marginBottom: '3rem',
        "@media (max-width: 768px)": {
            textAlign: "center"
        }
    }
}));

const NOGLabSection = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      {/* Hero Section - Utilise le nouveau composant NOGLabHero */}
      <section className={classes.heroSection}>
        <NOGLabHero />
      </section>

      {/* Content Section - Garde le contenu existant du Lab */}
      <div className="noglab-section">
        <div className="noglab-container">
          <Typography variant="h1" component="h1" className={classes.mainContentTitle}>
            {t('noglab.title')}
          </Typography>
          
          <p className="noglab-body-text">
            {t('noglab.intro1')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.intro2')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.intro3')}
          </p>

          {/* Section Legitimacy */}
          <div className="noglab-section-subtitle">
            <span className="noglab-section-subtitle-text">{t('noglab.legitimacy.title')}</span>
          </div>
          
          <p className="noglab-body-text">
            {t('noglab.legitimacy.paragraph1')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.legitimacy.paragraph2')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.legitimacy.paragraph3')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.legitimacy.paragraph4')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.legitimacy.paragraph5')}
          </p>

          {/* Section AI for Everyone */}
          <div className="noglab-section-subtitle">
            <span className="noglab-section-subtitle-text">{t('noglab.aiForEveryone.title')}</span>
          </div>
          
          <p className="noglab-body-text">
            {t('noglab.aiForEveryone.paragraph1')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.aiForEveryone.paragraph2')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.aiForEveryone.paragraph3')}
          </p>

          {/* Section Principles */}
          <div className="noglab-section-subtitle">
            <span className="noglab-section-subtitle-text">{t('noglab.principles.title')}</span>
          </div>
          
          <div className="noglab-principle-title">{t('noglab.principles.explicability.title')}</div>
          <p className="noglab-body-text">
            {t('noglab.principles.explicability.description')}
          </p>
          
          <div className="noglab-principle-title">{t('noglab.principles.accessibility.title')}</div>
          <p className="noglab-body-text">
            {t('noglab.principles.accessibility.description')}
          </p>
          
          <div className="noglab-principle-title">{t('noglab.principles.recall.title')}</div>
          <p className="noglab-body-text">
            {t('noglab.principles.recall.description')}
          </p>
          
          <div className="noglab-principle-title">{t('noglab.principles.speed.title')}</div>
          <p className="noglab-body-text">
            {t('noglab.principles.speed.description')}
          </p>

          {/* Section Growth */}
          <div className="noglab-section-subtitle">
            <span className="noglab-section-subtitle-text">{t('noglab.growth.title')}</span>
          </div>
          
          <p className="noglab-body-text">
            {t('noglab.growth.paragraph1')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.growth.paragraph2')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.growth.paragraph3')}
          </p>
          
          <p className="noglab-body-text">
            {t('noglab.growth.paragraph4')}
          </p>

          {/* Section Measure */}
          <div className="noglab-section-subtitle">
            <span className="noglab-section-subtitle-text">{t('noglab.measure.title')}</span>
          </div>
          
          <p className="noglab-body-text">
            {t('noglab.measure.description')}
          </p>

          {/* Section Partners */}
          <div className="noglab-section-subtitle">
            <span className="noglab-section-subtitle-text">{t('noglab.partners.title')}</span>
          </div>
          
          <p className="noglab-body-text">
            {t('noglab.partners.description')}
            <span className="noglab-design-partner-link">{t('noglab.partners.link')}</span>
          </p>

          {/* EggOn CTA Section */}
          <div className="eggon-cta-section">
            <div className="eggon-cta-content">
              <p className="eggon-cta-text">
                EggOn vous accompagne partout. La contextualisation RAG combinée aux agents IA spécialisés vous apporte un ROI rapidement
              </p>
              <button className="eggon-cta-button">
                → Parler à EggOn →
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default NOGLabSection;
