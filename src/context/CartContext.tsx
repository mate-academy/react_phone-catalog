import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartItemType } from '../types/CartItemType';
import { Product } from '../types/Product';

type CartContextType = {
  cart: CartItemType[],
  setCart: (v: CartItemType[]) => void,
  handleAddToCart: (newProduct: Product) => void,
  removeFromCart: (productId: number) => void,
  increaseQuantity: (productId: number) => void,
  decreaseQuantity: (productId: number) => void,
};

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  handleAddToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItemType>('cart', []);

  function handleAddToCart(newProduct: Product) {
    if (cart.some(item => item.product.itemId === newProduct.itemId)) {
      setCart(
        [...cart].filter(item => item.product.itemId !== newProduct.itemId),
      );
    } else {
      setCart([
        ...cart,
        {
          id: cart.length + 1,
          quantity: 1,
          product: newProduct,
        },
      ]);
    }
  }

  const removeFromCart = (productId: number) => setCart(
    cart.filter(item => item.id !== productId),
  );

  const increaseQuantity = (productId: number) => {
    const cartCopy = [...cart];

    const currentProduct = cartCopy.find(item => item.id === productId);

    if (currentProduct) {
      currentProduct.quantity += 1;
      setCart(cartCopy);
    }
  };

  const decreaseQuantity = (productId: number) => {
    const cartCopy = [...cart];

    const currentProduct = cartCopy.find(item => item.id === productId);

    if (currentProduct) {
      currentProduct.quantity -= 1;
      setCart(cartCopy);
    }
  };

  const value = ({
    cart,
    setCart,
    handleAddToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  });

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
