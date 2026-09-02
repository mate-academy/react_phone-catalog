import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/services/products';
import { ProductCard } from '../shared/components/ProductCard';
import { Dropdown } from '../shared/components/Dropdown';
import { Pagination } from '../shared/components/Pagination';
import styles from './ProductsPage.module.scss';

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const category = pathname.replace('/', '');

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '8';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(data => {
        const filtered = data.filter(item => item.category === category);

        setProducts(filtered);
      })
      .catch(() => {
        setError('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());
    setSearchParams(params);
  };

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sortBy) {
      case 'title':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return list.sort((a, b) => a.price - b.price);
      case 'age':
        return list.sort((a, b) => b.year - a.year);
      default:
        return list;
    }
  }, [products, sortBy]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const itemsPerPage = Number(perPage);
    const start = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, perPage, currentPage]);

  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.status}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {category === 'phones'
          ? 'Mobile phones'
          : category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <p className={styles.count}>{`${products.length} models`}</p>

      {products.length > 0 && (
        <div className={styles.filters}>
          <Dropdown
            label="Sort by"
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={handleSortChange}
          />
          <Dropdown
            label="Items on page"
            value={perPage}
            options={PER_PAGE_OPTIONS}
            onChange={handlePerPageChange}
          />
        </div>
      )}

      {products.length === 0 ? (
        <p className={styles.status}>There are no products in this category</p>
      ) : (
        <>
          <div className={styles.grid}>
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {perPage !== 'all' && (
            <Pagination
              total={products.length}
              perPage={Number(perPage)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
