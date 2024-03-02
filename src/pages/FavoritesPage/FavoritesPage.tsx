import { useContext } from 'react';
import { Catalog } from '../../components/Catalog';
import { CartContext } from '../../components/CartContext/CartContext';

export const FavoritesPage = () => {
  const {
    favoriteProducts,
    isLoading,
    isError,
  } = useContext(CartContext);

  return (
    <Catalog
      products={favoriteProducts}
      isLoading={isLoading}
      isError={isError}
      isNavigation={false}
      pageTitle="Favorites"
    />
  );
};
