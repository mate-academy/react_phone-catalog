import { useContext } from 'react';

import './favourites-page.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { StoreContext } from '../../contexts/StoreContext';
import { ProductCard } from '../../components/ProductCard';
import { NoResults } from '../../components/NoResults';
import { NoResultsCaseName } from '../../types/NoResultsCase';

export const FavouritesPage = () => {
  const { products, favouriteIds } = useContext(StoreContext);
  const favourites = products.filter(
    product => favouriteIds.includes(product.itemId),
  );

  return (
    <section className="favourites-page">
      <div className="favourites-page__breadcrumbs"><Breadcrumbs /></div>

      <h1 className="favourites-page__title">Favourites</h1>

      <p className="favourites-page__items-counter">
        {`${favouriteIds.length} items`}
      </p>

      {favouriteIds.length ? (
        <div className="favourites-page__product-cards">
          {favourites.map(product => (
            <ProductCard
              key={product.id}
              hasDiscount={false}
              product={product}
            />
          ))}
        </div>
      ) : (
        <NoResults
          caseName={NoResultsCaseName.EmptyFavourites}
        />
      )}
    </section>
  );
};
