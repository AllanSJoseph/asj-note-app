import {useState, useEffect } from "react";

import DarkModeLogo from '../assets/darkmode.svg';
import LightModeLogo from '../assets/lightmode.svg';

export type Theme = "light" | "dark";

const getPreferredTheme = (): Theme => {
    if (localStorage.theme === "dark") return "dark";
    if (localStorage.theme === "light") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};


const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>(getPreferredTheme());
    // const [showThemeChanged, setShowThemeChanged] = useState<boolean>(false);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
        localStorage.theme = theme;
        // setShowThemeChanged(true);

    }

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.theme = theme;
    }, [theme]);

    return (
        <>
            <button onClick={() => toggleTheme()} className={`block py-2 px-3 rounded hover:bg-slate-700 cursor-pointer transition`} title="Add Note">
                <img src={theme === "dark" ? LightModeLogo : DarkModeLogo} alt='add' width={50} height={50} />
            </button>
        </>
    )
}

export default ThemeToggle;