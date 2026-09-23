import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard, Product } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { getProducts } from '../../api/products';
import { getBaseUrl } from '../../utils/BaseUrl';
import styles from './TabletsPage.module.scss';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('age');
  const [perPage, setPerPage] = useState<string>('16');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);

    // Загружаем каталог и фильтруем по категории 'tablets'
    getProducts()
      .then((data: Product[]) => {
        const tabletProducts = data.filter(item => item.category === 'tablets');

        setTablets(tabletProducts);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error('Failed to load tablets:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedProducts = useMemo(() => {
    return [...tablets].sort((a, b) => {
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
  }, [tablets, sortBy]);

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
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <img src={`${getBaseUrl()}img/icons/home.svg`} alt="Home" />
        </Link>
        <span>›</span>
        <span>Tablets</span>
      </div>

      <h1 className={styles.title}>Tablets</h1>
      <p className={styles.subtitle}>{total} models</p>

      {/* Панель фильтров и сортировки — как на Phones/Accessories */}
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

      {isLoading ? (
        <div>Loading tablets...</div>
      ) : visibleProducts.length > 0 ? (
        <>
          <div className={styles.productsGrid}>
            {visibleProducts.map(tablet => (
              <ProductCard key={tablet.id} product={tablet} />
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
        </>
      ) : (
        <div className={styles.emptyMessage}>
          No tablets available at the moment.
        </div>
      )}
    </div>
  );
};
