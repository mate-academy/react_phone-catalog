import React, { useEffect, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../api';
import { ProductList } from '../ProductList/ProductList';
import styles from './FavoritesPage.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import homeIcon from '../ProductCard/components/img/Home.png';
import arrowRight from '../CatalogPage/components/img/arrow-right.png';

export const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const favoriteProducts = products.filter(product =>
    favoriteIds.includes(product.itemId),
  );

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const visibleFavoriteProducts = favoriteProducts.filter(product =>
    product.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbHome} aria-label="Home">
          <img className={styles.breadcrumbIcon} src={homeIcon} alt="Home" />
        </Link>

        <img
          className={styles.breadcrumbSeparator}
          src={arrowRight}
          alt="arrowRight"
        />

        <span className={styles.breadcrumbCurrent}>Favorites</span>
      </nav>

      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.desctiption}>
        {visibleFavoriteProducts.length} items
      </p>

      {!favoriteProducts.length ? (
        <p className={styles.emptyState}>Your favorites list is empty</p>
      ) : !visibleFavoriteProducts.length ? (
        <p className={styles.emptyState}>
          There are no products matching the query
        </p>
      ) : (
        <ProductList products={visibleFavoriteProducts} />
      )}
    </div>
  );
};
