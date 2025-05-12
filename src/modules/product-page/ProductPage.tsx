import React, { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { SortBy } from '../../types/SortBy';
import styles from './ProductPage.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import { Breadcrumbs } from '../shared/components/breadcrumbs';
import { Select, SelectOption } from '../shared/components/select';
import { ProductList } from '../shared/components/product-list';
import { Pagination } from '../shared/components/pagination';
import { getSearchWith } from '../../utils/searchHelper';

const getCategoryTitle = (
  categoryPath: Product['category'] | string,
): string => {
  switch (categoryPath) {
    case 'phones':
      return 'Mobile phones';
    case 'tablets':
      return 'Tablets';
    case 'accessories':
      return 'Accessories';
    default:
      return 'Products';
  }
};

const sortProductsList = (products: Product[], sortBy: SortBy): Product[] => {
  const productsToSort = [...products];

  switch (sortBy) {
    case SortBy.New:
      return productsToSort.sort((a, b) => b.year - a.year);
    case SortBy.Alphabet:
      return productsToSort.sort((a, b) => a.name.localeCompare(b.name));
    case SortBy.Cheapest:
      return productsToSort.sort((a, b) => a.price - b.price);
    default:
      return productsToSort;
  }
};

const sortEnumToParamMap: { [key in SortBy]: string } = {
  [SortBy.New]: 'age',
  [SortBy.Alphabet]: 'title',
  [SortBy.Cheapest]: 'price',
};

const sortParamToEnumMap: { [key: string]: SortBy } = Object.fromEntries(
  Object.entries(sortEnumToParamMap).map(([enumVal, urlParam]) => [
    urlParam,
    enumVal as SortBy,
  ]),
);

const DEFAULT_SORT_BY_ENUM = SortBy.New;
const DEFAULT_SORT_PARAM = sortEnumToParamMap[DEFAULT_SORT_BY_ENUM];

const DEFAULT_PER_PAGE = 16;
const DEFAULT_PAGE = 1;

const sortByOptions: SelectOption<string>[] = (
  Object.values(SortBy) as SortBy[]
).map((enumValue: SortBy) => ({
  value: sortEnumToParamMap[enumValue],
  label: enumValue,
}));

const perPageValues = [32, 16, 8, 4];
const perPageOptions: SelectOption<number>[] = perPageValues.map(value => ({
  value: value,
  label: String(value),
}));

export const ProductPage: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const productsFromServer: Product[] = useAppSelector(state => state.products);

  const categoryPath = location.pathname.replace(/^\//, '');

  const sortParamFromUrl = searchParams.get('sort');
  const currentSortByLogic = sortParamFromUrl
    ? sortParamToEnumMap[sortParamFromUrl]
    : DEFAULT_SORT_BY_ENUM;
  const currentSortParamForSelect = sortParamFromUrl || DEFAULT_SORT_PARAM;

  const currentPerPage = parseInt(
    searchParams.get('perPage') || String(DEFAULT_PER_PAGE),
  );
  const currentPageQuery = parseInt(
    searchParams.get('page') || String(DEFAULT_PAGE),
  );

  const filteredProducts = useMemo(() => {
    return productsFromServer.filter(
      product => product.category === categoryPath,
    );
  }, [productsFromServer, categoryPath]);

  const sortedProducts = useMemo(() => {
    return sortProductsList(filteredProducts, currentSortByLogic);
  }, [filteredProducts, currentSortByLogic]);

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / currentPerPage);
  const currentPage = Math.max(1, Math.min(currentPageQuery, totalPages || 1));

  const productsToShow = useMemo(() => {
    const startIndex = (currentPage - 1) * currentPerPage;

    return sortedProducts.slice(startIndex, startIndex + currentPerPage);
  }, [sortedProducts, currentPage, currentPerPage]);

  const handleSortByChange = (selectedUrlParam: string) => {
    setSearchParams(
      getSearchWith(searchParams, {
        sort: selectedUrlParam,
        page: null,
      }),
    );
  };

  const handlePerPageChange = (selectedPerPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, {
        perPage:
          selectedPerPage === DEFAULT_PER_PAGE ? null : String(selectedPerPage),
        page: null,
      }),
    );
  };

  const generatePageLink = (pageNumber: number): string => {
    const newSearch = getSearchWith(searchParams, {
      page: pageNumber === DEFAULT_PAGE ? null : String(pageNumber),
    });

    return `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
  };

  const getPaginationRange = (): number[] => {
    const range: number[] = [];
    const maxLinks = 4;
    let start = Math.max(1, currentPage - Math.floor(maxLinks / 2));
    let end = Math.min(totalPages, start + maxLinks - 1);

    if (end - start + 1 < maxLinks && totalPages >= maxLinks) {
      start = Math.max(1, end - maxLinks + 1);
    } else if (totalPages < maxLinks) {
      start = 1;
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const paginationRange = useMemo(getPaginationRange, [
    currentPage,
    totalPages,
  ]);
  const categoryTitle = getCategoryTitle(categoryPath);

  return (
    <main>
      <Breadcrumbs />
      <h1>{categoryTitle}</h1>
      <p className={styles.subtitle}>{totalProducts} models</p>

      {filteredProducts.length > 0 && (
        <div className={styles.filters}>
          <div className={styles.filterItem}>
            <Select
              id="sortBy"
              label="Sort by"
              options={sortByOptions}
              currentValue={currentSortParamForSelect}
              onChange={handleSortByChange}
            />
          </div>
          <div className={styles.filterItem}>
            <Select
              id="perPage"
              label="Items on page"
              options={perPageOptions}
              currentValue={currentPerPage}
              onChange={handlePerPageChange}
            />
          </div>
        </div>
      )}

      {productsToShow.length > 0 ? (
        <ProductList products={productsToShow} />
      ) : (
        currentPage > 1 &&
        filteredProducts.length > 0 && (
          <p>No products match the current criteria on this page.</p>
        )
      )}
      {totalProducts === 0 && categoryPath && (
        <p>There are no products in this category yet.</p>
      )}
      {totalPages > 1 && productsToShow.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginationRange={paginationRange}
          generatePageLink={generatePageLink}
        />
      )}
    </main>
  );
};
