import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from 'types/ProductInfo';

export type CartItem = {
  product: Product;
  quantity: number;
};

type AppDataContextType = {
  // Favorites
  favourites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isAdded: (productId: string) => boolean;
  updateCartQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  clearCart: () => void;
};

const AppDataContext = createContext<AppDataContextType | null>(null);

const safeParse = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Invalid JSON in localStorage for ${key}`, e);
    localStorage.removeItem(key);
    return fallback;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<Product[]>(() =>
    safeParse<Product[]>('favourites', []),
  );

  const [cart, setCart] = useState<CartItem[]>(() =>
    safeParse<CartItem[]>('cart', []),
  );

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const existedItem = cart.find(p => p.product.id === product.id);

    if (existedItem) {
      setCart(
        cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(p => p.product.id !== productId));
  };

  const isAdded = (productId: string) => {
    return cart.some(p => p.product.id === productId);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev =>
      prev
        .map(p => (p.product.id === productId ? { ...p, quantity } : p))
        .filter(i => i.quantity > 0),
    );
  };

  const getProductPrice = (product: Product) =>
    product.priceDiscount ?? product.priceRegular;

  const getCartTotal = () =>
    cart.reduce(
      (sum, item) => sum + getProductPrice(item.product) * item.quantity,
      0,
    );

  const getCartItemsCount = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

const clearCart = () => {
  console.log('Clearing cart...');
  localStorage.setItem('cart', '[]');
  setCart([]);
  console.log('Cart cleared completely');
};

  const addToFavorites = (product: Product) => {
    if (!favourites.find(p => p.id === product.id)) {
      setFavourites([...favourites, product]);
    }
  };

  const removeFromFavorites = (productId: string) => {
    setFavourites(favourites.filter(p => p.id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favourites.some(p => p.id === productId);
  };

  return (
    <AppDataContext.Provider
      value={{
        favourites,
        removeFromFavorites,
        addToFavorites,
        isFavorite,
        cart,
        addToCart,
        removeFromCart,
        isAdded,
        updateCartQuantity,
        getCartTotal,
        clearCart,
        getCartItemsCount,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppContext must be used within a MyProvider');
  }
  return context;
};
