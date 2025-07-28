import React from 'react';
import { LogoLink } from '../components/logo/LogoLink';
import { Content } from '../components/content/Content';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DisplacementSphere from '../components/background/DisplacementSphere';
import { FooterText } from '../components/footer/FooterText';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import NOGProjectSection from '../components/nog/NOGProjectSection';
import StorySection from '../components/story/StorySection';
import CollectionSection from '../components/collection/CollectionSection';
import LegalStackSection from '../components/legalStack/LegalStackSection';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../components/theme/ThemeToggle';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  sphereBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -999,
    pointerEvents: 'none',
  },
  homeSection: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 1,
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
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
      <div className={classes.sphereBackground}>
        <DisplacementSphere />
      </div>

      <div className={classes.homeSection}>
        <LogoLink />
        <Content />
        <Hidden smDown>
          <SocialIcons />
        </Hidden>
        <Hidden mdUp>
          <SpeedDials />
        </Hidden>
      </div>

      <ThemeToggle />

      <div className={classes.contentSection}>
        <NOGProjectSection />
      </div>

      <div className={classes.contentSection}>
        <StorySection />
      </div>

      <div className={classes.contentSection}>
        <LegalStackSection />
      </div>

      <div className={classes.contentSection}>
        <CollectionSection />
      </div>
    </div>
  );
};