import React, { useContext, useEffect } from 'react';
import { CatalogContext } from '../Contexts/CatalogContext';
import { Card } from '../Card/Card';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useContext(CatalogContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="page__main-title">Favourites</h1>
      <BreadCrumbs category={'Favourites'} />

      <div className="page__container">
        <div className="page__category goods">
          <div className="goods__top">
            <h2 className="goods__title">Favourites</h2>
            <p className="goods__count-items">{`${favourites.length} models`}</p>
          </div>
          {!!favourites.length ? (
            <div className="goods__list">
              {favourites.map(product => (
                <div className="goods__item" key={product.id}>
                  <Card model={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="page-not-found">
              <h3 className="page-not-found__title">No favourites yet</h3>
              <img
                src="img/cart-is-empty.png"
                alt="empty cart"
                className="page-not-found__image"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
