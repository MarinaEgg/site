import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { LearnHero } from './LearnHero';
import './LearnSection.css';

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
    academySection: {
        paddingTop: '0',
    },
}));

const LearnSection = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  // Course data structure
  const coursesList = [
    {
      id: 'intro-ia',
      category: t('academie.categories.foundations') || 'Fondamentaux',
      title: t('academie.courses.foundations.introIA') || 'Introduction à l\'IA',
      status: 'completed'
    },
    {
      id: 'limites-llm',
      category: t('academie.categories.foundations') || 'Fondamentaux',
      title: t('academie.courses.foundations.limitesLLM') || 'Limites des LLM',
      status: 'completed'
    },
    {
      id: 'depasser-limites',
      category: t('academie.categories.foundations') || 'Fondamentaux',
      title: t('academie.courses.foundations.depasserLimites') || 'Dépasser les limites',
      status: 'completed'
    },
    {
      id: 'prompts-initiation',
      category: t('academie.categories.promptEngineering') || 'Prompt Engineering',
      title: t('academie.courses.promptEngineering.promptsInitiation') || 'Initiation aux prompts',
      status: 'completed'
    },
    {
      id: 'prompts-juridiques',
      category: t('academie.categories.promptEngineering') || 'Prompt Engineering',
      title: t('academie.courses.promptEngineering.promptsJuridiques') || 'Prompts juridiques',
      status: 'completed'
    },
    {
      id: 'prompts-systemes',
      category: t('academie.categories.promptEngineering') || 'Prompt Engineering',
      title: t('academie.courses.promptEngineering.promptsSystemes') || 'Prompts systèmes',
      status: 'completed'
    },
    {
      id: 'affaire-weber',
      category: t('academie.categories.caseStudies') || 'Études de cas',
      title: t('academie.courses.caseStudies.affaireWeber') || 'Affaire Weber',
      status: 'completed'
    },
    {
      id: 'ai-risk-management',
      category: t('academie.categories.securityGovernance') || 'Sécurité & Gouvernance',
      title: t('academie.courses.securityGovernance.aiRiskManagement') || 'Gestion des risques IA',
      status: 'ongoing'
    },
    {
      id: 'ai-act-compliance',
      category: t('academie.categories.securityGovernance') || 'Sécurité & Gouvernance',
      title: t('academie.courses.securityGovernance.aiActCompliance') || 'Conformité AI Act',
      status: 'ongoing'
    },
    {
      id: 'auditability-explainability',
      category: t('academie.categories.securityGovernance') || 'Sécurité & Gouvernance',
      title: t('academie.courses.securityGovernance.auditabilityExplainability') || 'Auditabilité & Explicabilité',
      status: 'ongoing'
    }
  ];



  const renderSocialIcons = () => (
    <div className="social-icons">
      {/* Email */}
      <div className="social-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>

      {/* Instagram */}
      <div className="social-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </div>

      {/* More options (central button with special styling) */}
      <div className="social-icon more">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1"/>
          <circle cx="19" cy="12" r="1"/>
          <circle cx="5" cy="12" r="1"/>
        </svg>
      </div>

      {/* Twitter */}
      <div className="social-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
      </div>

      {/* TikTok */}
      <div className="social-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
        </svg>
      </div>
    </div>
  );

  // Group courses by category
  const groupedCourses = coursesList.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {});

  return (
    <>
      {/* Hero Section */}
      <section className={classes.heroSection}>
        <LearnHero />
      </section>

      {/* Content Section */}
      <div className={`learn-section ${classes.academySection}`}>
        <div className="learn-container">
          
          {/* Header Section */}
          <div className="academie-header">
            <div className="academie-small-title">
              {t('academie.sectionLabel') || 'ACADÉMIE'}
            </div>
            <h1 className="academie-main-title">
              {t('academie.mainTitle') || 'IA ACADÉMIE'}
            </h1>
          </div>

          {/* Two Column Introduction */}
          <div className="academie-intro-container">
            <div className="academie-intro-text">
              {t('academie.intro.left') || 'Découvrez notre programme complet de formation à l\'intelligence artificielle. Des fondamentaux aux applications avancées, maîtrisez les outils et concepts essentiels pour réussir dans le monde de l\'IA.'}
            </div>
            <div className="academie-intro-text">
              {t('academie.intro.right') || 'Notre approche pédagogique combine théorie et pratique, avec des études de cas réels et des projets concrets. Rejoignez une communauté d\'apprenants passionnés et développez vos compétences IA.'}
            </div>
          </div>

          {/* Course Roadmap */}
          <div className="academie-roadmap">
            {Object.entries(groupedCourses).map(([category, courses]) => (
              <div key={category} className="course-category">
                <h2 className="category-header">
                  {category}
                </h2>
                {courses.map((course, index) => (
                  <div key={course.id} className="course-item">
                    <div className="course-content">
                      <span className="course-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="course-title">
                        {course.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Social Media Section */}
          <div className="academie-social-section">
            {renderSocialIcons()}
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnSection;
