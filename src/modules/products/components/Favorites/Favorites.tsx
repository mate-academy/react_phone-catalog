import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useProductsQuery } from '@/modules/products/queries';
import { useAppSelector } from '@/redux/hooks';
import { ProductCard, Pagination } from '@/shared/components';
import {
  Dropdown,
  ErrorLabel,
  Loader,
  NotFoundLabel,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/constants';
import { BreadcrumbContext } from '@/shared/context/BreadcrumbContext';
import { useBaseBreadcrumbs, usePagination } from '@/shared/hooks';

import styles from './Favorites.module.scss';

export const Favorites = () => {
  const { t } = useTranslation();
  const favoriteIds = useAppSelector(state => state.favorites.favorite_ids);

  const {
    page,
    perPage,
    handlePageChange,
    handleSizeChange,
    PAGE_SIZE_OPTIONS,
  } = usePagination();

  const { data, isLoading, isError, refetch } = useProductsQuery({
    ids: favoriteIds,
  });
  const navigate = useNavigate();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const breadcrumbs = useBaseBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs, setBreadcrumbs]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page, perPage]);

  return (
    <>
      {isLoading && <Loader className={styles.loader} />}
      {isError && (
        <ErrorLabel className={styles.errorLabel} onRetry={refetch} />
      )}
      {data &&
        (data.total === 0 ? (
          <NotFoundLabel
            handleClick={() => navigate(ROUTES.HOME)}
            className={styles.notFoundLabel}
          />
        ) : (
          <>
            <div className={styles.category}>
              <h1 className={styles.category__title}>{t('favorites')}</h1>
              <p className={styles.category__description}>
                {`${data.total} ${t('items')}`}
              </p>
            </div>
            <div className={styles.parameters}>
              <Dropdown
                className={styles.dropdown__page}
                description={t('itemsOnPage')}
                value={perPage}
                values={PAGE_SIZE_OPTIONS}
                onChange={handleSizeChange}
                getLabel={option => String(option)}
                getKey={option => String(option)}
              />
            </div>
            <section className={styles.grid}>
              {data.items.map(item => (
                <ProductCard
                  key={item.id}
                  product={item}
                  withDiscount
                  className={styles.card}
                />
              ))}
            </section>

            {data.totalPages > 1 && (
              <Pagination
                totalPages={data.totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ))}
    </>
  );
};
