import React from 'react';
import { ProductList } from '../../components/ProductList';
import { useProductsForCategory, type SortKey } from '../../modules/shared/hooks';
import { Loader } from '../../components/Loader';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Pagination } from '../../components/Pagination';
import { ChevronIcon } from '../../components/iconsSVG';
import styles from './ProductListPage.module.scss';

type Category = 'phones' | 'tablets' | 'accessories';

type Props = {
  category: Category;
};

const titles: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductListPage: React.FC<Props> = ({ category }) => {
  const title = titles[category];

  const {
    items,
    totalItems,
    totalPages,
    isLoading,
    error,
    query,
    sort,
    setSort,
    page,
    setPage,
    perPage,
    setPerPage,
  } = useProductsForCategory({ type: category, syncWithUrl: true });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className={styles['product-list-page']}>
        <div className={styles['product-list-page__container']}>
          <BreadCrumbs location={[category.toLowerCase()]} />
          <div className={styles['product-list-page__error']}>
            <p role="alert">Something went wrong while loading products.</p>
            <button
              className={styles['product-list-page__reload']}
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className={styles['product-list-page']}>
        <div className={styles['product-list-page__container']}>
          <BreadCrumbs location={[category.toLowerCase()]} />
          <div className={styles['product-list-page__empty']}>
            {query
              ? `There are no ${category.toLowerCase()} matching the query.`
              : `There are no ${category.toLowerCase()} yet.`}
          </div>
        </div>
      </section>
    );
  }

  const onPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortKey);
  };

  return (
    <section className={styles['product-list-page']}>
      <div className={styles['product-list-page__container']}>
        <BreadCrumbs location={[category]} />

        <div
          className={styles['product-list-page__header']}
          role="region"
          aria-label={`${category} list header`}
        >
          <h1 className={styles['product-list-page__title']}>{title}</h1>
          <div className={styles['product-list-page__meta']}>
            <p className={styles['product-list-page__count']} aria-live="polite">
              {totalItems} model{totalItems === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <div className={styles['product-list-page__controls']}>
          <div className={styles['product-list-page__form']}>
            <label className={styles['product-list-page__field']} htmlFor="sort">
              <span className={styles['product-list-page__label']}>Sort by</span>
              <span className={styles['product-list-page__select-wrap']}>
                <select
                  id="sort"
                  className={styles['product-list-page__select']}
                  value={sort}
                  onChange={onSortChange}
                  aria-label="Sort products"
                >
                  <option value="">Default</option>
                  <option value="age">Newest</option>
                  <option value="title">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>

                <ChevronIcon
                  className={styles['product-list-page__select-icon']}
                  direction="down"
                />
              </span>
            </label>

            <label className={styles['product-list-page__field']}>
              <span className={styles['product-list-page__label']}>Items on page</span>
              <span className={styles['product-list-page__select-wrap']}>
                <select
                  className={styles['product-list-page__select']}
                  value={String(perPage)}
                  onChange={onPerPageChange}
                  aria-label="Items per page"
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">All</option>
                </select>

                <ChevronIcon
                  className={styles['product-list-page__select-icon']}
                  direction="down"
                />
              </span>
            </label>
          </div>
        </div>

        <div className={styles['product-list-page__list']} aria-label="Product results">
          <ProductList products={items} />
        </div>

        {perPage !== 'all' && totalPages > 1 && (
          <div className={styles['product-list-page__pagination-wrap']}>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={p => setPage(p)}
              maxVisible={5}
            />
          </div>
        )}
      </div>
    </section>
  );
};
