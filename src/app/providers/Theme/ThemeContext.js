import { jsx as _jsx } from "react/jsx-runtime";
import { useLocalStorage } from '@/shared/Hooks';
import { createContext, useContext, useEffect } from 'react';
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    return _jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: children });
}
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }
    return context;
}
