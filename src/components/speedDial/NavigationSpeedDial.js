import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: "fixed",
        top: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1002, // Plus élevé que le header
        [theme.breakpoints.up('md')]: {
            display: 'none', // Caché sur desktop
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
        <SpeedDial
            ariaLabel="Navigation SpeedDial"
            className={classes.speedDial}
            hidden={false}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="down"
        >
            {actionIcons}
        </SpeedDial>
    );
};