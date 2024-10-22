import React, { useContext, useMemo, useState } from 'react';
import { Product } from '../types/Product';

interface FavouriteContext {
  favouriteProducts: Product[];
  handleFavourites: (newProduct: Product) => void;
}

export const FavouriteProductsContext = React.createContext<FavouriteContext>({
  favouriteProducts: [] as Product[],
  handleFavourites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavouriteProductsProvider: React.FC<Props> = ({ children }) => {
  const favouritesFromStorage = localStorage.getItem('favouriteProducts');
  const favourites = useMemo(
    () => (favouritesFromStorage ? JSON.parse(favouritesFromStorage) : []),
    [favouritesFromStorage],
  );

  const [favouriteProducts, setFavouriteProducts] =
    useState<Product[]>(favourites);

  const updateFavouriteProducts = (data: Product[]) => {
    setFavouriteProducts(data);

    localStorage.setItem('favouriteProducts', JSON.stringify(data));
  };

  const handleFavourites = (newProduct: Product) => {
    const likedProduct = favouriteProducts.find(
      (favourite: Product) => favourite.id === newProduct.id,
    );

    if (likedProduct) {
      const updatedFavourites = favouriteProducts.filter(
        (favourite: Product) => favourite.id !== newProduct.id,
      );

      updateFavouriteProducts(updatedFavourites);
    } else {
      updateFavouriteProducts([...favouriteProducts, newProduct]);
    }
  };

  const value = {
    favouriteProducts,
    handleFavourites,
  };

  return (
    <FavouriteProductsContext.Provider value={value}>
      {children}
    </FavouriteProductsContext.Provider>
  );
};

export const useFavouriteProducts = () => useContext(FavouriteProductsContext);
