import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import favoritesPage from './FavoritesPage.module.scss';
import { ProductsList } from '../shared/ProductsList';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ProductsContext } from '../../context/ProductsContext';
import { getAllProducts } from '../../api/getProducts';
import { Loader } from '../../components/Loader';

export const FavoritesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { favoritesIds } = useContext(FavoritesContext);

  const { allProducts, setAllProducts } = useContext(ProductsContext);

  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then(setAllProducts)
      .catch(() => {
        'error';
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setAllProducts]);

  const favoritesProducts = allProducts.filter(product =>
    favoritesIds.includes(product.id.toString()),
  );

  return (
    <div className={favoritesPage['favorites-page']}>
      <Breadcrumbs />
      {favoritesProducts.length === 0 ? (
        <h2 className={favoritesPage['favorites-page__title']}>
          Your favorites list is empty
        </h2>
      ) : (
        <div>
          <h2 className={favoritesPage['favorites-page__title']}>Favourites</h2>
          {!isLoading ? (
            <>
              <span
                className={favoritesPage['favorites-page__quantity']}
              >{`${favoritesProducts.length} items`}</span>
              <ProductsList products={favoritesProducts} />
            </>
          ) : (
            <Loader />
          )}
        </div>
      )}
    </div>
  );
};
