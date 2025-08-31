import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import { useTranslation } from 'react-i18next';

// STYLES ULTRA-SIMPLIFIÉS POUR ÉVITER LES CONFLITS
const useStyles = makeStyles((theme) => ({
    speedDialContainer: {
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 9999,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    speedDial: {
        // Styles minimaux, laisse Material-UI faire son travail
        '& .MuiSpeedDialAction-staticTooltipLabel': {
            color: '#000000',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            fontWeight: '500',
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
        <div className={classes.speedDialContainer}>
            <SpeedDial
                ariaLabel="Navigation SpeedDial"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
            >
                {actionIcons}
            </SpeedDial>
        </div>
    );
};
