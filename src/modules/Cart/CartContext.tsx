import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { CartContextType } from './interfaces/CartContextType';
import { ProductCart } from './interfaces/ProductCart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductCart[]>(() => {
    try {
      const stored = localStorage.getItem('cart');

      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Ошибка парсинга cart из localStorage:', e);

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Omit<ProductCart, 'quantity'>): boolean => {
    let alreadyAdded = false;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        alreadyAdded = true;

        return prev;
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    return !alreadyAdded;
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const parsePrice = (price: string | number): number => {
    if (typeof price === 'number') {
      return price;
    }

    if (typeof price === 'string') {
      return Number(price.replace(/[^0-9.]/g, '')) || 0;
    }

    return 0;
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0,
  );

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
        totalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
