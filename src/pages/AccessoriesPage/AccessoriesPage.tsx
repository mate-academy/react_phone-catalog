import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { CustomSelect } from '../../components/CustomSelect';
import { getSkeletonCount } from '../shared/constants/catalog';
import styles from './AccessoriesPage.module.scss';
import { useAccessoriesPage } from './hooks/useAccessoriesPage';

export const AccessoriesPage = () => {
  const { t } = useTranslation();
  const {
    accessories,
    visibleAccessories,
    isLoading,
    sort,
    perPage,
    page,
    totalPages,
    paginationItems,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  } = useAccessoriesPage();
  const skeletonCount = getSkeletonCount(perPage);

  return (
    <div className={styles.accessoriesPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <a href="/" className={styles.homeLink}>
            <img src="/img/Home_breadcrumb.svg" alt={t('icons.homeAlt')} />
          </a>
          <span className={styles.arrow}>
            <img
              src="/img/arrow_right_gray.svg"
              alt={t('icons.arrowRightAlt')}
            />
          </span>
          <span className={styles.currentCrumb}>{t('nav.accessories')}</span>
        </div>

        <h1 className={styles.title}>{t('accessoriesPage.title')}</h1>
        <p className={styles.modelsCount}>
          {t('common.models', { count: accessories.length })}
        </p>

        <div className={styles.controls}>
          <CustomSelect
            id="sort"
            label={t('catalog.sortBy')}
            value={sort}
            onChange={handleSortChange}
            options={[
              { value: 'age', label: t('catalog.sort.age') },
              { value: 'name', label: t('catalog.sort.name') },
              { value: 'price', label: t('catalog.sort.price') },
            ]}
          />

          <CustomSelect
            id="perPage"
            label={t('catalog.itemsOnPage')}
            value={perPage}
            onChange={handlePerPageChange}
            options={[
              { value: '4', label: '4' },
              { value: '8', label: '8' },
              { value: '16', label: '16' },
              { value: 'all', label: t('catalog.perPageAll') },
            ]}
          />
        </div>

        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: skeletonCount }, (_, index) => (
              <ProductCardSkeleton key={`accessory-skeleton-${index}`} />
            ))}
          </div>
        ) : accessories.length === 0 ? (
          <p className={styles.emptyMessage}>
            {t('catalog.empty.accessories')}
          </p>
        ) : (
          <div key={page} className={styles.grid}>
            {visibleAccessories.map(accessory => (
              <ProductCard key={accessory.id} phone={accessory} />
            ))}
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              {'<'}
            </button>
            <div className={styles.pageNumbers}>
              {paginationItems.map(item => (
                <button
                  key={item}
                  className={classNames(styles.pageBtn, {
                    [styles.active]: item === page,
                  })}
                  onClick={() => handlePageChange(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
