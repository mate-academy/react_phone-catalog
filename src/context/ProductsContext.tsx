import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ProductType } from 'models/product.model';

const FAVORITES_KEY = 'favorites';
const CART_KEY = 'cart';

type CartItem = {
  product: ProductType;
  quantity: number;
};

type ProductsContextType = {
  products: ProductType[];
  cart: CartItem[];
  favorites: ProductType[];

  toggleCart: (product: ProductType) => void;
  toggleFav: (product: ProductType) => void;
  increaseQuantity: (productId: number | string) => void;
  decreaseQuantity: (productId: number | string) => void;
  clearCart: () => void;
  totalCartQuantity: number;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products] = useState<ProductType[]>([]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_KEY);

    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<ProductType[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);

    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const toggleCart = useCallback((product: ProductType) => {
    const productStandardId = product.itemId || String(product.id);

    setCart(prev => {
      const exists = prev.some(
        item =>
          (item.product.itemId || String(item.product.id)) ===
          productStandardId,
      );

      if (exists) {
        return prev.filter(
          item =>
            (item.product.itemId || String(item.product.id)) !==
            productStandardId,
        );
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }, []);

  const toggleFav = useCallback((product: ProductType) => {
    const productStandardId = product.itemId || String(product.id);

    setFavorites(prev => {
      const exists = prev.some(
        item => (item.itemId || String(item.id)) === productStandardId,
      );

      if (exists) {
        return prev.filter(
          item => (item.itemId || String(item.id)) !== productStandardId,
        );
      }

      return [...prev, product];
    });
  }, []);

  const increaseQuantity = useCallback((productId: number | string) => {
    const idToCompare = String(productId);

    setCart(prev =>
      prev.map(item =>
        (item.product.itemId || String(item.product.id)) === idToCompare
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((productId: number | string) => {
    const idToCompare = String(productId);

    setCart(prev =>
      prev.map(item =>
        (item.product.itemId || String(item.product.id)) === idToCompare &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [favorites, cart]);

  const totalCartQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      products,
      cart,
      favorites,
      toggleCart,
      toggleFav,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalCartQuantity,
    }),
    [
      products,
      cart,
      favorites,
      toggleCart,
      toggleFav,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalCartQuantity,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

// custom hooks
export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
