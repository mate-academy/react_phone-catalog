import { useEffect, useState } from 'react';
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

  const [pages, setPages] = useState(1);

  const [currentPageItems, setCurrentPageItems] =
    useState<ProductsType[]>(categoryItems);

  const [failedQuery, setFailedQuery] = useState(false);

  const currentPage = +(searchParams.get('page') || 1);
  const itemsPerPage = (searchParams.get('perPage') || 'All') as ItemsPerPage;
  const query = searchParams.get('query') || '';

  const sortValue = searchParams.get('sort') || SortValues.age;
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

  const pageNums = () => {
    if (itemsPerPage === 'All') {
      setPages(1);

      return;
    }

    setPages(Math.ceil(categoryItems.length / +itemsPerPage));
  };

  const normalizeValue = (value: string) => {
    return value.toLowerCase();
  };

  const filterItems = () => {
    return [...categoryItems].filter(item =>
      normalizeValue(item.name).includes(normalizeValue(query)),
    );
  };

  const currentItems = () => {
    setFailedQuery(false);

    let sortedList = sortFunction(sortBy, categoryItems);

    if (query !== '') {
      const filteredItems = filterItems();

      if (!filteredItems.length) {
        setFailedQuery(true);
        setCurrentPageItems([]);

        return;
      }

      sortedList = sortFunction(sortBy, filteredItems);
    }

    if (itemsPerPage === 'All') {
      setCurrentPageItems([...sortedList]);

      return;
    }

    const lastItem = currentPage * +itemsPerPage;
    const firstItem = lastItem - +itemsPerPage;

    setCurrentPageItems([...sortedList].slice(firstItem, lastItem));
  };

  useEffect(() => {
    setSearchWith({ sort: 'age' });
  }, [category]);

  useEffect(() => {
    currentPageChange(1);
    pageNums();
    currentItems();
  }, [itemsPerPage]);

  useEffect(() => {
    currentItems();
  }, [categoryItems, currentPage, sortBy, query]);

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

        {!failedQuery && currentPageItems.length > 0 && (
          <ProductList itemsList={currentPageItems} />
        )}
      </div>

      {pages > 1 && currentPageItems.length > 0 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={currentPageChange}
        />
      )}
    </div>
  );
};
