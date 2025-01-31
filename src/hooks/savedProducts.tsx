import React, { createContext, useContext, useEffect, useState } from 'react';

interface ProductsContextType {
  likedProducts: number[];
  cartProducts: number[];
  countProductsMap: { [key: number]: number };
  toggleLike: (productId: number) => void;
  toggleCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateProductCount: (productId: number, count: number) => void;
  clearCart: () => void;
}

type Props = {
  children: React.ReactNode;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('likedProducts') || '[]'),
  );
  const [cartProducts, setCartProducts] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('cartProducts') || '[]'),
  );
  const [countProductsMap, setCountProductsMap] = useState<{
    [key: number]: number;
  }>(() => JSON.parse(localStorage.getItem('countProductsMap') || '{}'));

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    localStorage.setItem('countProductsMap', JSON.stringify(countProductsMap));
  }, [countProductsMap]);

  const toggleLike = (productId: number) => {
    setLikedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    );
  };

  const toggleCart = (productId: number) => {
    setCartProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    );
  };

  const removeFromCart = (productId: number) => {
    setCartProducts(prev => prev.filter(id => id !== productId));
  };

  const clearCart = () => {
    setCartProducts([]);
    setCountProductsMap({});
  };

  const updateProductCount = (productId: number, count: number) => {
    setCountProductsMap(prev => ({ ...prev, [productId]: count }));
  };

  return (
    <ProductsContext.Provider
      value={{
        likedProducts,
        cartProducts,
        countProductsMap,
        toggleLike,
        toggleCart,
        removeFromCart,
        updateProductCount,
        clearCart,
      }}
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
