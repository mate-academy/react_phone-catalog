import { FC, useContext, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { ProductsList } from '../shared/ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import './FavoritesPage.scss';

const FAVORITES_TITLE = 'Favorites';

export const FavoritesPage: FC = () => {
  const { favorites } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('query')?.trim() || '';

  const pageTitle = useMemo(() => {
    const pathSegment = pathname.slice(1);

    return pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
  }, [pathname]);

  const filteredFavorites = useMemo(() => {
    if (!searchQuery) {
      return favorites;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    return favorites.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery),
    );
  }, [favorites, searchQuery]);

  const favoriteCountText = useMemo(() => {
    const count = filteredFavorites.length;

    return `${count} ${count === 1 ? 'model' : 'models'}`;
  }, [filteredFavorites.length]);

  const renderEmptyState = () => {
    const message = searchQuery
      ? `No ${pageTitle.toLowerCase()} match your query`
      : 'Your favorites list is empty';

    return <div className="favoritesPage__empty-content">{message}</div>;
  };

  const renderFavoritesList = () => (
    <div className="favoritesPage__content">
      <ProductsList products={filteredFavorites} displayType="with-discount" />
    </div>
  );

  return (
    <div className="favoritesPage">
      <Breadcrumbs productType={FAVORITES_TITLE} />

      <h1 className="favoritesPage__title">{pageTitle}</h1>

      <span className="favoritesPage__description">{favoriteCountText}</span>

      {filteredFavorites.length > 0
        ? renderFavoritesList()
        : renderEmptyState()}
    </div>
  );
};
