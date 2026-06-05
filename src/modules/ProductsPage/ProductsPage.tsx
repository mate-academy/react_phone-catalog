import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './styles.module.scss';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductsList } from '@/components/ProductsList';
import { Dropdown } from '@/components/Dropdown';
import { Product } from '@/shared/type';
import { Pagination } from '@/components/Pagination';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from '@/shared/utils';
import { useProducts } from '@/app/providers/Products';

const typeSearch = {
  newest: 'age',
  alphabetically: 'title',
  cheapest: 'price',
};

type optionDropdownSort = 'age' | 'title' | 'price';
type optionDropdownPerPage = '16' | 'all' | '4' | '8';

const debounce = (time: number, callback: () => void) => {
  let timer = 0;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback();
    }, time);
  };
};

export const ProductsPage = ({ category }: { category: 'phones' | 'tablets' | 'accessories' }) => {
  const { products, loadProducts, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const [searchInput, setSearchInput] = useState(query);


  const page = +(searchParams.get('page') || 1);
  const perPage: optionDropdownPerPage =
    (searchParams.get('perPage') as optionDropdownPerPage) || '16';
  const sortParam: optionDropdownSort = (searchParams.get('sort') as optionDropdownSort) || 'age';

  const { t } = useTranslation();

  const title = useMemo(() => {
    const titleObject = {
      phones: t('productPage.mobileTitle'),
      tablets: t('productPage.tabletsTitle'),
      accessories: t('productPage.accessoriesTitle'),
    };
    return titleObject[category];
  }, [category, t]);

  const preparePhone: Product[] | null = useMemo(() => {
    if (!products) {
      return null;
    }
    const filered = products.filter((item) => {
      return (
        item.category === category &&
        item.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
      );
    });

    const sorted = filered.sort((itemA, itemB) => {
      switch (sortParam) {
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
  }, [products, category, sortParam, query]);

  const sliceProducts = useMemo(() => {
    if (perPage === 'all') {
      return preparePhone ? [...preparePhone] : null;
    }

    const perPageNumber = +perPage;

    return preparePhone?.slice(perPageNumber * page - perPageNumber, perPageNumber * page) || null;
  }, [perPage, page, preparePhone]);

  const maxPage = useMemo(() => {
    if (!preparePhone) {
      return 1;
    }

    if (perPage === 'all') {
      return 1;
    }

    const perPageNumber = +perPage;

    return Math.ceil(preparePhone.length / perPageNumber);
  }, [preparePhone, perPage]);

  useLayoutEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <main>
      <div className={styles.content}>
        <Breadcrumbs></Breadcrumbs>
        <h1 >{title}</h1>
        <p className={styles.p}>{!preparePhone ? '...' : preparePhone.length} {t('productPage.models')}</p>
        <div className={styles.filterSortContainer}>
          <div className={classNames(styles.dropdownSortBox, styles.filterbox)}>
            <p>{t('productPage.sortByTitle')}</p>
            <Dropdown
              selects={[
                {
                  title: t('productPage.sortBy.alphabetically'),
                  option: typeSearch.alphabetically,
                },
                { title: t('productPage.sortBy.newest'), option: typeSearch.newest },
                { title: t('productPage.sortBy.cheapest'), option: typeSearch.cheapest },
              ]}
              selected={sortParam}
              onSelected={(value) => {
                const params = getSearchParams({ sort: value }, searchParams);
                setSearchParams(params);
              }}
            ></Dropdown>
          </div>
          <div className={classNames(styles.dropdownPerPageBox, styles.filterbox)}>
            <p>{t('productPage.itemsOnPageTitle')}</p>
            <Dropdown
              selects={[
                { title: '4', option: '4' },
                { title: '8', option: '8' },
                { title: '16', option: '16' },
                { title: 'All', option: 'all' },
              ]}
              selected={perPage}
              onSelected={(value) => {
                const params = getSearchParams({ perPage: value }, searchParams);
                setSearchParams(params);
              }}
            ></Dropdown>
          </div>
          <form className={classNames(styles.queryBox, styles.filterbox)} action="submit">
            <p>{t('productPage.search')}</p>
            <input
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
                debounce(500, () => {
                  const newParam = getSearchParams({ query: event.target.value });
                  setSearchParams(newParam);
                })();
              }}
              placeholder={t('productPage.search')}
              type="text"
            />
          </form>
        </div>

        {error && <h2>{error}</h2>}

        {!error && (
          <ProductsList
            length={perPage === 'all' ? sliceProducts?.length || 16 : +perPage}
            products={sliceProducts}
            isLoading={loading}
          ></ProductsList>
        )}

        {!error && sliceProducts && sliceProducts.length !== 0 && (
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

        {!error && !loading && products && products.length === 0 && (
          <h2>There are no products yet</h2>
        )}

        {!error && !loading && sliceProducts && sliceProducts.length === 0 && (
          <h2>No products found</h2>
        )}
      </div>
    </main>
  );
};
