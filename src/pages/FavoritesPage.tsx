import { useContext, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ProductCard } from '../components/ProductCard';
import { FavouriteContext } from '../context/FavouriteContext';
import './FavoritesPage.scss';

export const FavouritePage: React.FC = () => {
  const { favouriteProducts } = useContext(FavouriteContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredProducts = useMemo(() => {
    return favouriteProducts.filter((prod) => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedName = prod.name.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
    });
  }, [favouriteProducts, query]);

  return (
    <div className="favourites">
      <div className="container">
        <div className="favourites__content">
          <BreadCrumbs />

          {filteredProducts.length === 0 && !query && (
            <h1 className="favourites__title favourites__title--nothing">
              You have not any favourite products. Maybe you want
              to choose something
              {' '}
              <Link
                to="/phones"
                className="favourites__link"
              >
                Phone
              </Link>
              ,
              {' '}
              <Link
                to="/tablets"
                className="favourites__link"
              >
                Tablets
              </Link>
              {' '}
              or
              {' '}
              <Link
                to="/accessories"
                className="favourites__link"
              >
                Accessories
              </Link>
              {' '}
              ?
            </h1>
          )}

          {filteredProducts.length === 0 && query && (
            <p>No search results</p>
          )}

          {filteredProducts.length > 0 && (
            <div className="favourites__wrap">
              <h1 className="favourites__title">
                Favourites
              </h1>
              <div className="favourites__quantity">
                {`${filteredProducts.length} items`}
              </div>

              <div className="favourites__list">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    product={prod}
                    key={prod.id || prod.phoneId}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
