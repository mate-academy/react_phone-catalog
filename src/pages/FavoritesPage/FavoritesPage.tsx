import { useContext } from 'react';
import { FavoritesContext } from '../../helpers/LocaleStorageContext';
import { ProductsList } from '../../components/ProductsList';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <ProductsList
      products={favorites}
      title="Favorites"
      isFavorites
    />
  );
};
