import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartItems, Product } from '../types/Product';

type ShopContextType = {
  products: Product[];
  favourites: Product[];
  carts: CartItems[];
  toggleFavourite: (product: Product) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (cartId: string) => void;
  increaseQuantity: (cartId: string) => void;
  decreaseQuantity: (cartId: string) => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const ShopProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [carts, setCarts] = useState<CartItems[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((dataProducts: Product[]) => setProducts(dataProducts));
  }, []);

  const toggleFavourite = (product: Product) => {
    setFavourites(prev => {
      const isAlreadyAdded = prev.some(item => item.id === product.id);

      if (isAlreadyAdded) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const addToCart = (product: Product) => {
    setCarts(prev => {
      const exist = prev.find(item => item.product.itemId === product.itemId);

      if (exist) {
        return prev.map(item =>
          item.product.itemId === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: `${product.itemId}-${Date.now()}`,
          product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCarts(prev => prev.filter(item => item.id !== cartId));
  };

  const increaseQuantity = (cartId: string) => {
    setCarts(prev =>
      prev.map(item =>
        item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (cartId: string) => {
    setCarts(prev =>
      prev.map(item =>
        item.id === cartId ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  const value = useMemo(
    () => ({
      products,
      favourites,
      carts,
      toggleFavourite,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
    }),
    [products, favourites, carts],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }

  return context;
};
