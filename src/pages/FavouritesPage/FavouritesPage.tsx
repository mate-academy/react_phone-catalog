import { useContext } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { GlobalContext } from '../../GlobalContext';

export const FavouritesPage = () => {
  const { favouriteItems } = useContext(GlobalContext);

  return (
    <ProductsList products={favouriteItems} />
  );
};
