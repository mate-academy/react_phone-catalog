import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { CustomSelect } from '../../components/CustomSelect';
import { getSkeletonCount } from '../shared/constants/catalog';
import styles from './PhonesPage.module.scss';
import { getPerPageOptions, getSortOptions } from './constants';
import { usePhonesPage } from './hooks/usePhonesPage';

export const PhonesPage = () => {
  const { t } = useTranslation();
  const {
    phones,
    visiblePhones,
    isLoading,
    sort,
    perPage,
    page,
    totalPages,
    paginationItems,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  } = usePhonesPage();
  const skeletonCount = getSkeletonCount(perPage);

  return (
    <div className={styles.phonesPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <a href="/" className={styles.homeLink}>
            <img src="img/Home_breadcrumb.svg" alt={t('icons.homeAlt')} />
          </a>
          <span className={styles.arrow}>
            <img
              src="img/arrow_right_gray.svg"
              alt={t('icons.arrowRightAlt')}
            />
          </span>
          <span className={styles.currentCrumb}>{t('nav.phones')}</span>
        </div>

        <h1 className={styles.title}>{t('phonesPage.title')}</h1>
        <p className={styles.modelsCount}>
          {t('common.models', { count: phones.length })}
        </p>

        <div className={styles.controls}>
          <CustomSelect
            id="sort"
            label={t('catalog.sortBy')}
            value={sort}
            onChange={handleSortChange}
            options={getSortOptions(t)}
          />

          <CustomSelect
            id="perPage"
            label={t('catalog.itemsOnPage')}
            value={perPage}
            onChange={handlePerPageChange}
            options={getPerPageOptions(t)}
          />
        </div>

        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: skeletonCount }, (_, index) => (
              <ProductCardSkeleton key={`phone-skeleton-${index}`} />
            ))}
          </div>
        ) : phones.length === 0 ? (
          <p className={styles.emptyMessage}>{t('catalog.empty.phones')}</p>
        ) : (
          <div key={page} className={styles.grid}>
            {visiblePhones.map(phone => (
              <ProductCard key={phone.id} phone={phone} />
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
              &lt;
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
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
