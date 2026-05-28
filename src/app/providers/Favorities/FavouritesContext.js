import { jsx as _jsx } from "react/jsx-runtime";
import { useLocalStorage } from '@/shared/Hooks';
import { createContext, useContext } from 'react';
const FavouritesContext = createContext(null);
export function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useLocalStorage('favourites', []);
    return (_jsx(FavouritesContext.Provider, { value: { favourites, setFavourites }, children: children }));
}
export function useFavourites() {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }
    return context;
}
