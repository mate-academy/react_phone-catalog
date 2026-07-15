import { Params, updateSearchParams } from '../shared/utils/updateSearchParams';
import { Product } from '../shared/types/Product';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { isSortOption, SortOption } from '../shared/types/sortOptions';
import {
  isPaginationOption,
  PaginationOption,
} from '../shared/types/paginationOptions';

const CATEGORY_TITLES: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const INITIAL_PAGINATION = '16';

const SORT_FUNCTIONS = {
  Newest: (a: Product, b: Product) => b.year - a.year,
  Alphabetically: (a: Product, b: Product) =>
    a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()),
  Cheapest: (a: Product, b: Product) => a.price - b.price,
};

export const useCatalog = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}/api/products.json`,
        );

        if (!response.ok) {
          throw new Error('Internal server error');
        }

        const data: Product[] = await response.json();

        if (!data) {
          throw new Error('Products not found');
        }

        setProducts(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  function setSearchWith(params: Params) {
    const newParams = updateSearchParams(params, searchParams);

    setSearchParams(newParams);
  }

  const sortParam = searchParams.get('sort') || '';
  const currentSort: SortOption | '' = isSortOption(sortParam) ? sortParam : '';

  const paginationParam = searchParams.get('pagination') || '';
  const currentPagination: PaginationOption = isPaginationOption(
    paginationParam,
  )
    ? paginationParam
    : INITIAL_PAGINATION;
  const itemPerPage = +currentPagination;

  const pageParam = searchParams.get('page') || '1';
  const currentPage = Number.isInteger(+pageParam) ? +pageParam : 1;

  const title = category ? CATEGORY_TITLES[category] || 'Category' : 'Catalog';

  const productsByCategory: Product[] = useMemo(
    () =>
      products
        .filter(product => product.category === category)
        .map(product => ({ ...product, image: `/${product.image}` })),
    [category, products],
  );

  const count = productsByCategory.length;
  const pageCount = Math.ceil(count / +currentPagination);

  const sortedProducts = useMemo(
    () =>
      currentSort
        ? productsByCategory.toSorted(SORT_FUNCTIONS[currentSort])
        : productsByCategory,
    [productsByCategory, currentSort],
  );

  const preparedProducts = useMemo(() => {
    const start = itemPerPage * (currentPage - 1);
    const end = start + itemPerPage;

    return sortedProducts.slice(start, end);
  }, [sortedProducts, currentPage, itemPerPage]);

  const handlePageChange = (option: number) =>
    setSearchWith({ page: option.toString() });

  const handlePaginationChange = (option: string) => {
    setSearchWith({ pagination: option, page: '1' });
  };

  const handleSortChange = (option: string) => {
    setSearchWith({ page: '1', sort: option });
  };

  return {
    isError,
    isLoading,
    category,
    title,
    count,
    preparedProducts,
    currentSort,
    currentPagination,
    currentPage,
    pageCount,
    handleSortChange,
    handlePaginationChange,
    handlePageChange,
  };
};
