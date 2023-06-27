import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { useFav } from '../../contexts/favContext';
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favItems } = useFav();

  return (
    <div className="favorites">
      <Breadcrumbs />
      <h1 className="favorites__title">Favorites</h1>

      <p className="favorites__count">{`${favItems.length} items`}</p>

      <ProductsList products={favItems} />
    </div>
  );
};
