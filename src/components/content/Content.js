import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "auto",
        marginBottom: "auto",
        display: "flex",
        alignItems: "center",
        gap: "4rem",
        width: "100%",
        maxWidth: "1600px",
        padding: "0 1rem",
        marginLeft: "auto",
        marginRight: "auto",
        "@media (max-width: 768px)": {
            flexDirection: "column",
            gap: "3rem",
            padding: "0 1rem",
        },
    },
    contentWrapper: {
        flex: "1 1 45%",
        minWidth: "0",
        paddingLeft: "6rem",
        paddingRight: "3rem",
        "@media (max-width: 1200px)": {
            paddingLeft: "4rem",
        },
        "@media (max-width: 768px)": {
            paddingLeft: "0",
            paddingRight: "0",
            flex: "1 1 auto",
            textAlign: "center",
        },
    },
    imageWrapper: {
        flex: "1 1 55%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        paddingTop: "2rem",
        paddingLeft: "3rem",
        paddingRight: "2rem",
        "@media (max-width: 1200px)": {
            paddingRight: "1.5rem",
            paddingTop: "1rem",
        },
        "@media (max-width: 768px)": {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "0",
            paddingRight: "0",
            paddingTop: "0",
            flex: "1 1 auto",
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
    interactivePhrase: {
        background: 'none',
        border: 'none',
        color: 'rgba(250, 250, 250, 0.8)',
        fontSize: '0.9rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        textAlign: 'left',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        marginBottom: '1.5rem',
        display: 'block',
        position: 'relative',
        '&:hover': {
            color: '#fafafa',
        },
        "@media (max-width: 768px)": {
            fontSize: '0.85rem',
            textAlign: 'center',
        },
    },
    dropdownContainer: {
        position: 'relative',
        display: 'inline',
    },
    dynamicWord: {
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
            color: '#fafafa',
        },
    },
    chevronDown: {
        marginRight: '4px',
        fontSize: '0.75em',
        opacity: 0.7,
        transition: 'all 0.3s ease',
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: '0',
        background: 'rgba(47, 47, 46, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        padding: '0.5rem 0',
        minWidth: '140px',
        zIndex: 1000,
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
        marginTop: '4px',
    },
    dropdownItem: {
        display: 'block',
        padding: '0.75rem 1rem',
        color: 'rgba(250, 250, 250, 0.8)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fafafa',
        },
    },
    shinyTitle: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: '700',
        fontSize: 'clamp(2rem, 5.2vw, 3.6rem)',
        lineHeight: '1.1',
        color: '#b5b5b5a4',
        background: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        animation: '$shine 5s linear infinite',
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
        textAlign: "left",
        '&.disabled': {
            animation: 'none',
            color: '#fafafa',
            background: 'none',
        },
        "@media (max-width: 768px)": {
            textAlign: "center",
        },
    },
    subtitle: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: '500',
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        lineHeight: '1.6',
        color: 'rgba(250, 250, 250, 0.9)',
        marginBottom: '2rem',
        textAlign: "left",
        "@media (max-width: 768px)": {
            textAlign: "center",
        },
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: '2rem',
        "@media (max-width: 768px)": {
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    primaryButton: {
        padding: '0.6rem 1.5rem',
        fontSize: '0.85rem',
        fontWeight: '700',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        letterSpacing: '0.1em',
        textTransform: 'none',
        background: 'transparent',
        color: '#fce96b',
        border: '1px solid #fce96b',
        borderRadius: '50px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s ease-out',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '180px',
        height: '40px',
        
        '& .button-content': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all 0.4s ease-out',
            transform: 'translateX(0)',
        },
        
        '& .button-text': {
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
        },
        
        '& .arrow-right': {
            marginLeft: '8px',
            opacity: 1,
            transition: 'all 0.4s ease-out',
        },
        
        '& .arrow-left': {
            marginRight: '8px',
            opacity: 0,
            transition: 'all 0.4s ease-out',
        },
        
        '&:hover': {
            background: '#fce96b',
            color: '#2f2f2e',
            
            '& .button-content': {
                transform: 'translateX(12px)',
            },
            
            '& .arrow-right': {
                opacity: 0,
            },
            
            '& .arrow-left': {
                opacity: 1,
            },
        },
        
        '&:active': {
            transform: 'translateY(-1px)',
        },
        
        "@media (max-width: 768px)": {
            minWidth: '160px',
            fontSize: '0.8rem',
            
            '&:hover .button-content': {
                transform: 'translateX(10px)',
            },
        },
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: 'rgba(250, 250, 250, 0.8)',
        fontSize: '0.9rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        textAlign: 'left',
        '&:hover': {
            color: '#fafafa',
        },
        "@media (max-width: 768px)": {
            fontSize: '0.85rem',
            textAlign: 'center',
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
    const { t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(t('noglab.heroDropdownOptionDefault') || "AI Agents");
    const dropdownRef = useRef(null);

    const dropdownOptions = [
        { label: t('noglab.heroDropdownOptionDefault'), path: "/" },
        { label: t('noglab.heroDropdownOption'), path: "/nog-lab" },
        { label: t('noglab.heroDropdownLearnAI'), path: "/learn" },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.label);
        setIsDropdownOpen(false);
        window.location.href = option.path;
    };

    const handleLabClick = () => {
        window.location.href = '/nog-lab';
    };

    return (
        <Container component="main" className={`${classes.main}`} maxWidth={false} disableGutters>
            <div className={classes.contentWrapper}>
                <div className={classes.interactivePhrase}>
                    {t('noglab.heroPhrase')}{' '}
                    <div className={classes.dropdownContainer} ref={dropdownRef}>
                        <span 
                            className={classes.dynamicWord}
                            onClick={handleDropdownToggle}
                        >
                            <span className={classes.chevronDown}>▼</span>
                            {selectedOption}
                        </span>
                        {isDropdownOpen && (
                            <div className={classes.dropdown}>
                                {dropdownOptions.map((option, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className={classes.dropdownItem}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleOptionClick(option);
                                        }}
                                    >
                                        {option.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Typography variant="h2" component="h1" gutterBottom className={classes.shinyTitle}>
                    {t('hero.title')}
                </Typography>
                <Typography variant="h5" component="h2" className={classes.subtitle}>
                    {t('hero.subtitle')}
                </Typography>
                <div className={classes.buttonContainer}>
                    <button className={classes.primaryButton} onClick={() => window.location.href = '/contact'}>
                        <div className="button-content">
                            <span className="arrow-left">→</span>
                            <span className="button-text">
                                {t('hero.cta')}
                                <span className="arrow-right">→</span>
                            </span>
                        </div>
                    </button>
                    <button className={classes.linkButton} onClick={handleLabClick}>
                        → {t('hero.labLink')}
                    </button>
                </div>
            </div>
            <div className={classes.imageWrapper}>
                <img 
                    src="/visage_ts.webp" 
                    alt="N.O.G. Platform Interface" 
                    className={classes.heroImage}
                />
            </div>
        </Container>
    );
};
