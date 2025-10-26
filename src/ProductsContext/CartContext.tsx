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

  const toggleCart = (id: number) => {
    setCartItems(prev => {
      const addedItemInCart = prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id];

      localStorage.setItem('cart', JSON.stringify(addedItemInCart));

      return addedItemInCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const saved = localStorage.getItem('cart');

    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, toggleCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
