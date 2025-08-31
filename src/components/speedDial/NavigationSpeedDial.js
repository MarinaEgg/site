import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import { useTranslation } from 'react-i18next';
import './NavigationSpeedDial.css';

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: "fixed !important", // IMPORTANT: garder fixed
        top: "12px !important",
        right: "12px !important",
        zIndex: "10000 !important", // Plus élevé que 9999
        margin: "0 !important",
        transform: "none !important",
        [theme.breakpoints.up('md')]: {
            display: 'none !important',
        },
        '& .MuiSpeedDialAction-staticTooltipLabel': {
            color: '#000000 !important', // Tooltips en noir
            backgroundColor: 'rgba(255, 255, 255, 0.95) !important',
            fontWeight: '500 !important',
        },
        '& .MuiTooltip-tooltip': {
            color: '#000000 !important', // Texte des tooltips en noir
            backgroundColor: 'rgba(255, 255, 255, 0.95) !important',
            fontWeight: '500 !important',
            fontSize: '0.875rem !important',
        },
        '& .MuiTooltip-arrow': {
            color: 'rgba(255, 255, 255, 0.95) !important',
        },
    },
    iconColor: {
        color: theme.palette.grey[600], // Même couleur grise que les icônes actuelles
        fontSize: '1.2rem',
    },
}));

export const NavigationSpeedDial = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [open, setOpen] = React.useState(false);

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
            className="navigation-speed-dial-wrapper"
            style={{
                position: 'fixed',
                top: '12px',
                right: '12px',
                zIndex: 10000,
                margin: 0,
                padding: 0,
                transform: 'none',
                pointerEvents: 'auto'
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
                    position: 'fixed',
                    top: '12px',
                    right: '12px',
                    zIndex: 10000,
                    margin: 0,
                    transform: 'none'
                }}
            >
                {actionIcons}
            </SpeedDial>
        </div>
    );
};
