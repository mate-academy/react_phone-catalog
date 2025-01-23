import React, { useContext, useState } from 'react';

interface ProductsContextType {
  likedProducts: number[];
  cartProducts: number[];
  toggleLike: (productId: number) => void;
  toggleCart: (productId: number) => void;
}

type Props = {
  children: React.ReactNode;
};

const ProductsContext = React.createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('likedProducts') || '[]'),
  );

  const [cartProducts, setCartProducts] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('cartProducts') || '[]'),
  );

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => {
      const updated = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('likedProducts', JSON.stringify(updated));

      return updated;
    });
  };

  const toggleCart = (productId: number) => {
    setCartProducts(prev => {
      const updated = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('cartProducts', JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <ProductsContext.Provider
      value={{ likedProducts, cartProducts, toggleLike, toggleCart }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider',
    );
  }

  return context;
};
