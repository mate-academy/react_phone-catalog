import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from './components/ProductList';
import { Pagination } from './components/Pagination';
import { Loader } from './components/Loader';
import { Product } from '../ProductDetailsPage/ProductDetailsPage';

export const AccessoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const sort = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || '16';

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch('/api/accessories.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return (a.price - a.discount) - (b.price - b.discount);
      case 'newest':
      default:
        return b.year - a.year;
    }
  });

  const perPageNum = perPageParam === 'all' ? sortedProducts.length : Number(perPageParam);
  const startIndex = (page - 1) * perPageNum;
  const visibleProducts = sortedProducts.slice(startIndex, startIndex + perPageNum);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (newSort === 'newest') params.delete('sort');
      else params.set('sort', newSort);
      params.set('page', '1'); // reset page
      return params;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (newPage === 1) params.delete('page');
      else params.set('page', String(newPage));
      return params;
    });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value === 'all') params.delete('perPage');
      else params.set('perPage', value);
      params.delete('page'); // reset page
      return params;
    });
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div>
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  if (products.length === 0) return <p>There are no accessories yet.</p>;

  return (
    <main>
      <h1>Accessories Page</h1>

      <div>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sort} onChange={handleSortChange}>
          <option value="newest">Newest</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="cheapest">Cheapest</option>
        </select>
      </div>

      <ProductsList products={visibleProducts} />

      <Pagination
        total={sortedProducts.length}
        perPage={perPageNum}
        currentPage={page}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </main>
  );
};
