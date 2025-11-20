import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from './components/ProductsList';
import { Loader } from './components/Loader';
import { Pagination } from './components/Pagination';
import { Product } from '../ProductDetailsPage/ProductDetailsPage';

export const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Params URL
  const sort = searchParams.get('sort') || 'age';
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');

  const page = pageParam ? parseInt(pageParam) : 1;
  const perPage = perPageParam === 'all' ? products.length : parseInt(perPageParam || '8');

  // Fetch API
  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch('/api/phones.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load');
        }
        return res.json();
      })
      .then((data: Product[]) => {
        let sorted = [...data];

        if (sort === 'age') sorted.sort((a, b) => b.year - a.year);
        if (sort === 'title') sorted.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === 'price') sorted.sort((a, b) => (a.price - a.discount) - (b.price - b.discount));

        setProducts(sorted);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [sort]);

  const handleReload = () => {
    setSearchParams(searchParams);
  };

  return (
    <main className="products-page">
      <h1>Phones Page</h1>

      {loading && <Loader />}

      {error && (
        <div>
          <p>Something went wrong</p>
          <button onClick={handleReload}>Reload</button>
        </div>
      )}

      {!loading && !error && products.length === 0 && <p>There are no phones yet</p>}

      {!loading && !error && products.length > 0 && (
        <>
          {/* Sort */}
          <label>
            Sort:
            <select
              value={sort}
              onChange={(e) => {
                const val = e.target.value;
                setSearchParams((prev) => {
                  if (val === 'age') prev.delete('sort');
                  else prev.set('sort', val);
                  return prev;
                });
              }}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>

          {/* Products list */}
          <ProductsList
            products={products.slice((page - 1) * perPage, page * perPage)}
          />

          {/* Pagination */}
          <Pagination
            totalItems={products.length}
            currentPage={page}
            perPage={perPage}
            onPageChange={(p) => {
              const params = new URLSearchParams(searchParams);
              if (p === 1) params.delete('page');
              else params.set('page', p.toString());
              setSearchParams(params);
            }}
            onPerPageChange={(pp) => {
              const params = new URLSearchParams(searchParams);
              if (pp === products.length) params.delete('perPage');
              else params.set('perPage', pp.toString());
              setSearchParams(params);
            }}
          />
        </>
      )}
    </main>
  );
};
