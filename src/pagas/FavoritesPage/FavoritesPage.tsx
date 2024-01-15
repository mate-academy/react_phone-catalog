import { useEffect, useState } from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs';

import './FavoritesPage.scss';
import { ProductList } from '../../components/ProductList';

export const FavoritesPage = () => {
  const [favProducts, setFavProducts] = useState([]);

  useEffect(() => {
    const getFavoritesProduct = localStorage.getItem('favourites');
    const favorProducts = getFavoritesProduct
      ? JSON.parse(getFavoritesProduct) : [];

    setFavProducts(favorProducts);
  }, []);

  return (
    <div className="container">
      <div className="FavouritesPage">
        <BreadCrumbs />
        <h1 className="FavouritesPage__title">Favourites</h1>
        <p className="FavouritesPage__count">
          {favProducts ? `${favProducts.length} ${favProducts.length <= 1 ? 'model' : 'models'}` : '0 models'}
        </p>
        {favProducts.length
          && (
            <ProductList products={favProducts} />
          )}
      </div>
    </div>
  );
};
