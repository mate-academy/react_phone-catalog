import './FavoritesPage.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useFavorites } from './FavoritesContext/FavoritesContext';
import { ProductsList } from '../PhonesPage/components/ProductsList';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container">
      <Breadcrumbs />
      <div className="page-title">Favorites</div>
      <div className="page-subtitle">{favorites.length} items</div>
      <section className="favorites">
        {favorites.length === 0 && (
          <h2 className="favorites__empty section-title">
            No favorite items found
          </h2>
        )}
        <ProductsList products={favorites} />
      </section>
    </div>
  );
};
