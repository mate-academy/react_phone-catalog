import React, { useMemo } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PageInfo } from '../../components/PageInfo';
import { useSaveProducts } from '../../context/SaveProductsContext';
import { useCategories } from '../../hooks/useCategories';
import { ProductsType } from '../../types/ProductsType';
import { Loader } from '../../components/Loader';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { isFavorite, favoriteIds } = useSaveProducts();
  const {
    categorie: products,
    loading,
    error,
  } = useCategories(ProductsType.Products);

  const currentProducts = useMemo(
    () => products.filter(el => isFavorite(el.itemId)),
    [isFavorite, products],
  );

  return (
    <div className="container">
      <Breadcrumbs />
      <PageInfo title="Favourites" count={favoriteIds.length} />

      <section className="section">
        {favoriteIds.length === 0 ? (
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
