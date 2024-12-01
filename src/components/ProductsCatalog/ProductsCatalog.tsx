import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsCatalog.module.scss';
import { ProductsList } from '../ProductsList';
import { Dropdown } from '../Dropdown';
import { getSortedProducts } from '../../helpers/getSortedProducts';
import { Pagination } from '../Pagination';
import { SortField } from '../../types/SortField';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { getNumbers } from '../../helpers/getNumbers';
import { Breadcrumbs } from '../Breadcrumbs';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsCatalog: React.FC<Props> = ({ products, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = (searchParams.get('sort') as SortField) || SortField.age;
  const perPage =
    (searchParams.get('perPage') as ItemsOnPage) || ItemsOnPage.eight;

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [sortedProducts, amount] = getSortedProducts(
    products,
    query,
    sort,
    perPage,
    page,
  );

  useEffect(() => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  }, [page, setSearchParams, searchParams]);

  const total = amount;
  const perPageNumber = Number(perPage);
  const count = Math.ceil(total / perPageNumber);
  const countPages = getNumbers(1, count);

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__content}>
        <div className={styles.catalog__nav}>
          <Breadcrumbs />
        </div>
        <div className={styles.catalog__titles}>
          <h1 className={styles.catalog__title}>{title}</h1>
          <p className={styles.catalog__amount}>{products.length} models</p>
        </div>
        <div className={styles.catalog__filters}>
          <div className={styles.catalog__sort}>
            <Dropdown
              name="Sort by"
              paramName="sort"
              options={Object.values(SortField)}
              defaultValue={SortField.age}
            />
          </div>
          <div className={styles.catalog__items}>
            <Dropdown
              name="Items on page"
              paramName="perPage"
              options={Object.values(ItemsOnPage)}
              defaultValue={ItemsOnPage.eight}
            />
          </div>
        </div>
        <ProductsList products={sortedProducts} />
      </div>

      {countPages.length > 1 && (
        <div className={styles.catalog__pagination}>
          <Pagination countPages={countPages} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};
