import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductCard } from '../../components/ProductCard';
import { getPreparedProducts } from '../../utils/getPrepareProducts';
import { NoSearchResults } from '../../components/NoSearchResults';

import './favoritesPage.scss';

export const FavoritesPage = () => {
  const favorites = useAppSelector(state => state.favorites);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  if (!favorites) {
    return (
      <div className="favoritespage">
        <div className="container">
          <BreadCrumbs />

          <h1 className="title rainbow-text favoritespage__title">
            Favorites
          </h1>

          <div className="favoritespage__no-items">
            {query
              ? <NoSearchResults />
              : 'There are no favorite products yet'}
          </div>
        </div>
      </div>
    );
  }

  const preparedProducts = getPreparedProducts(favorites, { query });

  return (
    <div className="favoritespage">
      <div className="container">
        <BreadCrumbs />

        <h1 className="title rainbow-text favoritespage__title">
          Favorites
        </h1>

        {preparedProducts.length === 0 && query && (
          <div className="favoritespage__no-items">
            <NoSearchResults />
          </div>
        )}

        {preparedProducts.length === 0 && !query && (
          <p className="favoritespage__no-items">
            There are no favorite products yet
          </p>
        )}

        {preparedProducts.length > 0 && (
          <>
            <span className="favoritespage__quantity">
              {preparedProducts.length === 1
                ? `${preparedProducts.length} item`
                : `${preparedProducts.length} items`}
            </span>

            <div className="favoritespage__items">
              {preparedProducts.map(favorite => (
                <ProductCard key={favorite.id} product={favorite} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
