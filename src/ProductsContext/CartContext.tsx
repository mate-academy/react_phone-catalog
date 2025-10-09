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
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  toggleCart: () => {},
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

  useEffect(() => {
    const saved = localStorage.getItem('cart');

    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
