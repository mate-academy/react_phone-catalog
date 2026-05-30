import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';

export const useProducts = (category: string) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query')?.toLowerCase() || '';
  const page = Number(searchParams.get('page')) || 1;

  const rawPerPage = searchParams.get('perPage') || '16';
  const isAll = rawPerPage.toLowerCase() === 'all';

  const filtered = useMemo(() => {
    return allProducts.filter(product => product.category === category);
  }, [allProducts, category]);

  const searched = useMemo(() => {
    if (!query) {
      return filtered;
    }

    return filtered.filter(product =>
      product.name.toLowerCase().includes(query),
    );
  }, [filtered, query]);

  const sorted = useMemo(() => {
    switch (sort) {
      case 'age':
        return [...searched].sort((a, b) => b.year - a.year);
      case 'title':
        return [...searched].sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return [...searched].sort((a, b) => a.price - b.price);
      default:
        return searched;
    }
  }, [searched, sort]);

  const perPageNum = isAll ? sorted.length : Number(rawPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const startTime = Date.now();
        const response = await fetch('api/products.json');
        const data = await response.json();

        const elapsed = Date.now() - startTime;
        const delay = Math.max(300 - elapsed, 0);

        setTimeout(() => {
          setAllProducts(data);
          setLoading(false);
        }, delay);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadTrigger]);

  const reload = () => {
    setReloadTrigger(prev => prev + 1);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    allProducts.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });

    return counts;
  }, [allProducts]);

  const paginated = useMemo(() => {
    if (isAll) {
      return sorted;
    }

    const start = (page - 1) * perPageNum;

    return sorted.slice(start, start + perPageNum);
  }, [sorted, page, perPageNum, isAll]);

  const totalPages = useMemo(() => {
    return isAll ? 1 : Math.ceil(sorted.length / perPageNum);
  }, [sorted.length, perPageNum, isAll]);

  const topDiscounted = useMemo(() => {
    return [...filtered]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 10);
  }, [filtered]);

  return {
    products: paginated,
    loading,
    error,
    total: sorted.length,
    totalPages,
    categoryCounts,
    topDiscounted,
    reload,
  };
};
