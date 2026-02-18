/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Category, isCategory } from '../../types/categories';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import ProductCard from '../../componenst/ProductCard';
import styles from './Products.module.scss';

const Products: React.FC = () => {
  const params = useParams();
  const raw = params.category;
  const category: Category = isCategory(raw) ? raw : 'phones';

  const [items, setItems] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);
    setItems(null);

    getProducts(category)
      .then(res => {
        if (!mounted) {
          return;
        }

        setItems(res);
      })
      .catch(err => {
        if (!mounted) {
          return;
        }

        setError(err?.message || 'Failed to load products');
      })
      .finally(() => {
        if (!mounted) {
          return;
        }

        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [category]);

  return (
    <section className={styles.productsPage}>
      <h1 className={styles.productsPage__title}>
        {category.charAt(0).toUpperCase() + category.slice(1)} page
      </h1>

      {loading && <p>Loading products…</p>}

      {error && (
        <div>
          <p>Something went wrong: {error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && items && items.length === 0 && (
        <p>There are no {category} yet.</p>
      )}

      {!loading && !error && items && items.length > 0 && (
        <div className={styles.productsPage__grid}>
          {items.map(p => (
            <div className={styles.productsPage__card} key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
