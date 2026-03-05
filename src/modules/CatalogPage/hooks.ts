import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ItemsPerPage } from '../../types/ItemsPerPage';
import { SortName } from '../../types/SortName';
import { Product } from '../../types/Product';

export const useCatalog = (products: Product[]) => {
  const [sort, setSort] = useState<SortName>('age');

  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam: string | null = searchParams.get('page');
  const perPageParam = searchParams.get('perPage') as ItemsPerPage | null;

  const defaultCurrentPage = pageParam !== null ? Number(pageParam) : 1;

  const [currentPage, setCurrentPage] = useState<number>(defaultCurrentPage);
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(
    perPageParam !== null ? perPageParam : 'all',
  );

  const handleSort = (value: SortName) => {
    setSort(value);
    searchParams.set('sort', value);
    setSearchParams(searchParams, { replace: true });
  };

  const handlePerPage = (value: ItemsPerPage) => {
    setItemsPerPage(value);
    if (value !== 'all') {
      searchParams.set('perPage', value);
    }

    setSearchParams(searchParams, { replace: true });
  };

  const handlePage = (value: number) => {
    setCurrentPage(value);
    if (Number(value)) {
      searchParams.set('page', String(value));
    }

    setSearchParams(searchParams, { replace: true });
  };

  const sortedProducts = useMemo(() => {
    return [...products].sort((a: Product, b: Product): number => {
      switch (sort) {
        case 'age':
          return b.year - a.year;
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [products, sort]);

  const amountPages =
    itemsPerPage !== 'all'
      ? Math.ceil(sortedProducts.length / Number(itemsPerPage))
      : 0;
  const pages = Array.from({ length: amountPages }, (_, index) => index + 1);

  const startIndex = (currentPage - 1) * Number(itemsPerPage);
  const endIndex = startIndex + Number(itemsPerPage);

  const visibleProducts =
    itemsPerPage === 'all'
      ? [...sortedProducts]
      : [...sortedProducts].slice(startIndex, endIndex);

  useEffect(() => {
    handleSort('age');
    handlePerPage('all');
    handlePage(1);

    if (visibleProducts.length === 0) {
      searchParams.delete('sort');
      setSearchParams(searchParams, { replace: true });
    }
  }, [pathname]);

  return {
    handleSort,
    handlePerPage,
    handlePage,
    sort,
    currentPage,
    itemsPerPage,
    pages,
    visibleProducts,
  };
};
