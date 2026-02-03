import Favorites from '../components/Favorites/Favorites';
import PathCategory from '../components/PathCategory/PathCategory';
import { useFavoritesStore } from '../store/Favoritesstore';
import Layout from './Layout';

const FavoritesPage = () => {
  const totalItems = useFavoritesStore(state => state.getTotalItems());

  return (
    <Layout>
      <PathCategory totalProducts={totalItems} />
      <Favorites />
    </Layout>
  );
};

export default FavoritesPage;
