import React from 'react';
import styles from './ProductPage.module.scss';
import { useParams } from 'react-router-dom';
import { NavigateBar } from '../NavigateBar';
import { NotFound } from '../NotFound';
import { ProductCard } from '../ProductCard';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ContentLoader from 'react-content-loader';
import { useTranslation } from 'react-i18next';

type Category = 'phones' | 'tablets' | 'accessories';

export const ProductPage: React.FC = () => {
  const { products, isLoading } = useProducts();
  const { category } = useParams<{ category: Category }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();

  const sort = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page')) || 1;
  const perPage = searchParams.get('perPage') || 'all';

  if (!category) {
    return <NotFound />;
  }

  const mainContent = products.filter(p => p.category === category);

  if (!isLoading && mainContent.length === 0) {
    return <NotFound />;
  }

  const sortedProducts = [...mainContent];
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
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  const start = (page - 1) * perPageNumber;
  const end = start + perPageNumber;

  const visibleProducts = sortedProducts.slice(start, end);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    params.delete('page');

    setSearchParams(params);
  };

  const handlePerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    params.delete('page');

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  const totalPages = Math.ceil(sortedProducts.length / perPageNumber);

  const shouldShowPagination = perPage !== 'all' && totalPages > 1;

  const VISIBLE_COUNT = 4;

  const startPage = Math.floor((page - 1) / VISIBLE_COUNT) * VISIBLE_COUNT + 1;

  const endPage = Math.min(startPage + VISIBLE_COUNT - 1, totalPages);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <>
      <section className={styles.content}>
        <NavigateBar />
        <div className={styles.aboutpage}>
          <h1 className={styles.title}>{`${hTitle}`}</h1>
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
            <p
              className={`${styles.text} ${
                i18n.language === 'ua' ? styles.smallText : ''
              }`}
            >
              {t('sort')}
            </p>
            <select
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
            <p
              className={`${styles.text} ${
                i18n.language === 'ua' ? styles.smallText : ''
              }`}
            >
              {t('items')}
            </p>
            <select
              className={styles.selectscore}
              value={perPage}
              onChange={e => handlePerPageChange(e.target.value)}
            >
              <option value="">{t('all')}</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>
        <div className={styles.productlist}>
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
                className={`${styles.button} ${page === 1 ? styles.hidden : ''}`}
                onClick={() => handlePageChange(page - 1)}
              >
                <img src="./img/icons/arrowLeft.svg" alt="ArrowLeft" />
              </button>
              {page > 4 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className={styles.button}
                  >
                    1
                  </button>

                  <button
                    className={`${styles.button} ${page > 0 ? styles.hidden : ''}`}
                  >
                    ...
                  </button>
                </>
              )}
              {visiblePages.map(pageNumber => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`${styles.button} ${
                    page === pageNumber ? styles.active : ''
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
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
