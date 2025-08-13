import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import './NOGLabSection.css';

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "auto",
        marginBottom: "auto",
        display: "flex",
        flexDirection: "row", // FORCÉ
        alignItems: "center",
        gap: "4rem",
        width: "100%",
        maxWidth: "1600px",
        padding: "0 1rem",
        marginLeft: "auto",
        marginRight: "auto",
        minHeight: "80vh", // AJOUTÉ POUR DEBUG
        border: "3px solid yellow", // BORDURE JAUNE POUR LE CONTAINER PRINCIPAL
        "@media (max-width: 768px)": {
            flexDirection: "column",
            gap: "3rem",
            padding: "0 1rem",
        },
    },
    contentWrapper: {
        flex: "0 0 45%", // CHANGÉ : flex-shrink: 0 pour forcer la taille
        width: "45%", // FORCÉ explicitement
        maxWidth: "45%", // FORCÉ pour éviter le débordement
        minWidth: "300px",
        height: "400px",
        paddingLeft: "6rem",
        paddingRight: "3rem",
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        border: '5px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box', // AJOUTÉ pour inclure padding dans la largeur
        "@media (max-width: 1200px)": {
            paddingLeft: "4rem",
        },
        "@media (max-width: 768px)": {
            paddingLeft: "2rem",
            paddingRight: "2rem",
            flex: "1 1 auto",
            width: "100%",
            maxWidth: "100%",
            textAlign: "center",
        },
    },
    imageWrapper: {
        flex: "0 0 55%", // CHANGÉ : flex-shrink: 0 pour forcer la taille
        width: "55%", // FORCÉ explicitement 
        maxWidth: "55%", // FORCÉ pour éviter le débordement
        minWidth: "300px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        paddingTop: "2rem",
        paddingLeft: "3rem",
        paddingRight: "2rem",
        backgroundColor: 'rgba(0, 255, 0, 0.8)',
        border: '5px solid green',
        boxSizing: 'border-box', // AJOUTÉ pour inclure padding dans la largeur
        "@media (max-width: 1200px)": {
            paddingRight: "1.5rem",
            paddingTop: "1rem",
        },
        "@media (max-width: 768px)": {
            width: "100%",
            maxWidth: "100%",
            flex: "1 1 auto",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "0",
            paddingRight: "0",
            paddingTop: "0",
        },
    },
    heroImage: {
        height: "auto",
        maxWidth: "100%",
        width: "auto",
        maxHeight: "850px",
        objectFit: "contain",
        "@media (max-width: 1200px)": {
            maxHeight: "750px",
        },
        "@media (max-width: 768px)": {
            maxHeight: "500px",
        },
    },
    debugText: {
        color: '#ffffff',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '10px',
        borderRadius: '5px',
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
      {/* Hero Section avec DEBUG */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 255, 0.1)', // FOND BLEU POUR DEBUG
        border: '3px solid blue' // BORDURE BLEUE POUR DEBUG
      }}>
        <Container component="main" className={`${classes.main}`} maxWidth={false} disableGutters>
          
          {/* ZONE DE CONTENU (GAUCHE) */}
          <div className={classes.contentWrapper}>
            <div className={classes.debugText}>
              🔴 ZONE CONTENU (GAUCHE)
            </div>
            <div className={classes.debugText}>
              → EggOn Make your AI Agents
            </div>
            <div className={classes.debugText}>
              Make your AI Agents Insurable
            </div>
            <div className={classes.debugText}>
              TEST TRADUCTION: {t('noglab.heroTitle') || 'TRADUCTION MANQUANTE'}
            </div>
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#fce96b',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              BOUTON DE TEST
            </button>
          </div>

          {/* ZONE IMAGE (DROITE) */}
          <div className={classes.imageWrapper}>
            <div className={classes.debugText}>
              🟢 ZONE IMAGE (DROITE)
            </div>
            <img 
              src="/lab2.png" 
              alt="N.O.G. Lab Platform Interface" 
              className={classes.heroImage}
            />
          </div>

        </Container>
      </section>

      {/* Content Section */}
      <div className="noglab-section">
        <div className="noglab-container">
          <Typography variant="h1" component="h1" className={classes.mainContentTitle}>
            TITRE PRINCIPAL: {t('noglab.title') || 'TRADUCTION MANQUANTE'}
          </Typography>
          <p className="noglab-body-text">
            🔍 VERSION DEBUG - Vous devriez voir des zones colorées et du texte en gras
          </p>
        </div>
      </div>
    </>
  );
};

export default NOGLabSection;
