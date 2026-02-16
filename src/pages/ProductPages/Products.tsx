/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Category, isCategory } from '../../types/categories';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';

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
    <section className="products-page">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} page</h1>

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
        <ul>
          {items.map(p => {
            const price =
              (p as any).priceDiscount ??
              (p as any).priceRegular ??
              (p as any).price;

            return (
              <li key={p.id}>
                <Link
                  to={`/product/${category}/${p.id}`}
                  state={{ product: p }}
                >
                  {p.name}
                </Link>{' '}
                — {price ?? '—'}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Products;
