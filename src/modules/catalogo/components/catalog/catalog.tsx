/* eslint-disable max-len */
import React, { useState } from 'react';
import styles from './catalog.module.scss';
import { ProductsList } from '../../../shared/components/productList/ProductsList';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Products } from '../../../../types';
import { BreadCrumbs } from '../../../shared/breadcrumbs/breadcrumbs';
/* eslint-enable max-len */

export const Catalog: React.FC<{ title: string; products: Products[] }> = ({
  title,
  products,
}) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [perPage, setPerPage] = useState<number>(
    Number(searchParam.get('perPage')) || products.length,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const location = useLocation();
  const currentPath = location.pathname;
  const categoryName = currentPath.replace('/', '');
  const map = categoryName;

  const startIndex = (currentPage - 1) * perPage;
  const total = products.length;

  const params = new URLSearchParams(searchParam);
  const currentSort = searchParam.get('sort');

  enum ValueSelected {
    four = 4,
    eigth = 8,
    sixteen = 16,
    all = products.length,
  }

  const onPageChange = (page: number) => setCurrentPage(page);

  const onResetPage = (page: number) => setCurrentPage(page);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortParams = new URLSearchParams(searchParam);

    sortParams.set('sort', event.target.value);
    const param = event.target.value;

    if (param === 'age') {
      sortParams.delete('sort');
    }

    sortParams.toString();

    setSearchParam(sortParams, { replace: true });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const numericParam = Number(event.target.value);
    const newParams = new URLSearchParams(searchParam);

    setPerPage(numericParam);

    if (numericParam === products.length) {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', event.target.value);
    }

    params.delete('page');

    setSearchParam(newParams, { replace: true });
  };

  return (
    <section className={styles.catalog}>
      <div className={styles.catalog__content}>
        <BreadCrumbs isLocationItemCard={currentPath} map={map} />
        <h1 className={styles.catalog__title}>{title}</h1>
        <p className={styles.catalog__count}>{`${products.length} models`}</p>
        <div className={styles['catalog__sort-container']}>
          <div>
            <label
              htmlFor="sort-select"
              className={styles['catalog__sort-title']}
            >
              Sort by
            </label>
            <select
              id="sort-select"
              className={`${styles['catalog__sort-button']} ${styles['catalog__sort-button--width']}`}
              value={currentSort}
              onChange={handleSortChange}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="sort-item"
              className={styles['catalog__sort-title']}
            >
              Items on page
            </label>
            <select
              id="sort-item"
              className={styles['catalog__sort-button']}
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option
                className={styles['catalog__sort-option']}
                value={ValueSelected.four}
              >
                4
              </option>
              <option
                className={styles['catalog__sort-option']}
                value={ValueSelected.eigth}
              >
                8
              </option>
              <option
                className={styles['catalog__sort-option']}
                value={ValueSelected.sixteen}
              >
                16
              </option>
              <option
                className={styles['catalog__sort-option']}
                value={ValueSelected.all}
              >
                all
              </option>
            </select>
          </div>
        </div>
        <div></div>
        <div className={styles['catalog__productlist-container']}>
          <ProductsList
            productCategory={products}
            perPage={perPage}
            startIndex={startIndex}
            currentPage={currentPage}
          />
        </div>
        <Pagination
          total={total}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onResetPage={onResetPage}
        />
      </div>
    </section>
  );
};
