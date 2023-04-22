import { useContext, useMemo } from 'react';
import ProductsPage from '../../components/ProductsPage/ProductsPage';
import { FavoritesContext } from '../../contexts/FavoritesContext';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const products = useMemo(() => {
    return favorites.map(favorite => favorite.product);
  }, [favorites]);

  return (
    <ProductsPage
      isDisPag
      isDisSelects
      title="Favorites"
      products={products}
    />
  );
};

export default Favorites;
