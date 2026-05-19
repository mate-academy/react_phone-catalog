import React, { useEffect, useState } from 'react';
import { Product } from '../../types/ProductType';
import { getProductData } from '../../api/fetchClient';
import styles from '../FavoritesPage/FavoritesPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { useCartAndFavContext } from '../shared/context/CartAndFavContext';
import { PathLine } from '../../components/PathLine/indes';

export const FavoritesPage = () => {
  const [counts, setCounts] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<Product[] | null>(
    null,
  );

  const context = useCartAndFavContext();
  const { favorites } = context;

  useEffect(() => {
    async function fetchData() {
      const prData = await getProductData();

      setProducts(prData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (products && products.length >= 1) {
      const toSetProducts = products.filter(prod =>
        favorites.includes(prod.itemId),
      );

      setVisibleProducts(toSetProducts);
      setCounts(toSetProducts.length);
    } else {
      setVisibleProducts([]);
      setCounts(0);
    }
  }, [products, favorites]);

  const filteredYears = visibleProducts?.map(prod => prod.year) || [];

  const lastYear = filteredYears.length > 0 ? Math.max(...filteredYears) : 2026;

  if (favorites.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.top}>
          <PathLine />
        </div>
        <div className={styles.empty}>
          <img
            src="/src/images/favorite-is-empty.png"
            className={styles.empty__image}
            alt="cart is empty"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <PathLine />
        <div className={styles.title}>
          <h1>FavoritesPage</h1>
          <div className={styles.count}>{counts} models</div>
        </div>
      </div>

      <div className={styles.items}>
        {visibleProducts?.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            discount={product.year <= lastYear - 3}
          />
        ))}
      </div>
    </div>
  );
};
