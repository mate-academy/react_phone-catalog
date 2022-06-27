import { useContext, useMemo } from 'react';
import { FavoritesContext } from '../context/FavoritesProvider';
import { Product } from '../types/Product';
import ProductPage from './ProductPage';

type Props = {
  list: Product[];
};

const Favorites: React.FC<Props> = ({ list }) => {
  const { favorites } = useContext(FavoritesContext);

  const favoritesList = useMemo(() => {
    return list.filter(item => favorites.includes(item.id));
  }, [favorites]);

  return (
    <>
      <ProductPage
        list={favoritesList}
        title="Favorites"
        showSorting={false}
      />
    </>
  );
};

export default Favorites;
