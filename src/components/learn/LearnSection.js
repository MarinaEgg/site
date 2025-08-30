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

  const handleCourseAction = async (courseTitle, actionType) => {
    try {
      console.log(`Action ${actionType} pour le cours: ${courseTitle}`);

      // Mode simulation pour le développement si l'API n'est pas disponible
      if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost') {
        console.log('Mode simulation - API non disponible en développement');
        alert(`Demande envoyée pour ${actionType} du cours: ${courseTitle}`);
        return;
      }

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentTitle: 'Course Registration',
          agentDescription: `Course action request: ${actionType}`,
          userRequirement: `Demande de ${actionType} pour le cours: ${courseTitle}`,
          clientEmail: 'course-request@eggon.ai', // Email par défaut ou demander à l'utilisateur
          courseTitle: courseTitle,
          actionType: actionType,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert(`Demande envoyée avec succès pour ${actionType} du cours: ${courseTitle}`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Erreur HTTP ${response.status}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(`Erreur lors de l'envoi de la demande: ${error.message}`);
    }
  };

  const renderCourseButtons = (status, courseTitle) => {
    if (status === 'completed') {
      return (
        <>
          <button className="course-btn completed">
            {t('academie.buttons.completed') || 'Terminé'}
          </button>
          <button 
            className="course-btn catch-up"
            onClick={() => handleCourseAction(courseTitle, 'rattrapage')}
          >
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
          <button 
            className="course-btn enroll"
            onClick={() => handleCourseAction(courseTitle, 'inscription')}
          >
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
                      {renderCourseButtons(course.status, course.title)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* EggOn CTA Section - Format uniforme */}
          <div className="roi-section-enhanced">
            <div className="roi-content-container">
              <div className="roi-header-enhanced">
                <h2 className="roi-main-title">
                  EggOn vous accompagne partout.
                </h2>
                <p className="roi-subtitle">
                  La contextualisation RAG combinée aux agents IA spécialisés vous apporte un ROI rapidement
                </p>
              </div>

              <div className="roi-cta-container">
                <button className="roi-cta-button" onClick={() => window.location.href = '/contact'}>
                  <div className="button-content">
                    <span className="arrow-left">→</span>
                    <span className="button-text">
                      Parler à EggOn
                      <span className="arrow-right">→</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LearnSection;
