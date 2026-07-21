import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'count'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
}

export interface CartItem {
  id: string;
  image: string;
  name: string;
  price: string;
  count: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used with CartProvider');
  }

  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [Items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  //#region cart functions
  const addToCart = (item: Omit<CartItem, 'count'>) => {
    setItems(prevItem => {
      const existingItem = prevItem.find(items => items.id === item.id);

      if (existingItem) {
        return prevItem.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem,
        );
      }

      return [...prevItem, { ...item, count: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItem => prevItem.filter(cartItem => cartItem.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prevItem =>
      prevItem
        .map(cartItem =>
          cartItem.id === id
            ? { ...cartItem, count: cartItem.count + delta }
            : cartItem,
        )
        .filter(cartItem => cartItem.count > 0),
    );
  };
  //#endregion

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(Items));
  }, [Items]);

  return (
    <CartContext.Provider
      value={{ items: Items, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
