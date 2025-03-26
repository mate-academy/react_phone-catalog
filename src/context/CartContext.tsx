import { createContext } from 'react';
import { Product } from '../types/Product';
import { useContext, useEffect, useState } from 'react';

type CartContextType = {
  cart: Product[];
  totalPrice: number;
  addProductToCart: (product: Product) => void;
  deleteProductFromCart: (product: Product) => void;
  increaseProductQuantity: (productId: number) => void;
  decreaseProductQuantity: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');

      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      // console.error('Помилка при зчитуванні з localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      // console.error('Помилка при записі в localStorage:', error);
    }

    const total = cart.reduce(
      (totalSum, product) => totalSum + product.price * (product.quantity ?? 1),
      0,
    );

    setTotalPrice(total);
  }, [cart]);

  const addProductToCart = (product: Product) => {
    setCart(prevState => [...prevState, product]);
  };

  const deleteProductFromCart = (product: Product) => {
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

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addProductToCart,
        deleteProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
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
