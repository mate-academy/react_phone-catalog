import React, { createContext, useState, useContext, useEffect } from 'react';
import { Products } from '../types/Alltypes';

type CartItem = {
  quantity: number;
  product: Products;
};

type CartContextType = {
  cart: CartItem[];
  favorites: string[];
  addToCart: (product: Products) => void;
  removeFromCart: (product: Products) => void;
  updateQuantity: (product: Products, quantity: number) => void;
  toggleFavorite: (id: string) => void;
  clearCart: () => void;
  totalQuantity: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (item: Products) => {
    // dodae tovar //
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => String(cartItem.product.id) === String(item.id),
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.product.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prevCart, { id: item, quantity: 1, product: item }];
    });
  };

  const removeFromCart = (product: Products) => {
    //vidalye tovar //
    setCart(prevCart =>
      prevCart.filter(item => item.product.id !== product.id),
    );
  };

  const updateQuantity = (product: Products, quantity: number) => {
    const productId = product.id;

    if (quantity <= 0) {
      removeFromCart(product);

      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id],
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        totalQuantity,
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
