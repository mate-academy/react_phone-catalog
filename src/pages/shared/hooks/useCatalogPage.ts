import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../../types/Phone';
import { fetchWithDelay } from '../../../api/fetchWithDelay';
import {
  DEFAULT_PER_PAGE,
  DEFAULT_SORT,
  getPaginationItems,
} from '../constants/catalog';

type CatalogResult = {
  items: Phone[];
  visibleItems: Phone[];
  isLoading: boolean;
  sort: string;
  perPage: string;
  page: number;
  totalPages: number;
  paginationItems: number[];
  handleSortChange: (newSort: string) => void;
  handlePerPageChange: (newPerPage: string) => void;
  handlePageChange: (newPage: number) => void;
};

export const useCatalogPage = (dataUrl: string): CatalogResult => {
  const [items, setItems] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || DEFAULT_SORT;
  const perPage = searchParams.get('perPage') || DEFAULT_PER_PAGE;
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const loadItems = async () => {
      try {
        setIsLoading(true);

        const itemsResponse = await fetchWithDelay(dataUrl);
        const itemsData = await itemsResponse.json();

        const productsResponse = await fetchWithDelay('api/products.json');
        const productsData = await productsResponse.json();

        const itemsWithYear = itemsData.map((item: Phone) => {
          const foundProduct = productsData.find(
            (product: { itemId: string; year: number }) =>
              product.itemId === item.id,
          );

          const year = foundProduct ? foundProduct.year : 0;

          return {
            ...item,
            year: year,
          };
        });

        setItems(itemsWithYear);
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, [dataUrl]);

  const sortedItems = useMemo(() => {
    const sorted = [...items];

    switch (sort) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sorted.sort((a, b) => {
          const priceA = a.priceDiscount || a.priceRegular;
          const priceB = b.priceDiscount || b.priceRegular;

          return priceA - priceB;
        });
        break;
      case 'age':
        sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      default:
        break;
    }

    return sorted;
  }, [items, sort]);

  const totalItems = sortedItems.length;
  const itemsPerPage = perPage === 'all' ? totalItems : Number(perPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const visibleItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  const handleSortChange = (newSort: string) => {
    setSearchParams(params => {
      params.set('sort', newSort);
      params.set('page', '1');

      return params;
    });
  };

  const handlePerPageChange = (newPerPage: string) => {
    setSearchParams(params => {
      params.set('perPage', newPerPage);
      params.set('page', '1');

      return params;
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setSearchParams(params => {
      params.set('page', newPage.toString());

      return params;
    });
  };

  const paginationItems = useMemo(
    () => getPaginationItems(page, totalPages),
    [page, totalPages],
  );

  return {
    items,
    visibleItems,
    isLoading,
    sort,
    perPage,
    page,
    totalPages,
    paginationItems,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  };
};
