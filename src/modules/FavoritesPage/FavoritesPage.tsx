import React, { useMemo } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PageInfo } from '../../components/PageInfo';
import { ProductsType } from '../../types/ProductsType';
import { Loader } from '../../components/Loader';
import styles from './FavoritesPage.module.scss';
import { useAppSelector } from '../../app/hooks';
import { useCategoriesRTK } from '../../hooks/useCategoriesRTK';

export const FavoritesPage = () => {
  const { items: favorites } = useAppSelector(state => state.favorites);

  const {
    categorie: products,
    loading,
    error,
  } = useCategoriesRTK(ProductsType.Products);

  const currentProducts = useMemo(
    () => products.filter(el => favorites.includes(el.itemId)),
    [favorites, products],
  );

  return (
    <div className="container">
      <Breadcrumbs />
      <PageInfo title="Favourites" count={favorites.length} />

      <section className="section">
        {favorites.length === 0 ? (
          <h3 className={styles.favorites__empty}>
            The list of favorite products is empty.
          </h3>
        ) : loading ? (
          <Loader />
        ) : error ? (
          'error'
        ) : (
          <ProductsList products={currentProducts} />
        )}
      </section>
    </div>
  );
};
