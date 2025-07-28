import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    logoText: {
        position: "absolute",
        top: theme.spacing(6),
        left: theme.spacing(6),
        fontSize: "1rem",
        fontWeight: "500",
        color: theme.palette.foreground.default,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        opacity: 0.8,
        transition: "all 0.3s ease",
        "&:hover": {
            opacity: 1,
            color: theme.palette.primary.main,
        },
    },
}));

export const LogoLink = () => {
    const classes = useStyles();

    return (
        <Typography
            variant="body1"
            className={classes.logoText}
        >
            EggOn Technology
        </Typography>
    );
};
