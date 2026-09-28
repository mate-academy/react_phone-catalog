import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './CatalogPage.module.scss';

interface Props {
  title: string;
  category: 'phones' | 'tablets' | 'accessories';
}

export const CatalogPage: React.FC<Props> = ({ title, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    const BASE_URL = import.meta.env.BASE_URL || '/';
    const normalizedBase = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

    fetch(`${normalizedBase}api/products.json`)
      .then(res => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter(p => p.category === category);

        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'price') {
      return a.price - b.price;
    }

    if (sortBy === 'age') {
      return b.year - a.year;
    }

    return 0;
  });

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleProducts = sortedProducts.slice(
    startIdx,
    startIdx + itemsPerPage,
  );
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{products.length} models</p>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="sort-select" className={styles.label}>
            Sort by
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className={styles.select}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="per-page-select" className={styles.label}>
            Items on page
          </label>
          <select
            id="per-page-select"
            value={perPage}
            onChange={handlePerPageChange}
            className={styles.select}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              type="button"
              key={page}
              className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
              onClick={() => {
                searchParams.set('page', String(page));
                setSearchParams(searchParams);
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
