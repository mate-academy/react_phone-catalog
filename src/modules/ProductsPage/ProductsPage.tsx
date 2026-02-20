import React, { useEffect, useState } from 'react';
import ProductsList from '../../components/ProductsList/index';
import { Product } from '../../../public/api/types/Product';

type ProductsPageProps = {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
};

export const ProductsPage: React.FC<ProductsPageProps> = ({
  category,
  title,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddToCart = (productId: string) => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', productId);
  };

  const handleToggleFavorite = (productId: string) => {
    // TODO: Implement toggle favorite logic
    console.log('Toggle favorite:', productId);
  };

  useEffect(() => {
    const ctrl = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/products.json', { signal: ctrl.signal });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();

        setProducts(data);
      } catch (err) {
        if ((err as DOMException).name === 'AbortError') {
          return;
        }

        setError((err as Error).message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => ctrl.abort();
  }, [category]);

  const filteredProducts = products.filter(
    p => String(p.category).toLowerCase() === category,
  );

  return (
    <>
      <div>
        <section id={category} aria-label={title}>
          <h1>{title}</h1>

          {!loading && !error && Array.isArray(products) && (
            <ProductsList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </section>
      </div>
      <div className="product-errors">
        {loading && <div>Loading...</div>}
        {error && <div role="alert">Error: {error}</div>}
        {products && products.length === 0 && <div>No products found.</div>}
      </div>
    </>
  );
};
