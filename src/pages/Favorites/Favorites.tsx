import { useContext, useMemo } from 'react';
import ProductsPage from '../../components/ProductsPage/ProductsPage';
import { FavoritesContext } from '../../contexts/FavoritesContext';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const products = useMemo(() => {
    return favorites.map(({ product }) => product);
  }, [favorites]);

  return (
    <ProductsPage
      isDisPag={favorites.length <= 8}
      isDisSelects
      title="Favorites"
      products={products}
      emptyName="Your favorites is empty"
    />
  );
};

export default Favorites;
