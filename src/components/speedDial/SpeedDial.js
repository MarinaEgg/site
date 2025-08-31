import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: "absolute",
        top: theme.spacing(6),
        right: theme.spacing(6),
    },
    iconColor: {
        color: theme.palette.foreground.default,
    },
}));

export const SpeedDials = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    // Remplacez les données du resume.json par des données statiques
    const socialProfiles = [
        {
            network: 'GitHub',
            url: 'https://github.com/MarinaEgg', // Remplacez par votre URL GitHub
            x_icon: 'fab fa-github'
        },
        {
            network: 'LinkedIn', 
            url: 'https://linkedin.com/in/votre-profil', // Remplacez par votre URL LinkedIn
            x_icon: 'fab fa-linkedin'
        },
        {
            network: 'Twitter',
            url: 'https://twitter.com/votre-compte', // Remplacez par votre URL Twitter
            x_icon: 'fab fa-twitter'
        }
    ];

    const actionIcons = socialProfiles.map((action) => (
        <SpeedDialAction
            key={action.network.toLowerCase()}
            icon={<i className={`${action.x_icon} ${classes.iconColor}`}></i>}
            tooltipTitle={action.network}
            onClick={() => {
                window.open(action.url, '_blank', 'noopener,noreferrer');
                handleClose();
            }}
        />
    ));

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial"
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
        </>
    );
};

