import React from "react";
import { Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "auto",
        marginBottom: "auto",
        "@media (max-width: 768px)": {
            marginLeft: theme.spacing(4),
        },
    },
    shinyTitle: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: '700',
        fontSize: 'clamp(2rem, 6vw, 4rem)',
        lineHeight: '1.1',
        color: '#b5b5b5a4',
        background: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        animation: '$shine 5s linear infinite',
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
        '&.disabled': {
            animation: 'none',
            color: '#fafafa',
            background: 'none',
        },
    },
    subtitle: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: '500',
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        lineHeight: '1.6',
        color: 'rgba(250, 250, 250, 0.9)',
        marginBottom: '2rem',
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '2rem',
        "@media (max-width: 768px)": {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    primaryButton: {
        padding: '1rem 2rem',
        fontSize: '1rem',
        fontWeight: '600',
        background: 'rgba(252, 233, 107, 0.9)',
        color: '#2f2f2e',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: '#fce96b',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(252, 233, 107, 0.3)',
        },
    },
    secondaryButton: {
        padding: '1rem 2rem',
        fontSize: '1rem',
        fontWeight: '600',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#fafafa',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(255, 255, 255, 0.1)',
        },
    },
    '@keyframes shine': {
        '0%': {
            backgroundPosition: '-200% 0',
        },
        '100%': {
            backgroundPosition: '200% 0',
        },
    },
}));

export const Content = () => {
    const classes = useStyles();

    return (
        <Container component="main" className={`${classes.main}`} maxWidth="sm">
            <Typography variant="h2" component="h1" gutterBottom className={classes.shinyTitle}>
                Make legal AI agents your competitive advantage
            </Typography>
            <Typography variant="h5" component="h2" className={classes.subtitle}>
                With N.O.G., you can build and orchestrate AI agents that plan, act, and collaborate securely — all with full traceability.
            </Typography>
            <div className={classes.buttonContainer}>
                <Button className={classes.primaryButton}>
                    Start Building
                </Button>
                <Button className={classes.secondaryButton}>
                    More info about the Nested Orchestrator and Governance project
                </Button>
            </div>
        </Container>
    );
};