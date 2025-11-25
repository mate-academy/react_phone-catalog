import { createContext, useContext, useMemo } from 'react';
import { CartItem } from '../types/Cart';
import { useLocalStorage } from '../modules/shared/useLocalStorage';

interface CartContextProps {
  cartItems: CartItem[];
  cartCount: number;
  isInCart: (productId: string) => boolean;
  clearCart: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
}
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'cartItems',
    [],
  );

  const value = useMemo<CartContextProps>(() => {
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const isInCart = (productId: string) =>
      !!cartItems.find(item => item.productId === productId);

    const clearCart = () => setCartItems([]);

    const addToCart = (productId: string) => {
      const newItem = { productId, quantity: 1 };

      setCartItems(prev => [...prev, newItem]);
    };

    const removeFromCart = (productId: string) => {
      const newItems = cartItems.filter(item => item.productId !== productId);

      setCartItems(newItems);
    };

    const incrementQuantity = (productId: string) => {
      const newItems = cartItems.map(item => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      setCartItems(newItems);
    };

    const decrementQuantity = (productId: string) => {
      const newItems = cartItems.map(item => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });

      setCartItems(newItems);
    };

    return {
      cartItems,
      cartCount,
      isInCart,
      clearCart,
      addToCart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
    };
  }, [cartItems, setCartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCartContext must be used inside CartContextProvider');
  }

  return ctx;
};
