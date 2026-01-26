import classNames from 'classnames';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';
import styles from './AccessoriesPage.module.scss';
import { useAccessoriesPage } from './hooks/useAccessoriesPage';

export const AccessoriesPage = () => {
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

  return (
    <div className={styles.accessoriesPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <a href="/" className={styles.homeLink}>
            <img src="/img/Home_breadcrumb.svg" alt="Home" />
          </a>
          <span className={styles.arrow}>
            <img src="/img/arrow_right_gray.svg" alt="arrow right" />
          </span>
          <span className={styles.currentCrumb}>Accessories</span>
        </div>

        <h1 className={styles.title}>Accessories</h1>
        <p className={styles.modelsCount}>{accessories.length} models</p>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label htmlFor="sort" className={styles.label}>
              Sort by
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="sort"
                value={sort}
                onChange={handleSortChange}
                className={styles.select}
              >
                <option value="age">Newest</option>
                <option value="name">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="perPage" className={styles.label}>
              Items on page
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
                <option value="all">All</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.grid}>
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
