import { createContext, useState, useEffect } from 'react';
import { Product } from '../components/types/Product';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const safeId = String(product.itemId || product.id);
      const isExist = prev.find(item => item.id === safeId);

      if (isExist) {
        return prev;
      }

      // return [...prev, { id: product.itemId || '', quantity: 1, product }];
      return [...prev, { id: safeId, quantity: 1, product }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, amount: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;

          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }

        return item;
      }),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
