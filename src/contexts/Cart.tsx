import { createContext, useContext, useEffect, useState } from 'react';

interface CartContextType {
  isInCart: (id: number) => boolean;
  toggleCart: (id: number) => void;
  cartList: CartItemType[];
  clearCartList: () => void;
  count: number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

const CartContext = createContext<CartContextType>({
  isInCart: () => false,
  toggleCart: () => {},
  cartList: [],
  clearCartList: () => {},
  count: 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

interface Props {
  children: React.ReactNode;
}

export interface CartItemType {
  id: number;
  quantity: number;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartList, setCartList] = useState<CartItemType[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]') as CartItemType[];

    setCartList(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartList));
  }, [cartList]);

  const isInCart = (id: number) => {
    return cartList.some(item => item.id === id);
  };

  const toggleCart = (id: number) => {
    setCartList(prev =>
      prev.some(item => item.id === id)
        ? prev.filter(item => item.id !== id)
        : [...prev, { id, quantity: 1 }],
    );
  };

  const count = cartList.length;

  const increaseQuantity = (id: number) => {
    setCartList(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item,
      ),
    );
  };

  const clearCartList = () => {
    setCartList([]);
  }

  return (
    <CartContext.Provider
      value={{ isInCart, toggleCart, cartList, clearCartList, count, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
