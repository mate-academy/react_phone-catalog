import React from "react";
import { Product } from "../types/Product";
import { useLocalStorage } from "../helpers/useLocalStorage";

type State = {
  favourites: Product[],
  setFavourites: (products: Product[]) => void,
  addToFavourites: (product: Product) => void,
}

const initialState: State = {
  favourites: [],
  setFavourites: () => {},
  addToFavourites: () => {},
}

export const FavouritesContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
}

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>('favourites', []);

  const addToFavourites = (product: Product) => {
    if(favourites.some(
      item => item.id === product.id
    )) {
      setFavourites(favourites.filter(item => item.id !== product.id))
    } else {
      setFavourites([...favourites, product])
    }
  }

  const value: State = {
    favourites,
    setFavourites,
    addToFavourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
