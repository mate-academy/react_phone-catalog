import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import styles from './PhonesPage.module.scss';
import { getBaseUrl } from '../../utils/BaseUrl';

export const PhonesPage: React.FC = () => {
  const [products, setPhones] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Считываем значение из URL или ставим дефолт
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      const phoneProducts = data.filter(item => item.category === 'phones');

      setPhones(phoneProducts);
    });
  }, []);

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

  // Обновляем searchParams при изменении фильтров
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', e.target.value);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('perPage', e.target.value);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  };

  return (
    <div className={styles.container}>
      {/* ХЛЕБНЫЕ КРОШКИ */}
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <img
            src={`${getBaseUrl()}img/icons/home.svg`}
            alt="Home"
            className={styles.homeIcon}
          />
        </Link>
        <span className={styles.arrow}>›</span>
        <span className={styles.activeBreadcrumb}>Phones</span>
      </div>

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
        </div>

        <div className={styles.filterGroupSmall}>
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

      {perPage !== 'all' && total > itemsPerPage && (
        <Pagination
          total={total}
          perPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
