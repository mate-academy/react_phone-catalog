import React, { useEffect, useState } from 'react';
//import ProductsSlider from './components/ProductsSlider/index';
//import PicturesSlider from './components/PicturesSlider/index';


interface Product {
  id?: string | number;
  name?: string;
  [key: string]: unknown;
}

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = '/api/products.json';

  const loadProducts = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (signal?.aborted) {
        setError('Unknown error');

        return;
      }

      const data: Product[] = await response.json();

      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    void loadProducts(controller.signal);

    return () => controller.abort();
  }, []);

  return (
    <>
      <h1 className="title">Product Catalog</h1>
      <div className="HomePage">
        {loading && <div>Loading...</div>}
        {error && <div role="alert">Error: {error}</div>}
        {products && products.length === 0 && <div>No products found.</div>}
        {!loading &&
          !error &&
          Array.isArray(products) &&
          products.map((p, i) => (
            <div key={p.id ?? i}>{p.name ?? JSON.stringify(p)}</div>
          ))}
      </div>
    </>
  );
};
