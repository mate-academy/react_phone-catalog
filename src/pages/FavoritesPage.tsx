import Favorites from '../components/Favorites/Favorites';
import PathCategory from '../components/PathCategory/PathCategory';
import { useAppSelector } from '../store';
import { selectTotalFavorites } from '../store/slices/favoritesSlice';
import Layout from './Layout';

const FavoritesPage = () => {
  const totalItems = useAppSelector(selectTotalFavorites);

  return (
    <Layout>
      <PathCategory totalProducts={totalItems} />
      <Favorites />
    </Layout>
  );
};

export default FavoritesPage;
