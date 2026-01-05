import React, { createContext, useContext, useState } from 'react';
import { ProductType } from 'models/product.model';

type ProductsContextType = {
  products: ProductType[];
  cart: ProductType[];
  favorites: ProductType[];

  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;

  addToFav: (product: ProductType) => void;
  removeFromFav: (productId: number) => void;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products] = useState<ProductType[]>([]);

  const [cart, setCart] = useState<ProductType[]>([]);
  const [favorites, setFavorites] = useState<ProductType[]>([]);

  const addToCart = (product: ProductType) => {
    setCart(prev => {
      const exists = prev.some(item => item.id === product.id);

      if (exists) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const addToFav = (product: ProductType) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);

      if (exists) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromFav = (productId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        cart,
        favorites,
        addToCart,
        removeFromCart,
        addToFav,
        removeFromFav,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// custom hooks
export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
