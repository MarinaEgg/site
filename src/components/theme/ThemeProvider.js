import React, { useEffect, useState, createContext } from "react";
import { LightTheme, DarkTheme } from "./Themes";
import { MuiThemeProvider } from "@material-ui/core/styles";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getPrefColorScheme = () => {
        if (!window.matchMedia) return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    // Force dark mode by default, fallback to user preference if needed
    const getInitialMode = () => {
        if (typeof localStorage === "undefined") return true;
        const isReturningUser = localStorage.getItem("dark") !== null;
        const savedMode = JSON.parse(localStorage.getItem("dark"));

        if (isReturningUser) return savedMode;
        return getPrefColorScheme();
    };

    const [theme, setTheme] = useState(getInitialMode() ? "dark" : "light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("dark", JSON.stringify(theme === "dark"));
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MuiThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
