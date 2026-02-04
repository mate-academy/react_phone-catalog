import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
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
  const skeletonCount = perPage === 'all' ? 16 : Number(perPage);

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
          <div className={styles.controlGroup}>
            <label htmlFor="sort" className={styles.label}>
              {t('catalog.sortBy')}
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="sort"
                value={sort}
                onChange={handleSortChange}
                className={styles.select}
              >
                <option value="age">{t('catalog.sort.age')}</option>
                <option value="name">{t('catalog.sort.name')}</option>
                <option value="price">{t('catalog.sort.price')}</option>
              </select>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="perPage" className={styles.label}>
              {t('catalog.itemsOnPage')}
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="perPage"
                value={perPage}
                onChange={handlePerPageChange}
                className={styles.select}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">{t('catalog.perPageAll')}</option>
              </select>
            </div>
          </div>
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
