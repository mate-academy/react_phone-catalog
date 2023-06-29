import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { useFav } from '../../contexts/favContext';
import { Search } from '../../components/Search/Search';
import './FavoritesPage.scss';

const FavoritesPage = () => {
  const [searchParams] = useSearchParams();
  const { favItems } = useFav();
  const query = searchParams.get('query') || '';

  if (query) {
    return <Search query={query} products={favItems} />;
  }

  return (
    <div className="favorites">
      <Breadcrumbs />
      <h1 className="favorites__title">Favorites</h1>

      <p className="favorites__count">{`${favItems.length} items`}</p>

      <ProductsList products={favItems} />
    </div>
  );
};

export default FavoritesPage;
