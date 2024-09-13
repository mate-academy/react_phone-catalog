import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductByCategoryPage.module.scss';

import { AppContext } from '../../AppContext';
import { Product } from '../../typies';
import { debounce, latestYear } from '../../utils';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';
import { Pagination } from '../../components/Pagination';
import { ProductsList } from '../../components/ProductsList/ProductsList';

const SORT_DEFAULT = 'age';
const PER_PAGE_ALL = 'all';
const PER_PAGE_DEFAULT = PER_PAGE_ALL;

export const getPageItems = (
  products: Product[],
  itemsPerPage: number | string,
  currentPage: number,
): Product[] => {
  if (itemsPerPage === PER_PAGE_ALL) {
    return [...products];
  }

  const perPage = Number(itemsPerPage);

  return [...products].slice(
    perPage * (currentPage - 1),
    perPage * currentPage,
  );
};

const filteredArr = (arr: Product[], query: string) => {
  return [...arr].filter(item =>
    item.name.trim().toLowerCase().includes(query.trim().toLowerCase()),
  );
};

type Props = {
  products: Product[] | null;
  category: string;
};

export const ProductByCategoryPage: React.FC<Props> = ({
  products,
  category,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isError, setIsSearch, search, setSearch } =
    React.useContext(AppContext);

  const [currentPage, setCurrentPage] = React.useState(
    Number(searchParams.get('page')) || 1,
  );
  const [sort, setSort] = React.useState(
    searchParams.get('sort') || SORT_DEFAULT,
  );
  const [perPage, setPerPage] = React.useState(
    searchParams.get('perPage') || PER_PAGE_DEFAULT,
  );
  const [sortedProducts, setSortedProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const debounceSearch = debounce(async searchQuery => {
    if (products) {
      if (searchQuery) {
        setFilteredProducts(filteredArr(products, searchQuery));
      } else {
        setFilteredProducts(products);
      }
    }
  });

  // const debounceSearch = debounce(searchQuery => {
  //   if (products) {
  //     if (searchQuery) {
  //       setFilteredProducts(filteredArr(products, searchQuery));
  //     } else {
  //       setFilteredProducts(products);
  //     }
  //   }
  // });

  React.useEffect(() => {
    setIsSearch(true);

    return () => {
      setIsSearch(false);
    };
  }, [setIsSearch]);

  React.useEffect(
    () => setSearch(searchParams.get('query') || ''),
    [searchParams, setSearch],
  );

  React.useEffect(() => {
    if (products) {
      setIsLoading(false);
      setFilteredProducts(products);
    } else {
      setIsLoading(true);
    }
  }, [products]);

  React.useEffect(() => {
    if (products) {
      debounceSearch(search);
    }
  }, [products, search, debounceSearch]);

  React.useEffect(() => {
    switch (sort) {
      case 'age':
        const year = latestYear(filteredProducts);

        setSortedProducts(
          filteredProducts.filter(product => product.year === year) || [],
        );
        break;

      case 'title':
        setSortedProducts(
          filteredProducts.sort((product1, product2) =>
            product1.name.localeCompare(product2.name),
          ) || [],
        );
        break;

      case 'price':
        setSortedProducts(
          filteredProducts.sort(
            (product1, product2) => product1.fullPrice - product2.fullPrice,
          ) || [],
        );
        break;

      default:
        setSortedProducts([]);
    }
  }, [filteredProducts, sort]);

  const pageItems = React.useMemo(
    () =>
      sortedProducts ? getPageItems(sortedProducts, perPage, currentPage) : [],
    [perPage, currentPage, sortedProducts],
  );

  const handlePerPageSelectorChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(event.target.value);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams);

    params.delete('page'); // because every time page is 1

    if (event.target.value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', event.target.value);
    }

    setSearchParams(params);
  };

  const handleSortSelectorChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSort(event.target.value);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams);

    params.delete('page'); // because every time page is 1

    params.set('sort', event.target.value);
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    setSearchParams(params);
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs category={category} />

      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>
          <span className={styles.titleType}>{category}</span> page
        </h1>
        {!isLoading && !isError && sortedProducts.length > 0 && (
          <p className={styles.productsCount}>{sortedProducts.length} models</p>
        )}
      </div>

      {isLoading && !isError && <Loader />}

      {isError && <Error />}

      {!isLoading && !isError && !sortedProducts.length && (
        <p>There are no {category} yet</p>
      )}

      {!isLoading && !isError && sortedProducts.length > 0 && (
        <div>
          <div className={styles.selectWrapper}>
            <div className={styles.selectContainer}>
              <label htmlFor="productSortId" className={styles.label}>
                Sort by
              </label>
              <select
                name="sort"
                id="productSortId"
                className={styles.select}
                value={sort}
                onChange={handleSortSelectorChange}
              >
                <option value="age" className={styles.option}>
                  Newest
                </option>
                <option value="title" className={styles.option}>
                  Alphabetically
                </option>
                <option value="price" className={styles.option}>
                  Cheapest
                </option>
              </select>
            </div>

            <div className={styles.selectContainer}>
              <label htmlFor="productOnPageId" className={styles.label}>
                Items on page
              </label>
              <select
                name="sort"
                id="productOnPageId"
                className={styles.select}
                style={{ width: '128px' }}
                value={perPage}
                onChange={handlePerPageSelectorChange}
              >
                <option value="4" className={styles.option}>
                  4
                </option>
                <option value="8" className={styles.option}>
                  8
                </option>
                <option value="16" className={styles.option}>
                  16
                </option>
                <option value="all" className={styles.option}>
                  All
                </option>
              </select>
            </div>
          </div>

          {perPage === PER_PAGE_ALL ? (
            <ProductsList products={sortedProducts} />
          ) : (
            <ProductsList products={pageItems} />
          )}

          <Pagination
            total={sortedProducts.length}
            perPage={Number(perPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <hr className={styles.line} />
    </div>
  );
};
