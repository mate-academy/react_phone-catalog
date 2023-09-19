import React, { useContext, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import { FavContext } from '../../providers/FavProvider/FavProvider';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { NoSearchResults }
  from '../../components/NoSearchResults/NoSearchResults';

import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const { favoriteProducts } = useContext(FavContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredFavorites = useMemo(() => {
    return favoriteProducts.filter((favProd) => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedName = favProd.name.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
    });
  }, [favoriteProducts, query]);

  return (
    <div className="FavoritesPage">
      <div className="container">
        <div className="FavoritesPage__content">
          <Breadcrumbs />

          {filteredFavorites.length === 0 && !query && (
            <h1
              className="FavoritesPage__title FavoritesPage__title--no-products"
            >
              You don&apos;t have any favorite products. Maybe you want to
              choose something in
              {' '}
              <Link className="FavoritesPage__link" to="/phones">
                Phones
              </Link>
              ,
              {' '}
              <Link className="FavoritesPage__link" to="/tablets">
                Tablets
              </Link>
              {' '}
              or
              {' '}
              <Link className="FavoritesPage__link" to="/accessories">
                Accessories
              </Link>
              {' '}
              ?
            </h1>
          )}

          {filteredFavorites.length === 0 && query && <NoSearchResults />}

          {filteredFavorites.length > 0 && (
            <>
              <h1 className="FavoritesPage__title">Favorites</h1>
              <div className="FavoritesPage__quantity">{`${filteredFavorites.length} items`}</div>

              <div className="FavoritesPage__list">
                {filteredFavorites.map((favProduct) => (
                  <ProductCard
                    product={favProduct}
                    key={favProduct.id || favProduct.phoneId}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
