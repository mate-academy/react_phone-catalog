import { ProductsList } from '../ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';
import apiProducts from '../../../public/api/products.json';
import React, { useEffect, useState } from 'react';
import styles from './CategoryPage.module.scss';
import { CustomSelect } from './CustomSelect';
import { useSearchParams } from 'react-router-dom';
import { SortValue } from 'models/sortvalue.model';
import { Pagination } from '../shared/Pagination/Pagination';

enum Category {
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
}
const SORT_VALUES: SortValue[] = [
  'newest',
  'oldest',
  'alpha-asc',
  'alpha-desc',
  'price-low-high',
  'price-high-low',
];

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
    if (category === Category.phones) {
      return apiProducts.filter(product => product.category === Category.phones)
        .length;
    } else if (category === Category.tablets) {
      return apiProducts.filter(
        product => product.category === Category.tablets,
      ).length;
    } else if (category === Category.accessories) {
      return apiProducts.filter(
        product => product.category === Category.accessories,
      ).length;
    } else {
      return 0;
    }
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
        <Breadcrumbs category={category} />
        <h1 className={styles.categoryPage__title}>{title}</h1>
        <p className={styles.categoryPage__countmodels__p}>
          {countModels} models
        </p>
        {/* {зробити СЕЛЕКТИ ХОВЕР ФОКУСИ ТА ЗАВДЯКИ ВІДЕО МЕЙТ ЗРОБИТИ СОРТУВАННЯ} */}
        <div className={styles.categoryPage__filteredmodel}>
          <div className={styles.categoryPage__sort}>
            <label htmlFor="sort" className={styles.categoryPage__label}>
              Sort by
            </label>
            <CustomSelect
              id="sort"
              value={sort}
              onChange={setSort}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'oldest', label: 'Oldest' },
                { value: 'alpha-asc', label: 'A-Z, alphabet' },
                { value: 'alpha-desc', label: 'Z-A, alphabet' },
                { value: 'price-low-high', label: 'Price: Low to High' },
                { value: 'price-high-low', label: 'Price: High to Low' },
              ]}
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
      <Footer />
    </>
  );
};
