import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ProductsList from '../../components/ProductsList/index';
import { Product } from '../../../public/api/types/Product';
import Pagination from '../../components/Pagination/index';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredProducts = products.filter(
    p => String(p.category).toLowerCase() === category,
  );
  const total = filteredProducts.length;

  const rawPerPage = searchParams.get('perPage');
  let perPage: number | 'all' = rawPerPage
    ? rawPerPage === 'all'
      ? 'all'
      : Number(rawPerPage)
    : 16;

  if (perPage !== 'all' && ![4, 8, 16].includes(perPage)) {
    perPage = 'all';
  }

  const effectivePerPage = perPage === 'all' ? total : perPage;
  const totalPages =
    effectivePerPage === 0
      ? 1
      : Math.max(1, Math.ceil(total / effectivePerPage));
  const rawPage = searchParams.get('page');
  const pageParsed = rawPage ? Math.max(1, Number(rawPage) || 1) : 1;
  const normalizedPage = Math.min(pageParsed, totalPages);
  const start =
    perPage === 'all' ? 0 : (normalizedPage - 1) * (perPage as number);
  const end = perPage === 'all' ? total : start + (perPage as number);
  const visibleProducts = filteredProducts.slice(start, end);

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

  const handleAddToCart = (productId: string) => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', productId);
  };

  const handleToggleFavorite = (productId: string) => {
    // TODO: Implement toggle favorite logic
    console.log('Toggle favorite:', productId);
  };

  const handlePaginationChange = (
    newPage: number,
    newPerPage: number | 'all',
  ) => {
    const params = new URLSearchParams(searchParams);

    if (newPerPage === 'all') {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('perPage', String(newPerPage));
      params.delete('page');
    }

    if (newPage > 1) {
      params.set('page', String(newPage));
    } else {
      params.delete('page');
    }

    setSearchParams(params);
  };

  return (
    <>
      <div>
        <section id={category} aria-label={title}>
          <h1>{title}</h1>

          {!loading && !error && Array.isArray(visibleProducts) && (
            <ProductsList
              products={visibleProducts}
              handleAddToCart={handleAddToCart}
              handleToggleFavorite={handleToggleFavorite}
            />
          )}

          {total > 0 && effectivePerPage < total && (
            <Pagination
              total={total}
              currentPage={normalizedPage}
              perPage={perPage}
              onChange={handlePaginationChange}
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
