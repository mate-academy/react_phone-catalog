import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link, useParams } from 'react-router-dom';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/api/products';
import { ProductCard } from '../shared/components/ProductCard';
// eslint-disable-next-line max-len
import { ProductCardSkeleton } from '../shared/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton';

import { NotFoundPage } from '../NotFoundPage';

import HomeIcon from '../../assets/images/homeIcon.svg';
import ArrowRight from '../../assets/images/arrow-top.svg';
import styles from './CatalogPage.module.scss';

const CATEGORY_TITLES: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const getPageNumbers = (totalPages: number, currentPage: number) => {
  const maxVisiblePages = 4;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let end = start + maxVisiblePages - 1;

  if (end > totalPages) {
    end = totalPages;
    start = end - maxVisiblePages + 1;
  }

  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(item => item.category === category);
  }, [products, category]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];

    switch (sortBy) {
      case 'price':
        return copy.sort((a, b) => a.price - b.price);
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'age':
      default:
        return copy.sort((a, b) => b.year - a.year);
    }
  }, [filteredProducts, sortBy]);

  const totalItems = sortedProducts.length;
  const isAll = perPage === 'all';
  const itemsPerPage = isAll ? totalItems : Number(perPage) || 16;
  const totalPages = isAll ? 1 : Math.ceil(totalItems / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    if (isAll) {
      return sortedProducts;
    }

    const start = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, isAll, currentPage, itemsPerPage]);

  const visiblePages = useMemo(() => {
    return getPageNumbers(totalPages, currentPage);
  }, [totalPages, currentPage]);

  // 2. Тепер, після того як усі хуки пройшли, робимо перевірку категорії
  if (!category || !(category in CATEGORY_TITLES)) {
    return <NotFoundPage />;
  }

  const pageTitle = CATEGORY_TITLES[category];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const renderGridContent = () => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ));
    }

    return paginatedProducts.map(product => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <div className={styles.catalog__wrapper}>
      <div className={styles.catalog}>
        <nav className={styles.catalog__breadcrumbs} aria-label="Breadcrumbs">
          <Link to="/" className={styles.catalog__breadcrumbLink}>
            <img
              src={HomeIcon}
              alt="Home"
              className={styles.catalog__homeIcon}
            />
          </Link>

          <span className={styles.catalog__breadcrumbSeparator}>
            <img src={ArrowRight} alt="arrow-right" />
          </span>

          <span className={styles.catalog__breadcrumbCurrent}>{pageTitle}</span>
        </nav>

        <h1 className={styles.catalog__title}>{pageTitle}</h1>

        <p className={styles.catalog__count}>
          {filteredProducts.length} models
        </p>

        <div className={styles.catalog__filters}>
          <div className={styles.catalog__filterGroup}>
            <label
              htmlFor="sort-select"
              className={styles.catalog__filterLabel}
            >
              Sort by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              className={`${styles.catalog__select} ${styles['catalog__select--sort']}`}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>

          <div className={styles.catalog__filterGroup}>
            <label
              htmlFor="per-page-select"
              className={styles.catalog__filterLabel}
            >
              Items on page
            </label>
            <select
              id="per-page-select"
              value={perPage}
              onChange={handlePerPageChange}
              className={`${styles.catalog__select} ${styles['catalog__select--perPage']}`}
            >
              <option value="16">16</option>
              <option value="8">8</option>
              <option value="4">4</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        <div className={styles.catalog__grid}>{renderGridContent()}</div>

        {!isLoading && totalPages > 1 && (
          <div className={styles.catalog__pagination}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`${styles.catalog__paginationBtn} ${styles['catalog__paginationBtn--prev']}`}
            >
              <img src={ArrowRight} alt="previous" />
            </button>

            {visiblePages.map(pageNum => (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                className={`${styles.catalog__paginationBtn} ${
                  currentPage === pageNum
                    ? styles['catalog__paginationBtn--active']
                    : ''
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`${styles.catalog__paginationBtn} ${styles['catalog__paginationBtn--next']}`}
            >
              <img src={ArrowRight} alt="next" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
