import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartItemType } from '../types/CartItemType';
import { CartContextType } from '../types/CartContextType';

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = 'nice_gadgets_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // загрузка из localStorage
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  });

  // сохранение при каждом изменении
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  //  общая сумма
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  //  общее количество (для иконки корзины)
  const count = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  // добавить товар
  const addItem = (item: CartItemType) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === item.id);

      if (existing) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, item];
    });
  };

  //  увеличить
  const increase = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  //  уменьшить (и удалить если 0)
  const decrease = (id: string) => {
    setCartItems(items =>
      items
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  //  удалить
  const remove = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  //  очистить корзину (Checkout)
  const clear = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        count,
        addItem,
        increase,
        decrease,
        remove,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }

  return context;
};
