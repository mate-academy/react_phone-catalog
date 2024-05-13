import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import './FavoritesPage.scss';
import { GlobalContext } from '../../components/Context/Context';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { NoResults } from '../../components/NoResults/NoResults';

export const FavoritesPage = () => {
  const { favorites } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredFavorites = useMemo(() => {
    if (query) {
      return favorites.filter(item => item.name.toLowerCase().includes(query));
    }

    return favorites;
  }, [favorites, query]);

  return (
    <div className="favorites">
      <div className="container">
        <div className="favorites__content">
          <div className="favorites__breadcrambs">
            <Breadcrumbs category="Favorites" />
          </div>
          <h1 className="favorites__title title--h1">Favorites</h1>

          {!favorites.length && (
            <NoResults
              message="Your favorites is empty"
              description="Take a look at our catalog
              to find someting you may like"
            />
          )}

          {favorites.length > 0 && (
            <>
              <p className="favorites__items-count">
                {favorites.length === 1
                  ? '1 item'
                  : `${favorites.length} items`}
              </p>

              <div className="favorites__list">
                {filteredFavorites.map(product => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>

              {filteredFavorites.length === 0 && (
                <NoResults message="No search results..." />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
