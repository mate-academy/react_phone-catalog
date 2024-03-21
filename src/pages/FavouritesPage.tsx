import React, { useEffect, useState } from 'react';

import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsCatalog } from '../components/ProductsCatalog';

import { Product } from '../types/Product';
import { Favorites } from '../utils/Favorites';

export const FavouritesPage: React.FC = () => {
  const [favoritesProducts, setFavoritesProducts] = useState([] as Product[]);

  useEffect(() => {
    Favorites.load();

    const updateFavoritesProducts = () => {
      setFavoritesProducts([...Favorites.items.map(item => item.product)]);
    };

    updateFavoritesProducts();

    Favorites.subscribe(updateFavoritesProducts);

    return () => {
      Favorites.unsubscribe(updateFavoritesProducts);
    };
  }, []);

  return (
    <section className="Main__favoritesPage">
      <div className="Main__breadcrumbs">
        <Breadcrumbs />
      </div>

      <h1>Favourites</h1>

      {!favoritesProducts.length && (
        <div className="Main__noItemsBlock">
          <h1>You don&apos;t have your favourites products yet</h1>
          <p className="Main__text">
            You can add product to favourites by clicking{' '}
            <i className="far fa-heart Main__heart" /> on{' '}
            <span className="Main__text--bold">product card</span> or on{' '}
            <span className="Main__text--bold">product page</span>
          </p>
        </div>
      )}

      {!!favoritesProducts.length && (
        <ProductsCatalog products={favoritesProducts} />
      )}
    </section>
  );
};
