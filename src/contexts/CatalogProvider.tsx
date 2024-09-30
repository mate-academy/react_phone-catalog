import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../utils/hooks/useLocalStorage';
import { Cart } from '../types/Cart';

interface CatalogContextType {
  favorites: Product[];
  carts: Cart[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  removeAllFromCart: () => void;
  updateQuantity: (id: string, action: number) => void;
  getTotalCheckout: () => number;
  getTotalQuantity: () => number;
}

type Props = {
  children: ReactNode;
};

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined,
);

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );
  const [carts, setCarts] = useLocalStorage<Cart[]>('carts', []);

  const addToFavorites = useCallback(
    (product: Product) => {
      setFavorites((prevFavorites: Product[]) => [...prevFavorites, product]);
    },
    [setFavorites],
  );

  const removeFromFavorites = useCallback(
    (productId: string) => {
      setFavorites((prevFavorites: Product[]) =>
        prevFavorites.filter(product => product.id !== productId),
      );
    },
    [setFavorites],
  );

  const addToCart = useCallback(
    (product: Product) => {
      setCarts((prev: Cart[]) => [
        ...prev,
        { id: product.id, product, quantity: 1, price: product.price },
      ]);
    },
    [setCarts],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCarts((prev: Cart[]) => prev.filter(cart => cart.id !== productId));
    },
    [setCarts],
  );

  const updateQuantity = (id: string, action: number) => {
    setCarts(prevCarts => {
      return prevCarts.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + action;

          if (newQuantity < 1) {
            return item;
          }

          const newPrice = item.product.price * newQuantity;

          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newPrice,
          };
        }

        return item;
      });
    });
  };

  const getTotalCheckout = (): number => {
    return carts.reduce((acc, item) => {
      return acc + (item.totalPrice || item.product.price * item.quantity);
    }, 0);
  };

  const getTotalQuantity = (): number => {
    return carts.reduce((acc, item) => acc + item.quantity, 0);
  };

  const removeAllFromCart = () => {
    setCarts([]);
  };

  return (
    <CatalogContext.Provider
      value={{
        getTotalQuantity,
        updateQuantity,
        getTotalCheckout,
        carts,
        favorites,
        addToFavorites,
        removeFromFavorites,
        addToCart,
        removeAllFromCart,
        removeFromCart,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = (): CatalogContextType => {
  const context = useContext(CatalogContext);

  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }

  return context;
};
