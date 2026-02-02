import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';
import styles from './PhonesPage.module.scss';
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

  return (
    <div className={styles.phonesPage}>
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
          <span className={styles.currentCrumb}>{t('nav.phones')}</span>
        </div>

        <h1 className={styles.title}>{t('phonesPage.title')}</h1>
        <p className={styles.modelsCount}>
          {t('common.models', { count: phones.length })}
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
          <Loader />
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
