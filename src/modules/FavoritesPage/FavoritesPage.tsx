import React, { useEffect, useState } from 'react';
import { Product } from '../../types/ProductType';
import { getData } from '../../api/fetchClient';
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
      const prData = await getData();

      setProducts(prData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (products && products.length >= 1) {
      const toSetProducts = products.filter(prod =>
        favorites.includes(prod.id),
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

  return (
    <>
      <div className={styles.section}>
        <div className={styles.top}>
          <PathLine />
          <div className={styles.title}>
            <div className={styles.title__text}>FavoritesPage</div>
            <div className={styles.title__count}>{counts} models</div>
          </div>
        </div>

        <div className={styles.items}>
          {visibleProducts?.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              discont={product.year <= lastYear - 3}
            />
          ))}
        </div>
      </div>
    </>
  );
};
