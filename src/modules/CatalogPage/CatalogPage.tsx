import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import cl from 'classnames';

import { Product } from '../../types/Product';
import { HomeIcon } from '../../components/Icons/HomeIcon';
import { ArrowRightIcon } from '../../components/Icons/ArrowRightIcon';
import { Dropdown } from './components/DropDown';
import { ProductsList } from './components/ProductsList';
import { Pagination } from './components/Pagination';

import styles from './CatalogPage.module.scss';
import { NoResults } from './components/NoResults';

type Props = {
  categoryType: 'phones' | 'tablets' | 'accessories';
  products: Product[];
};

const CATEGORY_NAMES: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const SORT_OPTIONS = ['age', 'price', 'title'];
const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const CatalogPage: React.FC<Props> = ({ categoryType, products }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || 'all';
  const query = searchParams.get('query') || '';

  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const applyQuery = useMemo(
    () =>
      debounce((newQuery: string) => {
        setSearchParams(prevParams => {
          const params = new URLSearchParams(prevParams);

          if (!newQuery.trim()) {
            params.delete('query');
          } else {
            params.set('query', newQuery.trim());
          }

          params.delete('page');

          return params;
        });
      }, 500),
    [setSearchParams],
  );

  useEffect(() => {
    return () => {
      applyQuery.cancel();
    };
  }, [applyQuery]);

  const handleParamsChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    const isDefaultSort = key === 'sort' && value === 'age';
    const isDefaultPerPage = key === 'perPage' && value === 'all';
    const isDefaultPage = key === 'page' && value === '1';

    if (isDefaultPage || isDefaultPerPage || isDefaultSort || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key !== 'page') {
      params.delete('page');
    }

    setSearchParams(params);
  };

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [categoryType, sort, perPage]);

  const visibleProducts = useMemo(() => {
    let filtered = products.filter(
      product => product.category === categoryType,
    );

    if (query) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price':
          return a.price - b.price;

        case 'title':
          return a.name.localeCompare(b.name);

        case 'age':
        default:
          return b.year - a.year;
      }
    });

    return sorted;
  }, [products, categoryType, sort, query]);

  const countOfModels = products.filter(
    product => product.category === categoryType,
  ).length;

  const currentPage = searchParams.get('page') || 1;
  const itemsPerPage =
    perPage === 'all' ? visibleProducts.length : Number(perPage);

  const totalPages = Math.ceil(visibleProducts.length / itemsPerPage);

  const rawPage = Number(searchParams.get('page')) || 1;
  const page = Math.max(1, Math.min(rawPage, totalPages || 1));

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const productsToDisplay =
    perPage === 'all'
      ? visibleProducts
      : visibleProducts.slice(startIndex, endIndex);

  return (
    <section className={cl('container', [styles.section])}>
      <nav className={styles.nav} aria-label="Breadcrumb">
        <Link to="/" className={styles.homeLink}>
          <HomeIcon />
        </Link>

        <div className={styles.chevron}>
          <ArrowRightIcon />
        </div>

        <p className={styles.catalogName}>{categoryType}</p>
      </nav>

      <h1 className={styles.title}>{CATEGORY_NAMES[categoryType]}</h1>

      <p className={styles.count}>{countOfModels} models</p>
      <div className={styles.contentFilters}>
        <Dropdown
          label="Sort by"
          options={SORT_OPTIONS}
          selectedValue={sort}
          className={styles.sortDropdown}
          onSelect={val => handleParamsChange('sort', val)}
        />

        <Dropdown
          label="Items on page"
          options={PER_PAGE_OPTIONS}
          selectedValue={perPage}
          className={styles.itemsDropdown}
          onSelect={val => handleParamsChange('perPage', val)}
        />

        <div className={styles.searchGroup}>
          <p className={styles.label}>Looking for something?</p>

          <input
            type="search"
            placeholder="Type here"
            className={styles.input}
            value={localQuery}
            onChange={e => {
              setLocalQuery(e.target.value);
              applyQuery(e.target.value);
            }}
          />
        </div>
      </div>

      {productsToDisplay.length === 0 ? (
        <NoResults text={categoryType} />
      ) : (
        <ProductsList isLoading={isLoading} products={productsToDisplay} />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={Number(currentPage)}
        onPageChange={p => handleParamsChange('page', String(p))}
        perPage={perPage}
      />
    </section>
  );
};
