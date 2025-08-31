import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import { useTranslation } from 'react-i18next';
import './NavigationSpeedDial.css';

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: "absolute !important", // Changé de fixed à absolute
        top: "0 !important",
        right: "0 !important",
        zIndex: "99999 !important",
        margin: "0 !important",
        transform: "none !important",
        [theme.breakpoints.up('md')]: {
            display: 'none !important',
        },
        '& .MuiSpeedDialAction-staticTooltipLabel': {
            color: '#000000 !important',
            backgroundColor: 'rgba(255, 255, 255, 0.95) !important',
            fontWeight: '500 !important',
        },
        '& .MuiTooltip-tooltip': {
            color: '#000000 !important',
            backgroundColor: 'rgba(255, 255, 255, 0.95) !important',
            fontWeight: '500 !important',
            fontSize: '0.875rem !important',
        },
        '& .MuiTooltip-arrow': {
            color: 'rgba(255, 255, 255, 0.95) !important',
        },
    },
    iconColor: {
        color: theme.palette.grey[600],
        fontSize: '1.2rem',
    },
}));

export const NavigationSpeedDial = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const speedDialRef = useRef(null);

    const [open, setOpen] = React.useState(false);

    // FORCE LA POSITION AVEC JAVASCRIPT
    useEffect(() => {
        const forcePosition = () => {
            if (speedDialRef.current) {
                const speedDialElement = speedDialRef.current.querySelector('[class*="MuiSpeedDial-root"]');
                if (speedDialElement) {
                    speedDialElement.style.position = 'absolute';
                    speedDialElement.style.top = '0px';
                    speedDialElement.style.right = '0px';
                    speedDialElement.style.left = 'auto';
                    speedDialElement.style.bottom = 'auto';
                    speedDialElement.style.margin = '0';
                    speedDialElement.style.transform = 'none';
                    speedDialElement.style.zIndex = '99999';
                }
            }
        };

        // Force au montage
        forcePosition();

        // Force après un délai pour s'assurer que Material-UI a fini de s'initialiser
        const timeout = setTimeout(forcePosition, 100);

        // Force à chaque resize (au cas où)
        window.addEventListener('resize', forcePosition);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', forcePosition);
        };
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    // Navigation links avec icônes
    const navigationActions = [
        {
            name: t('navigation.home'),
            url: '/',
            icon: 'fas fa-home'
        },
        {
            name: t('navigation.lab'),
            url: '/nog-lab',
            icon: 'fas fa-flask'
        },
        {
            name: t('navigation.learn'),
            url: '/learn',
            icon: 'fas fa-book'
        },
        {
            name: t('navigation.contact'),
            url: '/contact',
            icon: 'fas fa-envelope'
        }
    ];

    const actionIcons = navigationActions.map((action) => (
        <SpeedDialAction
            key={action.name.toLowerCase()}
            icon={<i className={`${action.icon} ${classes.iconColor}`}></i>}
            tooltipTitle={action.name}
            onClick={() => {
                window.location.href = action.url;
                handleClose();
            }}
        />
    ));

    return (
        <div
            ref={speedDialRef}
            className="navigation-speed-dial-wrapper"
            style={{
                position: 'fixed',
                top: '12px',
                right: '12px',
                width: 'auto',
                height: 'auto',
                zIndex: 99999,
                margin: 0,
                padding: 0,
                transform: 'none',
                pointerEvents: 'none'
            }}
        >
            <SpeedDial
                ariaLabel="Navigation SpeedDial"
                className={`${classes.speedDial} navigation-speed-dial`}
                hidden={false}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
                style={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    left: 'auto',
                    bottom: 'auto',
                    zIndex: 99999,
                    margin: 0,
                    transform: 'none',
                    pointerEvents: 'auto'
                }}
            >
                {actionIcons}
            </SpeedDial>
        </div>
    );
};
