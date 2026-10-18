import { useEffect, useState } from 'react';

import { getProducts } from '../../services/products';
import type { Product } from '../../types';
import { ProductCard } from '../shared/components/ProductCard';

import styles from './PhonesPage.module.scss';

type SortBy = 'age' | 'title' | 'price';

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('age');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(16);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {
        setError('Unable to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const phones = products
    .filter(product => product.category === 'phones')
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.name.localeCompare(b.name);

        case 'price':
          return a.price - b.price;

        case 'age':
        default:
          return b.year - a.year;
      }
    });

  const totalPages = Math.ceil(phones.length / perPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const startIndex = (currentPage - 1) * perPage;

  const visiblePhones = phones.slice(startIndex, startIndex + perPage);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Mobile phones</h1>

      <p className={styles.count}>{phones.length} models</p>

      <div className={styles.filters}>
        <div className={styles.controls}>
          <label htmlFor="sortBy">Sort by</label>

          <select
            id="sortBy"
            value={sortBy}
            onChange={event => {
              setSortBy(event.target.value as SortBy);
              setCurrentPage(1);
            }}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.controls}>
          <label htmlFor="perPage">Items on page</label>

          <select
            id="perPage"
            value={perPage}
            onChange={event => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={phones.length}>All</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {visiblePhones.map(phone => (
          <ProductCard key={phone.id} product={phone} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Previous
        </button>

        {pageNumbers.map(page => (
          <button
            key={page}
            type="button"
            className={currentPage === page ? styles.activePage : ''}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </button>
      </div>
    </main>
  );
};
