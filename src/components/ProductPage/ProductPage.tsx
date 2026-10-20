import React from 'react';
import styles from './ProductPage.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { NavigateBar } from '../NavigateBar';
import { NotFound } from '../NotFound';
import { ProductCard } from '../ProductCard';
import { Category } from '../../types';
import { useProducts } from '../../hooks/useProducts';
import ContentLoader from 'react-content-loader';
import { useTranslation } from 'react-i18next';

type SortOrder = 'newest' | 'alphabetically' | 'cheapest';
type PageSize = 'all' | '4' | '8' | '16';

const VISIBLE_PAGE_COUNT = 4;

const isCategory = (value: string | undefined): value is Category =>
  value === 'phones' || value === 'tablets' || value === 'accessories';

const parseSort = (value: string | null): SortOrder => {
  return value === 'alphabetically' || value === 'cheapest' ? value : 'newest';
};

const parsePageSize = (value: string | null): PageSize => {
  return value === '4' || value === '8' || value === '16' ? value : 'all';
};

export const ProductPage: React.FC = () => {
  const { products, isLoading } = useProducts();
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();

  const sort = parseSort(searchParams.get('sort'));
  const requestedPage = Number(searchParams.get('page'));
  const perPage = parsePageSize(searchParams.get('perPage'));

  if (!isCategory(category)) {
    return <NotFound />;
  }

  const sortedProducts = products.filter(p => p.category === category);
  let hTitle = '';

  switch (category) {
    case 'phones':
      hTitle = t('mobile');
      break;

    case 'tablets':
      hTitle = t('tablets');
      break;

    case 'accessories':
      hTitle = t('accessories');
      break;
  }

  switch (sort) {
    case 'alphabetically':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'cheapest':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case 'newest':
    default:
      sortedProducts.sort((a, b) => b.year - a.year);
  }

  const perPageNumber =
    perPage === 'all' ? Math.max(sortedProducts.length, 1) : Number(perPage);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / perPageNumber),
  );
  const page =
    perPage !== 'all' &&
    Number.isSafeInteger(requestedPage) &&
    requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1;

  const start = (page - 1) * perPageNumber;
  const end = start + perPageNumber;

  const visibleProducts = sortedProducts.slice(start, end);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const nextSort = parseSort(value);

    if (nextSort === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', nextSort);
    }

    params.delete('page');

    setSearchParams(params);
  };

  const handlePerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const nextPageSize = parsePageSize(value);

    if (nextPageSize === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', nextPageSize);
    }

    params.delete('page');

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    if (!Number.isSafeInteger(newPage) || newPage < 1 || newPage > totalPages) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  const shouldShowPagination =
    !isLoading && perPage !== 'all' && totalPages > 1;

  const startPage =
    Math.floor((page - 1) / VISIBLE_PAGE_COUNT) * VISIBLE_PAGE_COUNT + 1;

  const endPage = Math.min(startPage + VISIBLE_PAGE_COUNT - 1, totalPages);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <>
      <section className={styles.content}>
        <NavigateBar />
        <div className={styles.aboutpage}>
          <h1 className={styles.title}>{hTitle}</h1>
          <p className={styles.text}>
            {isLoading ? (
              <ContentLoader
                speed={2}
                width={100}
                height={20}
                viewBox="0 0 100 20"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="7" y="5" rx="3" ry="3" width="88" height="6" />
              </ContentLoader>
            ) : (
              `${sortedProducts.length} ${t('model')}`
            )}
          </p>
        </div>
        <div className={styles.sortcategory}>
          <div className={styles.selectbox}>
            <label
              htmlFor="product-sort"
              className={`${styles.text} ${
                i18n.language === 'ua' ? styles.smallText : ''
              }`}
            >
              {t('sort')}
            </label>
            <select
              id="product-sort"
              className={styles.selectcategory}
              value={sort}
              onChange={e => handleSortChange(e.target.value)}
            >
              <option value="newest">{t('selectone')}</option>
              <option value="alphabetically">{t('selecttwo')}</option>
              <option value="cheapest">{t('selectthre')}</option>
            </select>
          </div>
          <div className={styles.selectbox}>
            <label
              htmlFor="products-per-page"
              className={`${styles.text} ${
                i18n.language === 'ua' ? styles.smallText : ''
              }`}
            >
              {t('item')}
            </label>
            <select
              id="products-per-page"
              className={styles.selectscore}
              value={perPage}
              onChange={e => handlePerPageChange(e.target.value)}
            >
              <option value="all">{t('all')}</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>
        {!isLoading && sortedProducts.length === 0 && (
          <p className={styles.text} role="status">
            {t('emptyCategory')}
          </p>
        )}
        <div className={styles.productlist} aria-busy={isLoading}>
          {!isLoading &&
            visibleProducts.map(card => (
              <div key={card.id} className={styles.productItem}>
                <ProductCard product={card} turnon={true} />
              </div>
            ))}
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <ContentLoader
                key={index}
                speed={2}
                width={288}
                height={506}
                viewBox="0 0 288 506"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="47" y="47" rx="0" ry="0" width="121" height="116" />
                <rect x="7" y="179" rx="0" ry="0" width="198" height="16" />
                <rect x="7" y="202" rx="0" ry="0" width="198" height="16" />
                <rect x="7" y="245" rx="0" ry="0" width="150" height="48" />
                <rect x="7" y="333" rx="0" ry="0" width="198" height="16" />
                <rect x="7" y="353" rx="0" ry="0" width="198" height="16" />
                <rect x="7" y="373" rx="0" ry="0" width="198" height="16" />
                <rect x="17" y="415" rx="0" ry="0" width="103" height="42" />
                <rect x="130" y="413" rx="0" ry="0" width="41" height="42" />
              </ContentLoader>
            ))}
        </div>
        <div className={styles.boxpagebar}>
          {shouldShowPagination && (
            <div className={styles.pagebar}>
              <button
                type="button"
                disabled={page === 1}
                aria-label={t('previousPage')}
                className={`${styles.button} ${page === 1 ? styles.hidden : ''}`}
                onClick={() => handlePageChange(page - 1)}
              >
                <img src="./img/icons/arrowLeft.svg" alt="ArrowLeft" />
              </button>
              {startPage > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => handlePageChange(1)}
                    className={styles.button}
                  >
                    1
                  </button>

                  {startPage > 2 && <span aria-hidden="true">...</span>}
                </>
              )}
              {visiblePages.map(pageNumber => (
                <button
                  type="button"
                  key={pageNumber}
                  aria-current={page === pageNumber ? 'page' : undefined}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`${styles.button} ${
                    page === pageNumber ? styles.active : ''
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                type="button"
                disabled={page === totalPages}
                aria-label={t('nextPage')}
                className={`${styles.button} ${
                  page === totalPages ? styles.hidden : ''
                }`}
                onClick={() => handlePageChange(page + 1)}
              >
                <img src="./img/icons/arrowRight.svg" alt="ArrowRight" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
