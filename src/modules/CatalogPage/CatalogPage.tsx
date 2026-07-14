import classNames from 'classnames';
import styles from './CatalogPage.module.scss';

import { Dropdown } from '../shared/components/Dropdown';
import { ProductList } from '../shared/components/ProductList';
import { Pagination } from '../shared/components/Pagination';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useCatalog } from './useCatalog';
import { PAGINATION_OPTIONS } from '../shared/types/paginationOptions';
import { SORT_OPTIONS } from '../shared/types/sortOptions';
import { useEffect } from 'react';
import { BreadcrumbLink } from '../shared/components/Breadcrumbs/types';
import { Loader } from '../shared/components/Loader';
import { SquareButton } from '../shared/components/SquareButton';
import { useNavigate } from 'react-router-dom';

export const CatalogPage = () => {
  const {
    isLoading,
    isError,
    category,
    title,
    count,
    preparedProducts,
    currentSort,
    currentPagination,
    currentPage,
    pageCount,
    handleSortChange,
    handlePaginationChange,
    handlePageChange,
  } = useCatalog();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const links: BreadcrumbLink[] = [
    {
      label: category || '',
    },
  ];

  if (isLoading) {
    return (
      <div className={styles['catalog-page__loader']}>
        <Loader />
      </div>
    );
  }

  if (isError || !preparedProducts) {
    return (
      <div className={styles['catalog-page__error']}>
        Something went wrong
        <SquareButton onClick={() => navigate(0)}>Reload</SquareButton>
      </div>
    );
  }

  return (
    <div className={classNames(styles['catalog-page'], 'container')}>
      <Breadcrumbs links={links} />

      <div className={styles['catalog-page__header']}>
        <h1 className={styles['catalog-page__title']}>{title}</h1>
        <span className={styles['catalog-page__count']}>
          {count !== 1 ? `${count} models` : `${count} model`}
        </span>
      </div>

      <div className={styles['catalog-page__actions']}>
        <div className={styles['catalog-page__group']}>
          <span className={styles['catalog-page__label']}>Sort by</span>
          <div className={styles['catalog-page__control']}>
            <Dropdown
              options={SORT_OPTIONS}
              activeOption={currentSort}
              setActiveOption={handleSortChange}
            />
          </div>
        </div>

        <div className={styles['catalog-page__group']}>
          <span className={styles['catalog-page__label']}>Items on page</span>
          <div className={styles['catalog-page__control']}>
            <Dropdown
              options={PAGINATION_OPTIONS}
              activeOption={currentPagination}
              setActiveOption={handlePaginationChange}
            />
          </div>
        </div>
      </div>

      <div className={styles['catalog-page__product-list']}>
        {preparedProducts.length !== 0 ? (
          <ProductList products={preparedProducts} />
        ) : (
          <div className={styles['catalog-page__not-found']}>
            {`There are no ${category} yet`}
          </div>
        )}
      </div>

      <div className={styles['catalog-page__pagination']}>
        {pageCount > 1 && (
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            handleChangePage={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
