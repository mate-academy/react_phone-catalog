import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PRODUCT_SORT_OPTIONS } from '@/modules/products/constants';
import { useSortProducts } from '@/modules/products/hooks/useSortProducts';
import { useProductsQuery } from '@/modules/products/queries';
import { ProductCategory } from '@/modules/products/types';
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
import { scrollTopSmoothly } from '@/shared/utils';

import styles from './Catalog.module.scss';

interface Props {
  categoryName: string;
  category: ProductCategory;
}

export const Catalog = ({ categoryName, category }: Props) => {
  const { t } = useTranslation();
  const {
    page,
    perPage,
    handlePageChange,
    handleSizeChange,
    PAGE_SIZE_OPTIONS,
  } = usePagination();

  const { sort, handleSortChange } = useSortProducts();
  const { data, isLoading, isError, refetch } = useProductsQuery({ category });
  const navigate = useNavigate();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const breadcrumbs = useBaseBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs, setBreadcrumbs]);

  useEffect(scrollTopSmoothly, [page, perPage]);

  return (
    <>
      {isLoading && <Loader className={styles.loader} />}
      {isError && (
        <ErrorLabel className={styles.errorLabel} onRetry={refetch} />
      )}
      {data &&
        (data.total === 0 ? (
          <NotFoundLabel
            title={t('nothingFoundForYourQuery')}
            handleClick={() => navigate(ROUTES.HOME)}
            className={styles.notFoundLabel}
          />
        ) : (
          <>
            <div className={styles.category}>
              <h1 className={styles.category__title}>{categoryName}</h1>
              <p className={styles.category__description}>
                {`${data.total} ${t('models')}`}
              </p>
            </div>
            <div className={styles.parameters}>
              <Dropdown
                className={styles.dropdown__sort}
                description={t('sortBy')}
                value={sort}
                values={PRODUCT_SORT_OPTIONS}
                onChange={handleSortChange}
                getLabel={option => option.labelValue}
                getKey={option => option.key}
              />
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
