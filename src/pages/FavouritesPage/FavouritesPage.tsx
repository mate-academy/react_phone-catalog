import { useContext } from 'react';

import './favourites-page.scss';
import { Breadcrumbs } from '../../components/UX/Breadcrumbs';
import { StoreContext } from '../../contexts/StoreContext';
import { ProductCard } from '../../components/ProductCard';
import { NoResults } from '../../components/UX/NoResults';
import { NoResultsCaseName } from '../../types/NoResultsCase';
import {
  useProductsPreparation,
} from '../../customHooks/useProductsPreparation';

export const FavouritesPage = () => {
  const { products, favouriteIds } = useContext(StoreContext);
  const favourites = products.filter(
    product => favouriteIds.includes(product.itemId),
  );
  const { visibleProducts, query } = useProductsPreparation(favourites);

  return (
    <section className="favourites-page">
      <div className="favourites-page__breadcrumbs"><Breadcrumbs /></div>

      <h1 className="favourites-page__title">Favourites</h1>

      <p className="favourites-page__items-counter">
        {`${favouriteIds.length} items`}
      </p>

      {(query && !!visibleProducts.length) && (
        <h2 className="favourites-page__search-results">
          {`Search results for "${query}":`}
        </h2>
      )}

      {(!!favourites.length && !!visibleProducts.length) && (
        <div className="favourites-page__product-cards">
          {visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              hasDiscount={false}
              product={product}
            />
          ))}
        </div>
      )}

      {(!!favourites.length && !visibleProducts.length) && (
        <NoResults
          caseName={NoResultsCaseName.NoSearchResults}
          query={query}
        />
      )}

      {!favouriteIds.length && (
        <NoResults
          caseName={NoResultsCaseName.EmptyFavourites}
        />
      )}
    </section>
  );
};
