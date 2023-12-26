import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StorContext } from '../context/StorContext';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { SearchWindow } from '../components/SearchWindow/SearchWindow';

import '../styles/FavouritePage.scss';

export const FavouritePage = () => {
  const { favorites, favCount } = useContext(StorContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredProducts = query === ''
    ? [...favorites]
    : [...favorites].filter(prod => (
      prod.name.toLowerCase().includes(query.toLowerCase())));

  return (
    <div className="favourites">
      {query && (
        <SearchWindow product={filteredProducts} />
      )}
      {!query && (
        <>
          <div className="favourites__top">
            <Breadcrumbs />
          </div>

          <h1 className="favourites__title">Favourites</h1>

          <p className="favourites__count">
            {favCount}
            {' '}
            models
          </p>

          <div className="favourites__list">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
