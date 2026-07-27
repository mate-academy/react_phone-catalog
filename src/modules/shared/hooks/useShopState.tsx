import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type ShopStateContextValue = {
    favoriteIds: number[];
    cartIds: number[];
    toggleFavorite: (id: number) => void;
    addToCart: (id: number) => void;
};

const ShopStateContext = createContext<ShopStateContextValue | null>(null);

type ShopStateProviderProps = {
    children: ReactNode;
};

export const ShopStateProvider = ({ children }: ShopStateProviderProps) => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [cartIds, setCartIds] = useState<number[]>([]);

    const toggleFavorite = (id: number) => {
        setFavoriteIds(currentIds =>
            currentIds.includes(id)
                ? currentIds.filter(currentId => currentId !== id)
                : [...currentIds, id],
        );
    };

    const addToCart = (id: number) => {
        setCartIds(currentIds =>
            currentIds.includes(id) ? currentIds : [...currentIds, id],
        );
    };

    const value = useMemo(
        () => ({
            favoriteIds,
            cartIds,
            toggleFavorite,
            addToCart,
        }),
        [favoriteIds, cartIds],
    );

    return (
        <ShopStateContext.Provider value={value}>
            {children}
        </ShopStateContext.Provider>
    );
};

export const useShopState = () => {
    const context = useContext(ShopStateContext);

    if (!context) {
        throw new Error('useShopState must be used within ShopStateProvider');
    }

    return context;
};
