import React from 'react';
import Header from '../components/header/Header';
import { LogoLink } from '../components/logo/LogoLink';
import { Content } from '../components/content/Content';
import { makeStyles } from '@material-ui/core/styles';
import NOGProjectSection from '../components/nog/NOGProjectSection';
import WhyEggOnSection from '../components/why-eggon/WhyEggOnSection'; // 🆕 Import de votre nouvelle section
import CollectionSection from '../components/collection/CollectionSection';
import LegalStackSection from '../components/legalStack/LegalStackSection';
import Footer from '../components/footer/Footer';
// Hidden import supprimé car plus nécessaire

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  homeSection: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 1,
    margin: 0,
    paddingTop: '80px', // CORRIGÉ : Correspond exactement à laa hauteur du header
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 768px)': {
      paddingTop: '70px', // CORRIGÉ : Correspond à la hauteur mobile du header
    },
  },
  contentSection: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 1,
    margin: 0,
    padding: 0
  }
}));

export const Home = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.homeSection}>
        <LogoLink />
        <Content />

      </div>

      <div className={classes.contentSection}>
        <NOGProjectSection />
      </div>

      {/* 🆕 Nouvelle section WhyEggOn ajoutée ici */}
      <div className={classes.contentSection}>
        <WhyEggOnSection />
      </div>

      <div className={classes.contentSection}>
        <LegalStackSection />
      </div>

      <div className={classes.contentSection}>
        <CollectionSection />
      </div>

      <Footer />
    </div>
  );
};
