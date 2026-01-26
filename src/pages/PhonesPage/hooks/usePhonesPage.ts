import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../../types/Phone';

export const usePhonesPage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const loadPhones = async () => {
      try {
        setIsLoading(true);

        const phonesResponse = await fetch('/api/phones.json');
        const phonesData = await phonesResponse.json();

        const productsResponse = await fetch('/api/products.json');
        const productsData = await productsResponse.json();

        const phonesWithYear = phonesData.map((phone: Phone) => {
          const foundProduct = productsData.find(
            (product: { itemId: string; year: number }) =>
              product.itemId === phone.id,
          );

          const year = foundProduct ? foundProduct.year : 0;

          return {
            ...phone,
            year: year,
          };
        });

        setPhones(phonesWithYear);
      } catch {
        setPhones([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhones();
  }, []);

  const sortedPhones = useMemo(() => {
    const sorted = [...phones];

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
  }, [phones, sort]);

  const totalItems = sortedPhones.length;
  const itemsPerPage = perPage === 'all' ? totalItems : Number(perPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const visiblePhones = sortedPhones.slice(
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
    phones,
    visiblePhones,
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
