import { jsx as _jsx } from "react/jsx-runtime";
import { useLocalStorage } from '@/shared/Hooks';
import { createContext, useContext } from 'react';
const CartContext = createContext(null);
export function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage('cart', []);
    return (_jsx(CartContext.Provider, { value: { cart, setCart }, children: children }));
}
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }
    return context;
}
