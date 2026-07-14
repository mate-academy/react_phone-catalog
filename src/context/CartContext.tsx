import React, { createContext, useState, useContext, useEffect } from 'react';
import { Products } from '../types/Alltypes';

type CartItem = {
  quantity: number;
  product: Products;
};

type CartContextType = {
  cart: CartItem[];
  favorites: Products[];
  addToCart: (product: Products) => void;
  removeFromCart: (product: Products) => void;
  updateQuantity: (product: Products, quantity: number) => void;
  toggleFavorite: (product: Products) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalQuantityFav: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [favorites, setFavorites] = useState<Products[]>(() => {
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
        cartItem => cartItem.product.itemId === item.itemId,
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.product.itemId === item.itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prevCart, { quantity: 1, product: item }];
    });
  };

  const removeFromCart = (product: Products) => {
    //vidalye tovar //
    setCart(prevCart =>
      prevCart.filter(item => item.product.itemId !== product.itemId),
    );
  };

  const updateQuantity = (product: Products, quantity: number) => {
    const productId = product.itemId;

    if (quantity <= 0) {
      removeFromCart(product);

      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.product.itemId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const toggleFavorite = (product: Products) => {
    setFavorites(prevFavorites =>
      prevFavorites.some(fav => fav.itemId === product.itemId)
        ? prevFavorites.filter(fav => fav.itemId !== product.itemId)
        : [...prevFavorites, product],
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalQuantityFav = favorites.length;

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
        totalQuantityFav,
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
