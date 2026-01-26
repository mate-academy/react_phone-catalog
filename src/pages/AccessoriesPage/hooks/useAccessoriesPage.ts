import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../../types/Phone';

export const useAccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const loadAccessories = async () => {
      try {
        setIsLoading(true);

        const accessoriesResponse = await fetch('/api/accessories.json');
        const accessoriesData = await accessoriesResponse.json();

        const productsResponse = await fetch('/api/products.json');
        const productsData = await productsResponse.json();

        const accessoriesWithYear = accessoriesData.map((accessory: Phone) => {
          const foundProduct = productsData.find(
            (product: { itemId: string; year: number }) =>
              product.itemId === accessory.id,
          );

          const year = foundProduct ? foundProduct.year : 0;

          return {
            ...accessory,
            year: year,
          };
        });

        setAccessories(accessoriesWithYear);
      } catch {
        setAccessories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadAccessories();
  }, []);

  const sortedAccessories = useMemo(() => {
    const sorted = [...accessories];

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
  }, [accessories, sort]);

  const totalItems = sortedAccessories.length;
  const itemsPerPage = perPage === 'all' ? totalItems : Number(perPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const visibleAccessories = sortedAccessories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;

    setSearchParams(params => {
      params.set('sort', newSort);
      params.set('page', '1');

      return params;
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;

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

  const paginationItems = useMemo(() => {
    const items: number[] = [];
    const maxVisible = 4;

    let start = Math.max(1, page - Math.floor((maxVisible - 1) / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    return items;
  }, [page, totalPages]);

  return {
    accessories,
    visibleAccessories,
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
