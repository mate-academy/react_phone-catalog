import React, { useCallback, useMemo } from 'react';
import { ProductInCart } from '../types/ProductInCart';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Context = {
  cartProducts: ProductInCart[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
  clearCart: () => void;
};

const State: Context = {
  cartProducts: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
};

export const CartContext = React.createContext(State);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<ProductInCart[]>(
    'cart',
    [],
  );

  const addToCart = useCallback(
    (product: Product) => {
      const existingProduct = cartProducts.find(
        cartItem => cartItem.product.itemId === product.itemId,
      );

      if (existingProduct) {
        setCartProducts(
          cartProducts.map(cartItem =>
            cartItem.product.itemId === product.itemId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        );
      } else {
        const newProduct: ProductInCart = {
          id: product.itemId,
          product,
          quantity: 1,
        };

        setCartProducts([...cartProducts, newProduct]);
      }
    },
    [cartProducts, setCartProducts],
  );

  const removeFromCart = useCallback(
    (id: string | number) => {
      setCartProducts(
        cartProducts.filter(cartItem => cartItem.product.itemId !== id),
      );
    },
    [cartProducts, setCartProducts],
  );

  const increaseQuantity = useCallback(
    (id: string | number) => {
      const updatedCart = cartProducts.map(cartItem =>
        cartItem.product.itemId === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );

      setCartProducts(updatedCart);
    },
    [cartProducts, setCartProducts],
  );

  const decreaseQuantity = useCallback(
    (id: string | number) => {
      const updatedCart = cartProducts.map(cartItem =>
        cartItem.product.itemId === id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem,
      );

      setCartProducts(updatedCart);
    },
    [cartProducts, setCartProducts],
  );

  const clearCart = useCallback(() => {
    setCartProducts([]);
  }, [setCartProducts]);

  const value = useMemo(
    () => ({
      cartProducts,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [
      cartProducts,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      increaseQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
