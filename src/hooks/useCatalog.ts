import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import getProducts from '../api/products';

const getSortedProducts = (items: Product[], sort: string) => {
  switch (sort) {
    case 'newest':
      return [...items].sort((a, b) => b.year - a.year);
    case 'alphabetically':
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    case 'cheapest':
      return [...items].sort((a, b) => a.price - b.price);
    default:
      return items;
  }
};

export const useCatalog = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = await getProducts();

      setProducts(data.filter(p => p.category === category));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const sortedProducts = useMemo(
    () => getSortedProducts(products, sortBy),
    [products, sortBy],
  );

  const filteredProducts = useMemo(() => {
    if (!query) {
      return sortedProducts;
    }

    return sortedProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [sortedProducts, query]);

  const perPageNum = perPage === 'all' ? filteredProducts.length : +perPage;
  const start = (currentPage - 1) * perPageNum;
  const visibleProducts = filteredProducts.slice(start, start + perPageNum);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', value);
    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    setSearchParams(params);
  };

  return {
    products,
    loading,
    error,
    loadProducts,
    sortBy,
    perPage,
    perPageNum,
    currentPage,
    query,
    filteredProducts,
    sortedProducts,
    visibleProducts,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  };
};
