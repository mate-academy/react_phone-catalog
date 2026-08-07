// ..CartContext.tsx
/* eslint-disable */
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

const CART_STORAGE_KEY = 'cart_products';

// 1. Елемент кошика містить ТІЛЬКИ id та кількість
export interface CartItemData {
  id: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItemData[];
  cartCount: number; // Загальна кількість усіх штук (сума quantities)
  toggleCart: (productId: string) => void;
  isInCart: (productId: string) => boolean;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // 1. ЗЧИТУВАННЯ: Завантажуємо масив { id, quantity }
  const [cartItems, setCartItems] = useState<CartItemData[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. ЗАПИС
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Перевірка чи є в кошику
  const isInCart = (productId: string) => {
    return cartItems.some(item => item.id === productId);
  };

  // Перемикач для кнопки "Add to cart" / "Selected"
  const toggleCart = (productId: string) => {
    setCartItems(prevItems => {
      const isExist = prevItems.some(item => item.id === productId);

      if (isExist) {
        return prevItems.filter(item => item.id !== productId);
      } else {
        // За замовчуванням додаємо 1 штуку
        return [...prevItems, { id: productId, quantity: 1 }];
      }
    });
  };

  // Збільшити кількість (+)
  const increaseQuantity = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Зменшити кількість (-)
  const decreaseQuantity = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // Видалення з хрестика
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Загальна кількість товарів для беджика в хедері (сума всіх quantity)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        toggleCart,
        isInCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
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
