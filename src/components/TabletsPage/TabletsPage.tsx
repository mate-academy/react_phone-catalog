import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './TabletsPage.module.scss';
import iconRight from '../../../public/icons/Chevron (Arrow Right).svg';
import iconHome from '../../../public/icons/Home.svg';
import arrowRight from '../../../public/icons/Chevron_right.svg';
import arrowLeft from '../../../public/icons/Chevron_left.svg';

import tabletsJson from '../../../public/api/tablets.json';

export function TabletsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- URL params ---
  const sortBy = searchParams.get('sort') || 'age';
  const page = Number(searchParams.get('page')) || 1;
  const perPage = searchParams.get('perPage') || 'all';

  const tablets = [...tabletsJson];

  // 🔹 Витягуємо номер моделі (наприклад iPad 9 → 9)
  const getModelNumber = (namespaceId: string) => {
    const match = namespaceId.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  // --- Sorting ---
  if (sortBy === 'age') {
    tablets.sort(
      (a, b) => getModelNumber(b.namespaceId) - getModelNumber(a.namespaceId),
    );
  } else if (sortBy === 'alphabetically') {
    tablets.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'cheapest') {
    tablets.sort(
      (a, b) =>
        (a.priceDiscount || a.priceRegular) -
        (b.priceDiscount || b.priceRegular),
    );
  }

  // --- Pagination logic ---
  const totalItems = tablets.length;
  const perPageNumber = perPage === 'all' ? totalItems : Number(perPage);
  const totalPages = Math.ceil(totalItems / perPageNumber);
  const startIndex = (page - 1) * perPageNumber;
  const visibleProducts =
    perPage === 'all'
      ? tablets
      : tablets.slice(startIndex, startIndex + perPageNumber);

  // --- Handlers ---
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newParams: any = {};

    if (value !== 'age') newParams.sort = value;
    if (perPage !== 'all') newParams.perPage = perPage;
    if (page !== 1) newParams.page = String(page);

    setSearchParams(newParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;
    const newParams: any = {};

    if (sortBy !== 'age') newParams.sort = sortBy;
    if (newPerPage !== 'all') newParams.perPage = newPerPage;
    newParams.page = '1'; // reset to first page on perPage change

    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams: any = {};
    if (sortBy !== 'age') newParams.sort = sortBy;
    if (perPage !== 'all') newParams.perPage = perPage;
    if (newPage !== 1) newParams.page = String(newPage);

    setSearchParams(newParams);
  };

  return (
    <div className={styles.TabletsPage}>
      <div className={styles.container}>
        <Link to="/">
          <img src={iconHome} alt="home" className={styles.icon__home} />
        </Link>
        <img src={iconRight} alt="icon-right" className={styles.icon__right} />
        <div className={styles.text}>Tablets</div>
      </div>

      <h1>Tablets</h1>

      <div className={styles.sortBlock}>
        <div className={styles.sortBlock__container1}>
          <div htmlFor="sort" className={styles.sortLabel}>
            Sort by:
          </div>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className={`${styles.sortSelect} ${styles.sortSelect__wide}`}
          >
            <option value="age">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>
        <div className={styles.sortBlock__container1}>
          <div htmlFor="perPage" className={styles.sortLabel}>
            Items on page:
          </div>
          <select
            id="perPage"
            value={perPage}
            onChange={handlePerPageChange}
            className={`${styles.sortSelect} ${styles.sortSelect__narrow}`}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {visibleProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* --- Pagination buttons --- */}
      {perPage !== 'all' && totalPages > 1 && (
        <div className={styles.pagination}>
          {/* ◀️ Prev button */}
          <button
            onClick={() => handlePageChange(page - 1)}
            className={styles.pageButton}
            disabled={page === 1}
          >
            <img src={arrowLeft} alt="icon__left" />
          </button>

          {/* 🔹 Page number buttons (5 at a time) */}
          {(() => {
            const pagesPerBlock = 5;
            const currentBlock = Math.floor((page - 1) / pagesPerBlock);
            const startPage = currentBlock * pagesPerBlock + 1;
            const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);

            const visiblePages = [];

            for (let i = startPage; i <= endPage; i++) {
              visiblePages.push(i);
            }

            return visiblePages.map(pageNum => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`${styles.pageButton} ${
                  pageNum === page ? styles.active : ''
                }`}
              >
                {pageNum}
              </button>
            ));
          })()}

          {/* ▶️ Next button */}
          <button
            onClick={() => handlePageChange(page + 1)}
            className={styles.pageButton}
            disabled={page === totalPages}
          >
            <img src={arrowRight} alt="icon__right" />
          </button>
        </div>
      )}
    </div>
  );
}
