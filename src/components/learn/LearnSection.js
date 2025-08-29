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

  const renderCourseButtons = (status) => {
    if (status === 'completed') {
      return (
        <>
          <button className="course-btn completed">
            {t('academie.buttons.completed') || 'Terminé'}
          </button>
          <button className="course-btn catch-up">
            {t('academie.buttons.catchUp') || 'Rattrapage'}
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="course-btn ongoing">
            {t('academie.buttons.ongoing') || 'En cours'}
          </button>
          <button className="course-btn enroll">
            {t('academie.buttons.enroll') || 'S\'inscrire'}
          </button>
        </>
      );
    }
  };



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
                    <div className="course-actions">
                      {renderCourseButtons(course.status)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>


        </div>
      </div>
    </>
  );
};

export default LearnSection;
