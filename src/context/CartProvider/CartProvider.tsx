import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Product } from '../../types/Product';

export interface CartProduct extends Product {
  quantity: number;
}

type CartAction = 'increment' | 'decrement';

interface CartContextType {
  cartProducts: CartProduct[];
  addCartProduct: (product: Product) => void;
  removeCartProduct: (itemId: string) => void;
  changeQuantity: (itemId: string, action: CartAction) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  addCartProduct: () => {},
  removeCartProduct: () => {},
  changeQuantity: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

const getInitialState = (): CartProduct[] => {
  try {
    const savedCart = localStorage.getItem('cartProducts');

    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    return [];
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] =
    useState<CartProduct[]>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    } catch (error) {}
  }, [cartProducts]);

  const addCartProduct = useCallback((productToAdd: Product) => {
    setCartProducts(prevCart => {
      const existingProduct = prevCart.find(
        p => p.itemId === productToAdd.itemId,
      );

      if (existingProduct) {
        return prevCart.map(p =>
          p.itemId === productToAdd.itemId
            ? { ...p, quantity: p.quantity + 1 }
            : p,
        );
      }

      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
  }, []);

  const removeCartProduct = useCallback((itemIdToRemove: string) => {
    setCartProducts(prevCart =>
      prevCart.filter(product => product.itemId !== itemIdToRemove),
    );
  }, []);

  const changeQuantity = useCallback((itemId: string, action: CartAction) => {
    setCartProducts(prevCart => {
      const product = prevCart.find(p => p.itemId === itemId);

      if (action === 'decrement' && product?.quantity === 1) {
        return prevCart.filter(p => p.itemId !== itemId);
      }

      return prevCart.map(p => {
        if (p.itemId === itemId) {
          const newQuantity =
            action === 'increment' ? p.quantity + 1 : p.quantity - 1;

          return { ...p, quantity: newQuantity };
        }

        return p;
      });
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartProducts([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      cartProducts,
      addCartProduct,
      removeCartProduct,
      changeQuantity,
      clearCart,
    }),
    [
      addCartProduct,
      cartProducts,
      changeQuantity,
      clearCart,
      removeCartProduct,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
