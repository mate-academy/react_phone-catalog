import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { CartContextType } from '../type/CartType';
import { CartProduct } from '../type/Product';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartList, setCartList] = useState<{
    [id: string]: CartProduct;
  } | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartList');

    if (savedCart) {
      setCartList(JSON.parse(savedCart));
    } else {
      setCartList({});
    }
  }, []);

  useEffect(() => {
    if (cartList) {
      localStorage.setItem('cartList', JSON.stringify(cartList));
    }
  }, [cartList]);

  return (
    <CartContext.Provider value={{ cartList, setCartList }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
