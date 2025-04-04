import { createContext } from 'react';
import { Product } from '../types/Product';
import { useContext, useEffect, useState } from 'react';

type CartContextType = {
  cart: Product[];
  totalPrice: number;
  cartLength: number;
  addProductToCart: (product: Product) => void;
  deleteProductFromCart: (product: Product) => void;
  increaseProductQuantity: (productId: number) => void;
  decreaseProductQuantity: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartLength, setCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');

      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {}

    const total = cart.reduce(
      (totalSum, product) => totalSum + product.price * (product.quantity ?? 1),
      0,
    );

    const length = cart.reduce((totalSum, product) => {
      const quantity = Number(product.quantity ?? 1);

      return totalSum + quantity;
    }, 0);

    setCartLength(length);

    setTotalPrice(total);
  }, [cart]);

  const addProductToCart = (product: Product) => {
    setCart(prevState => [...prevState, product]);
  };

  const deleteProductFromCart = (product: Product) => {
    const quantity = Number(product.quantity ?? 1);

    setCartLength(prevLength => prevLength - quantity);
    setCart(prevCart => prevCart.filter(p => p.id !== product.id));
  };

  const increaseProductQuantity = (productId: number) => {
    setCart(prevCart =>
      prevCart.map(product =>
        product.id === productId
          ? { ...product, quantity: (product.quantity || 1) + 1 }
          : product,
      ),
    );
  };

  const decreaseProductQuantity = (productId: number) => {
    setCart(prevCart => {
      return prevCart
        .map(product =>
          product.id === productId
            ? { ...product, quantity: (product.quantity ?? 1) - 1 }
            : product,
        )
        .filter(product => (product.quantity ?? 1) > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        cartLength,
        addProductToCart,
        deleteProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
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
