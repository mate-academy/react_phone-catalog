import React, { useState, useMemo } from 'react';
import { FavContextType } from '../../types/FavContextType';
import { Product } from '../../types/Product';

export const FavContext = React.createContext<FavContextType>({
  favProducts: [],
  setFavProducts: () => {},
  addToFav: () => {},
});

export const FavProvider: React.FC = ({ children }) => {
  const [favProducts, setFavProducts] = useState<Product[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]'),
  );

  const addToFav = (product: Product) => {
    const addedProducts = localStorage.getItem('favorites');

    if (addedProducts === null || JSON.parse(addedProducts).length === 0) {
      localStorage.setItem('favorites', JSON.stringify([product]));
      setFavProducts([product]);

      return;
    }

    let newProducts = JSON.parse(addedProducts);

    const isProductAdded = newProducts
      .some((prod: Product) => prod.id === product?.id);

    if (isProductAdded) {
      newProducts = newProducts
        .filter((prod: Product) => prod.id !== product?.id);
    } else {
      newProducts = [...newProducts, product];
    }

    if (newProducts.length === 0) {
      localStorage.removeItem('favorites');
      setFavProducts([]);

      return;
    }

    localStorage.setItem('favorites',
      JSON.stringify(newProducts));

    setFavProducts(newProducts);
  };

  const contextValue: FavContextType = useMemo(() => {
    return {
      favProducts,
      setFavProducts,
      addToFav,
    };
  }, [favProducts]);

  return (
    <FavContext.Provider value={contextValue}>
      {children}
    </FavContext.Provider>
  );
};
