import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import './FavouritesPage.scss';
import { FavAndCartContext } from '../../components/context/FavAndCartContext';
import { ProductList } from '../../components/ProductList';
import emptyFav from '../../assets/icons/EmptyFav.svg';
import { NoSearchResults } from '../../components/NoSearchResults';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useContext(FavAndCartContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')
    || '';

  const visibleProducts = useMemo(() => {
    if (query) {
      return favourites.filter(item => (
        item.name.toLowerCase().includes(query.toLowerCase())
      ));
    }

    return favourites;
  }, [query, favourites]);

  return (
    <section className="page__section">
      <div className="container">
        <div className="favourites">
          <Breadcrumbs />

          <h1 className="favourites__title title">Favourites</h1>

          {query && !visibleProducts.length && (
            <NoSearchResults />
          )}

          {!visibleProducts.length && !query && (
            <div className="empty">
              <img
                className="empty__img"
                src={emptyFav}
                alt="Empty fav"
              />

              <p className="empty__message">Your favourites is empty</p>
            </div>
          )}

          {!!visibleProducts.length && (
            <>
              <span className="favourites__quantity">
                {visibleProducts.length > 1 ? (
                  `${visibleProducts.length} items`
                ) : (
                  `${visibleProducts.length} item`
                )}
              </span>

              <ProductList products={visibleProducts} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
