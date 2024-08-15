import { useContext } from 'react';
import { Products } from '../../components/Products';
import { FavouritesContext } from '../../context/favouritesContext';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavouritesContext);

  return <Products title="Favourites" products={favourites} />;
};
