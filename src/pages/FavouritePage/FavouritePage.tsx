import React from 'react';
import { useFavouriteValues } from '../../store/FavouriteContext';
import { GoBackBttn } from '../../components/GoBackBttn';
import { Card } from '../../components/Card';

export const FavouritePage: React.FC = () => {
  const { favourites, favouritesCount } = useFavouriteValues();

  return (
    <>
      <div className="goBackButton__favouritesPage">
        <GoBackBttn />
      </div>

      <h1 className="favouritesPage__title">Favourites</h1>

      {favourites.length >= 0 ? (
        <>
          {favouritesCount >= 1 ? (
            <p className="favouritesPage__amount">{favouritesCount} items</p>
          ) : (
            <>
              <p className="favouritesPage__amount">{favouritesCount} item</p>
              <h3 className="cartPage__empty">
                There are no favourite products yet
              </h3>
            </>
          )}

          <div className="favouritesPage">
            <div className="favouritesPage__list">
              {favourites.map(item => {
                const { product } = item;

                return (
                  <div className="favouritesPage__list--card" key={product.id}>
                    <Card product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <h3 className="cartPage__empty">There are no favourite products yet</h3>
      )}
    </>
  );
};
