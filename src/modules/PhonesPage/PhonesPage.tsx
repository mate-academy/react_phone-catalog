import React, { useLayoutEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './styles.module.scss';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductsList } from '@/components/ProductsList';
import { useProducts } from '@/app/providers/Products/ProductsContext';
import { Dropdown } from '@/components/Dropdown';
import { Product } from '@/shared/type';
import { Pagination } from '@/components/Pagination';
import classNames from 'classnames';

const typeSearch = {
  Newest: 'age',
  Alphabetically: 'title',
  Cheapest: 'price',
};

type Param = string | number;

type Params = {
  [key: string]: Param[] | Param | null;
};

function getSearchParams(params: Params, search?: string | URLSearchParams) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((item) => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }
  return newParams.toString();
}

export const PhonesPage: React.FC = () => {
  const { products, loadProducts, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 16);
  const query = +(searchParams.get('query') || '');

  const preparePhone: Product[] | null = useMemo(() => {
    if (!products) {
      return null;
    }
    const filered = products.filter((item) => {
      return item.category === 'phones';
    });

    const sorted = filered.sort((itemA, itemB) => {
      switch (searchParams.get('sort')) {
        case 'age':
          return itemB.year - itemA.year;
        case 'title':
          return itemB.name.localeCompare(itemA.name);
        case 'price':
          return itemA.price - itemB.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchParams, products]);

  const slicePhone = useMemo(() => {
    return preparePhone?.slice(perPage * page - perPage, perPage * page) || null;
  }, [perPage, page, preparePhone]);

  const maxPage = useMemo(() => {
    if (!preparePhone) {
      return 1;
    }
    return Math.ceil(preparePhone.length / perPage);
  }, [preparePhone, perPage]);

  useLayoutEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <main>
      <div className={styles.content}>
        <Breadcrumbs></Breadcrumbs>
        <h1 className={styles.title}>Mobile phones</h1>
        <p className={styles.p}>{!preparePhone ? '...' : preparePhone.length} models</p>
        <div  className={styles.filterSortContainer}>
          <div className={classNames(styles.dropdownSortBox, styles.filterbox)}>
            <p>Sort by</p>
            <Dropdown
              // className={}
              selects={['Newest', 'Alphabetically', 'Cheapest']}
              selected="Newest"
              onSelected={(value) => {
                const params = getSearchParams({ sort: typeSearch[value] }, searchParams);
                setSearchParams(params);
              }}
            ></Dropdown>
          </div>
          <div className={classNames(styles.dropdownPerPageBox, styles.filterbox) }>
            <p>Items on page</p>
            <Dropdown
              // className={}
              selects={['4', '8', '16']}
              selected="16"
              onSelected={(value) => {
                const params = getSearchParams({ perPage: value }, searchParams);
                setSearchParams(params);
              }}
            ></Dropdown>
          </div>
          <form className={classNames(styles.queryBox, styles.filterbox)} action="submit">
            <p>Search</p>
            <input placeholder='Search' type='text' />
          </form>
        </div>

        {error && <h2>error</h2>}

        {!error && (
          <ProductsList length={perPage} products={slicePhone} isLoading={loading}></ProductsList>
        )}

        {!error && slicePhone && slicePhone.length !== 0 && (
          <Pagination
            onSelected={(value) => {
              const params = getSearchParams({ page: value }, searchParams);
              setSearchParams(params);
            }}
            selected={page}
            maxLength={maxPage}
            className={styles.pagination}
          ></Pagination>
        )}

        {!error && !loading && slicePhone && slicePhone.length === 0 && (
          <h2>There are no products yet</h2>
        )}
      </div>
    </main>
  );
};
