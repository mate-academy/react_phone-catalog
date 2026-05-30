import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Products.module.scss';
import { CategoryDates } from '../../types/Categorys';
import { ProductsType } from '../../types/Products';
import { Breadcrumbs } from '../Breadcrumbs';
import { Dropdown } from '../Dropdown';
import { ProductList } from '../ProductList';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, Params } from '../../utils/SearchParams';
import { sortFunction } from '../../utils/Sort';
import { NotFound } from '../NotFound';

export type ItemsPerPage = '4' | '8' | '16' | 'All';

enum SortValues {
  age = 'Newest',
  title = 'Alphabetically',
  price = 'Cheapest',
}

type Props = {
  category: CategoryDates;
  categoryItems: ProductsType[];
};

export const Products: React.FC<Props> = ({ category, categoryItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [failedQuery, setFailedQuery] = useState(false);

  const currentPage = +(searchParams.get('page') || 1);
  const itemsPerPage = (searchParams.get('perPage') || 'All') as ItemsPerPage;
  const query = searchParams.get('query') || '';

  const sortValue =
    searchParams.get('sort') || ('age' as keyof typeof SortValues);
  const sortBy = SortValues[sortValue as keyof typeof SortValues];

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const sortChange = (sort: SortValues) => {
    for (const key in SortValues) {
      if (sort === SortValues[key as keyof typeof SortValues]) {
        setSearchWith({ sort: key });
      }
    }
  };

  const currentPageChange = (page: number) => {
    setSearchWith({ page: page === 1 ? null : page });
  };

  const itemsPerPageChange = (itemsValue: ItemsPerPage) => {
    setSearchWith({ perPage: itemsValue === 'All' ? null : itemsValue });
  };

  const pages = useMemo(() => {
    if (itemsPerPage === 'All') {
      return 1;
    }

    return Math.ceil(categoryItems.length / +itemsPerPage);
  }, [categoryItems.length, itemsPerPage]);

  const normalizeValue = (value: string) => {
    return value.toLowerCase();
  };

  const filterItems = useCallback(() => {
    return [...categoryItems].filter(item =>
      normalizeValue(item.name).includes(normalizeValue(query)),
    );
  }, [categoryItems, query]);

  const currentItems = useMemo(() => {
    setFailedQuery(false);

    let sortedList = sortFunction(sortBy, categoryItems);

    if (query !== '') {
      const filteredItems = filterItems();

      if (!filteredItems.length) {
        setFailedQuery(true);

        return [];
      }

      sortedList = sortFunction(sortBy, filteredItems);
    }

    if (itemsPerPage === 'All') {
      return sortedList;
    }

    const lastItem = currentPage * +itemsPerPage;
    const firstItem = lastItem - +itemsPerPage;

    return [...sortedList].slice(firstItem, lastItem);
  }, [categoryItems, currentPage, filterItems, itemsPerPage, query, sortBy]);

  useEffect(() => {
    currentPageChange(1);
  }, [itemsPerPage]);

  return (
    <div className={styles.products}>
      <div className={styles.productsTopPart}>
        <Breadcrumbs page={category.name} />

        <div className={styles.productPageTitle}>
          <h1>{category.pageName} page</h1>
          <p className="body-text-small grayText">
            {categoryItems ? categoryItems.length : '00'} models
          </p>
        </div>

        <div className={styles.dropdowns}>
          <div className={styles.sortDropdown}>
            <label htmlFor="options" className="grayText body-text">
              Sort by
            </label>
            <Dropdown
              options={[...Object.values(SortValues)]}
              active={sortBy}
              setValueFunction={sortChange}
            />
          </div>

          <div className={styles.paginationDropdown}>
            <label htmlFor="options" className="grayText body-text">
              Items on page
            </label>

            <Dropdown
              options={['All', '4', '8', '16']}
              active={itemsPerPage}
              setValueFunction={itemsPerPageChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.productsContent}>
        {failedQuery && (
          <NotFound
            title={`There are no ${category.name} matching the query`}
            imgSrc={'product-not-found.png'}
          />
        )}

        {!failedQuery && currentItems.length > 0 && (
          <ProductList itemsList={currentItems} />
        )}
      </div>

      {pages > 1 && currentItems.length > 0 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={currentPageChange}
        />
      )}
    </div>
  );
};
