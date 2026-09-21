import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import styles from './PhonesPage.module.scss';

export const PhonesPage: React.FC = () => {
  const [products, setPhones] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('age');
  const [perPage, setPerPage] = useState<string>('16');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      const phoneProducts = data.filter(item => item.category === 'phones');

      setPhones(phoneProducts);
    });
  }, []);

  // 1. Сортировка товаров
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'age':
          return (b.year || 0) - (a.year || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [products, sortBy]);

  // 2. Расчет среза для пагинации
  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const total = sortedProducts.length;

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage, perPage]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.count}>{total} models</p>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="sort-select" className={styles.label}>
            Sort by
          </label>
          <select
            id="sort-select"
            className={styles.select}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="age">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>

          <label htmlFor="per-page-select" className={styles.label}>
            Items on page
          </label>
          <select
            id="per-page-select"
            className={styles.select}
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="16">16</option>
            <option value="8">8</option>
            <option value="4">4</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {perPage !== 'all' && (
        <Pagination
          total={total}
          perPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
