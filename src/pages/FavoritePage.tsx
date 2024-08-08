import classNames from 'classnames';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { ProductContent } from '../components/ProductContent';

export const FavoritePage = () => {
  return (
    <div className="favorite-page">
      <div className="favorite-page__navigation">
        <Breadcrumbs />
      </div>

      <div className="favorite-page__title-block">
        <h2>Favourites</h2>
        <p className={classNames('body-text', 'favorite-page__items-info')}>
          5 items
        </p>
      </div>

      <ProductContent />
    </div>
  );
};
