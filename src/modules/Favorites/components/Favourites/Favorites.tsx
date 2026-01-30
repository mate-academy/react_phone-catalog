/* eslint-disable max-len */
import React from 'react';
import { useFavorites } from '@modules/shared/components/Context/';
import { CurrentPath } from '@modules/shared/components/CurrentPath/';
import { ProductList } from '@modules/ProductPage/components/ProductsList/';
import { ComponentTitle } from '@modules/shared/components/ComponentTitle/';
import { Icon } from '@modules/shared/components/Icon/';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
      <main className="favorites__main container">
        <CurrentPath additionalClass="favorites__path" />
        <ComponentTitle
          rawTitle="Favorites"
          amountOfitems={favorites?.length}
        />

        {favorites?.length !== 0 ? (
          <div className="favorites__list">
            <ProductList productsToShow={favorites} />
          </div>
        ) : (
          <div className="favorites__empty">
            <Icon iconSlug="BookHeart" toIncludeBaseIconClass={false} />
            <h3 className="favorites__emptyText">
              Favorites is empty, explore
            </h3>
          </div>
        )}
      </main>
    </div>
  );
};
