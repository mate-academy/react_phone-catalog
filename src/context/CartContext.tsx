import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { CartContextType, CartItem } from '../types/CartContextType';
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  const addToCart = (product: Product) => {
    setCart(prev => {
      const isExist = prev.find(item => item.id === product.id);

      if (isExist) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addToFavorites = (product: Product) => {
    setFavorites(prev =>
      prev.find(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product],
    );
  };

  const changeQuantity = (id: number, action: 'plus' | 'minus') => {
    setCart(prev => {
      const targetItem = prev.find(item => item.id === id);

      if (action === 'minus' && targetItem?.quantity === 1) {
        return prev.filter(item => item.id !== id);
      }

      return prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === 'plus' ? item.quantity + 1 : item.quantity - 1,
            }
          : item,
      );
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: number) => cart.some(item => item.id === id);
  const isInFavorites = (id: number) => favorites.some(item => item.id === id);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToFavorites,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        isInCart,
        isInFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
