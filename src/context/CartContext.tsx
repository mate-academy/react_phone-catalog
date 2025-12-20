import { createContext, useContext, useEffect, useState } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  priceDiscount?: number;
  images: string[];
}

export interface CartItem {
  id: string;
  quantity: number;
  product: CartProduct;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalCount: number;
  isInCart: (id: string) => boolean;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: CartProduct) => {
    setItems(prev =>
      prev.some(i => i.id === product.id)
        ? prev
        : [...prev, { id: product.id, quantity: 1, product }],
    );
  };

  const removeFromCart = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id));

  const increase = (id: string) =>
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );

  const decrease = (id: string) =>
    setItems(prev =>
      prev.map(i =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    );

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce(
    (s, i) => s + (i.product.priceDiscount ?? i.product.price) * i.quantity,
    0,
  );

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  const isInCart = (id: string) => items.some(i => i.id === id);
  const cartCount = totalCount;
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        clearCart,
        totalPrice,
        totalCount,
        isInCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
