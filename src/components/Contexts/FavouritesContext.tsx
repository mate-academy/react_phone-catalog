import React, { useContext, useEffect, useState } from 'react';
import { ProductsType } from '../../types/Products';
import { ProductContext } from './ProductsContext';

type FavouritesContextProps = {
  favProducts: ProductsType[];
  addFavouriteProduct: (id: string) => void;
};

export const FavouritesContext = React.createContext<FavouritesContextProps>({
  favProducts: [],
  addFavouriteProduct: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favProducts, setFavProducts] = useState<ProductsType[]>([]);

  const { addItem, deleteItem, checkProduct } = useContext(ProductContext);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      setFavProducts(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favProducts));
  }, [favProducts]);

  const addFavouriteProduct = (id: string) => {
    const item = checkProduct(id, favProducts);

    setFavProducts(
      item ? deleteItem(id, favProducts) : addItem(id, favProducts),
    );
  };

  return (
    <FavouritesContext.Provider value={{ favProducts, addFavouriteProduct }}>
      {children}
    </FavouritesContext.Provider>
  );
};
