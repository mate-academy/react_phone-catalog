import {
    useCallback,
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

const CART_STORAGE_KEY = 'phone-catalog-cart';
const FAVORITES_STORAGE_KEY = 'phone-catalog-favorites';

export type CartEntry = {
    id: string;
    quantity: number;
};

type ShopStateContextValue = {
    favoriteIds: Array<string | number>;
    cartItems: CartEntry[];
    cartIds: string[];
    cartItemsCount: number;
    toggleFavorite: (id: string | number) => void;
    addToCart: (id: string | number) => void;
    removeFromCart: (id: string | number) => void;
    updateCartQuantity: (id: string | number, quantity: number) => void;
    clearCart: () => void;
    isInCart: (id: string | number) => boolean;
};

const ShopStateContext = createContext<ShopStateContextValue | null>(null);

type ShopStateProviderProps = {
    children: ReactNode;
};

const readStoredCart = (): CartEntry[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

        if (!rawCart) {
            return [];
        }

        const parsedCart = JSON.parse(rawCart) as unknown;

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart.filter(
            (item): item is CartEntry =>
                typeof item === 'object' &&
                item !== null &&
                typeof item.id === 'string' &&
                typeof item.quantity === 'number' &&
                item.quantity > 0,
        );
    } catch {
        return [];
    }
};

const readStoredFavorites = (): string[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const rawFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

        if (!rawFavorites) {
            return [];
        }

        const parsedFavorites = JSON.parse(rawFavorites) as unknown;

        if (!Array.isArray(parsedFavorites)) {
            return [];
        }

        return parsedFavorites.filter(
            (item): item is string => typeof item === 'string',
        );
    } catch {
        return [];
    }
};

export const ShopStateProvider = ({ children }: ShopStateProviderProps) => {
    const [favoriteIds, setFavoriteIds] =
        useState<Array<string | number>>(readStoredFavorites);
    const [cartItems, setCartItems] = useState<CartEntry[]>(readStoredCart);

    const toggleFavorite = (id: string | number) => {
        const normalizedId = String(id);

        setFavoriteIds(currentIds =>
            currentIds.includes(normalizedId)
                ? currentIds.filter(currentId => currentId !== normalizedId)
                : [...currentIds, normalizedId],
        );
    };

    const addToCart = (id: string | number) => {
        const normalizedId = String(id);

        setCartItems(currentItems =>
            currentItems.some(item => item.id === normalizedId)
                ? currentItems
                : [...currentItems, { id: normalizedId, quantity: 1 }],
        );
    };

    const removeFromCart = (id: string | number) => {
        const normalizedId = String(id);

        setCartItems(currentItems =>
            currentItems.filter(item => item.id !== normalizedId),
        );
    };

    const updateCartQuantity = (id: string | number, quantity: number) => {
        const normalizedId = String(id);

        setCartItems(currentItems =>
            currentItems.map(item =>
                item.id === normalizedId
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item,
            ),
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    useEffect(() => {
        window.localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cartItems),
        );
    }, [cartItems]);

    useEffect(() => {
        window.localStorage.setItem(
            FAVORITES_STORAGE_KEY,
            JSON.stringify(favoriteIds),
        );
    }, [favoriteIds]);

    const cartIds = useMemo(() => cartItems.map(item => item.id), [cartItems]);

    const cartItemsCount = useMemo(
        () => cartItems.reduce((total, item) => total + item.quantity, 0),
        [cartItems],
    );

    const isInCart = useCallback(
        (id: string | number) => cartIds.includes(String(id)),
        [cartIds],
    );

    const value = useMemo(
        () => ({
            favoriteIds,
            cartItems,
            cartIds,
            cartItemsCount,
            toggleFavorite,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            clearCart,
            isInCart,
        }),
        [favoriteIds, cartItems, cartIds, cartItemsCount, isInCart],
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
