import './FavoritesPage.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import React, { useContext } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductContext } from '../../store/ProductContext';

export const FavoritesPage = () => {
  const { inFavourites } = useContext(ProductContext);

  return (
    <div className="favorites container">
      {inFavourites.length > 0 ? (
        <>
          <Breadcrumbs />
          <h1 className="favorites__title">Favourites</h1>
          <p className="favorites__amount-models">{inFavourites.length}</p>

          <section className="products__cards">
            {inFavourites.map(phone => (
              <React.Fragment key={`${phone.id}`}>
                <div className="products__item">
                  <ProductCard product={phone} key={phone.id} />
                </div>
              </React.Fragment>
            ))}
          </section>
        </>
      ) : (
        <>
          <div className="favorites__content">
            <p className="favorites__text">Your Favourites is empty...</p>
            <div className="favorites__empty"></div>
          </div>
        </>
      )}
    </div>
  );
};
