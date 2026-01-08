import { ProductsList } from '../ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';
import apiProducts from '../../../public/api/products.json';
import React, { useEffect, useState } from 'react';
import styles from './CategoryPage.module.scss';
import { CustomSelect } from './CustomSelect';
import { useSearchParams } from 'react-router-dom';
import { SortValue, sortOptions, SORT_VALUES } from 'models/sortvalue.model';
import { Pagination } from '../shared/Pagination/Pagination';

export const CategoryPage: React.FC<{ category: string; title: string }> = ({
  category,
  title,
}) => {
  const [countModels, setCountModels] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || '16';

  const page = pageParam < 1 ? 1 : pageParam;
  const perPage = perPageParam;
  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  const setPerPage = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
      params.delete('page'); // page скидаємо
    } else {
      params.set('perPage', value);
      params.delete('page');
    }

    setSearchParams(params);
  };

  const paramSort = searchParams.get('sort');

  const sort: SortValue = SORT_VALUES.includes(paramSort as SortValue)
    ? (paramSort as SortValue)
    : 'newest';

  const setSort = (nextSort: string) => {
    const params = new URLSearchParams(searchParams);

    if (nextSort === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', nextSort);
    }

    setSearchParams(params);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getModelsCount = (category: string) => {
    const filteredItems = apiProducts.filter(
      product => product.category === category,
    );

    return filteredItems.length;
  };

  useEffect(() => {
    setCountModels(getModelsCount(category));
  }, [category]);

  useEffect(() => {
    if (paramSort && !SORT_VALUES.includes(paramSort as SortValue)) {
      const params = new URLSearchParams(searchParams);

      params.delete('sort');
      setSearchParams(params, { replace: true });
    }
  }, [paramSort, searchParams, setSearchParams]);

  return (
    <>
      <Header />
      <div className={styles.categoryPage}>
        <div className={styles.categoryPage__section}>
          <Breadcrumbs category={category} />
          <h1 className={styles.categoryPage__title}>{title}</h1>
          <p className={styles.categoryPage__countmodels__p}>
            {countModels} models
          </p>
          <div className={styles.categoryPage__filteredmodel}>
            <div className={styles.categoryPage__sort}>
              <label htmlFor="sort" className={styles.categoryPage__label}>
                Sort by
              </label>
              <CustomSelect
                id="sort"
                value={sort}
                onChange={setSort}
                options={sortOptions}
                ariaLabel="Sort products"
              />
            </div>
            <div className={styles.categoryPage__sort}>
              <label htmlFor="perPage" className={styles.categoryPage__label}>
                Items on page
              </label>
              <CustomSelect
                id="perPage"
                value={perPage}
                onChange={setPerPage}
                options={[
                  { value: '4', label: '4' },
                  { value: '8', label: '8' },
                  { value: '16', label: '16' },
                  { value: 'all', label: 'all' },
                ]}
                ariaLabel="Items on page"
              />
            </div>
          </div>
        </div>
        <div className={styles.categoryPage__section}>
          <ProductsList
            category={category}
            sort={sort}
            page={page}
            perPage={perPage}
          />
          {perPage !== 'all' && countModels > Number(perPage) && (
            <Pagination
              total={countModels}
              perPage={Number(perPage)}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
