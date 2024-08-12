import classNames from 'classnames';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { ProductContent } from '../components/ProductContent';
import { useFavorites } from '../contexts/FavoritesContext';
import { ProductNotFound } from '../components/ProductNotFound';

export const FavoritePage = () => {
  const { favorites } = useFavorites();

  if (!favorites.length) {
    return <ProductNotFound />;
  }

  return (
    <div className="favorite-page">
      <div className="favorite-page__navigation">
        <Breadcrumbs />
      </div>

      <div className="favorite-page__title-block">
        <h2>Favourites</h2>
        <p className={classNames('body-text', 'favorite-page__items-info')}>
          {favorites.length} items
        </p>
      </div>

      <ProductContent items={favorites} />
    </div>
  );
};
