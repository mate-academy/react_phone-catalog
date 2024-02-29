import {
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import { PhoneCatalogContext } from '../../PhoneCatalogContext';
import { ProductCard } from '../ProductCard/ProductCard';

export const Favorite = () => {
  const { favorite, query, setQuery } = useContext(PhoneCatalogContext);

  const searchedFavorite = useMemo(() => favorite.filter((phone) => phone.name
    .toLowerCase()
    .includes(query.toLowerCase())),
  [query]);

  const firstLoad = useRef(true);
  const path = useLocation();

  useEffect(() => {
    if (!firstLoad.current) {
      const queryParams = new URLSearchParams();

      queryParams.set('query', query);

      const newUrl = `http://localhost:3000/#/favorites?${queryParams.toString()}`;

      window.history.replaceState(null, '', newUrl);
    }

    firstLoad.current = false;
  }, [query]);

  useEffect(() => {
    const urlParams = new URLSearchParams(path.search);

    const urlQuery = urlParams.get('query') || '';

    setQuery(urlQuery || query);
  }, []);

  return (
    <div className="favoritePage">
      <div className="favoritePage__nav">
        <Link to="/" className="favoritePage__nav__home" />
        <div className="arrow arrow-right" />
        <div className="favoritePage__nav__title">Favorites</div>
      </div>
      <div className="favoritePage__title bold">Favorites</div>
      {searchedFavorite.length > 0 ? (
        <div className="favoritePage__subtitle body-text">{`${favorite.length} items`}</div>
      ) : (
        <div className="favoritePage__subtitle body-text">No items found.</div>
      )}
      <div className="favoritePage__list">
        <div className="grid-container">
          {searchedFavorite.map(product => {
            return (
              <ProductCard
                product={product}
                data-cy="cardsContainer"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
