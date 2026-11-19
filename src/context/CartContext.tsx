import { createContext, PropsWithChildren, useContext, useState } from 'react';

type CartItemType = {
  id: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItemType[];
  toggleCart: (id: string) => void;
  deleteCart?: (id: string) => void;
  clearCart?: () => void;
  changeQuantity: (id: string, amount: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItemType[]>(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    return savedCart.map((item: string | CartItemType) => {
      if (typeof item === 'string') {
        return { id: item, quantity: 1 };
      }

      return { id: item.id, quantity: Math.max(1, Number(item.quantity) || 1) };
    });
  });

  const updateCart = (updatedCart: CartItemType[]) => {
    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const toggleCart = (id: string) => {
    const existingItem = cart.find(item => item.id === id);

    const updatedCart = existingItem
      ? cart.filter(item => item.id !== id)
      : [...cart, { id, quantity: 1 }];

    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const deleteCart = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);

    updateCart(updatedCart);
  };

  const changeQuantity = (id: string, amount: number) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item,
    );

    updateCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, toggleCart, clearCart, deleteCart, changeQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart Error');
  }

  return context;
};
