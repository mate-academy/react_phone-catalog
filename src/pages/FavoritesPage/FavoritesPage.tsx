import { FC, useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Notification } from '../../components/Notification/Notification';
import { filterProducts } from '../../helpers/filterProducts';
import { Loader } from '../../components/Loader';
import { NotificationMessage } from '../../types/NotificationMessage';

import './FavoritesPage.scss';

export const FavoritesPage: FC = () => {
  const { favorites } = useAppSelector(store => store.favorites);
  const {
    appliedSearchQuery,
    isSearchLoading,
  } = useAppSelector(store => store.search);

  const filteredProducts = useMemo(() => {
    return filterProducts(favorites, appliedSearchQuery);
  }, [favorites, appliedSearchQuery]);

  const renderProducts = () => {
    return filteredProducts.length ? (
      <div className="favorites__products">
        <ProductsList products={filteredProducts} />
      </div>
    ) : (
      <Notification message={NotificationMessage.NoMatchingProducts} />
    );
  };

  let content;

  if (!isSearchLoading) {
    content = renderProducts();
  } else {
    content = <Loader />;
  }

  return (
    <div className="favorites-page">
      <section className="favorites">
        <div className="favorites__wrapper">
          <div className="favorites__nav">
            <Breadcrumbs />
          </div>

          <h1 className="favorites__title">Favorites</h1>

          {!!filteredProducts.length && !isSearchLoading && (
            <div className="favorites__count">
              {`${filteredProducts.length} ${filteredProducts.length === 1
                ? 'item'
                : 'items'}`}
            </div>
          )}
        </div>

        {!favorites.length ? (
          <Notification message={NotificationMessage.NoFavoriteItems} />
        ) : content}
      </section>
    </div>
  );
};
