import {
  ReactNode,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react';

type CartContextType = {
  cartItems: number[];
  toggleCart: (id: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  toggleCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const cleanCartData = (data: unknown): number[] => {
    try {
      if (Array.isArray(data)) {
        return data.filter(n => typeof n === 'number');
      }

      return [];
    } catch {
      return [];
    }
  };

  const toggleCart = (id: number) => {
    setCartItems(prev => {
      let addedItemInCart;

      if (prev.includes(id)) {
        addedItemInCart = prev.filter(item => item !== id);
      } else {
        addedItemInCart = [...prev, id];
      }

      localStorage.setItem('cart', JSON.stringify(addedItemInCart));

      return addedItemInCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const isSaved = localStorage.getItem('cart');

    if (isSaved) {
      const parsed = JSON.parse(isSaved);
      const cleaned = cleanCartData(parsed);

      setCartItems(cleaned);
      localStorage.setItem('cart', JSON.stringify(cleaned));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, toggleCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
