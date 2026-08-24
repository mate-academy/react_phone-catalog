import { useEffect, useMemo, useState } from 'react';
import products from '../../public/api/products.json';
import { SortBy } from '../types/SortBy';
import { ItemsOnPage } from '../types/ItemsOnPage';
import { sortPhones } from '../styles/utils/sortPhones';
import { useSearchParams } from 'react-router-dom';

export const useProducts = (category?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    setTimeout(() => {
      Promise.resolve(products)
        .then(data => {
          const categoryProducts = category
            ? data.filter(product => product.category === category)
            : data;

          setFilteredProducts(categoryProducts);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  }, [category]);

  const itemsPerPage =
    (searchParams.get('perPage') as ItemsOnPage) || ItemsOnPage.All;

  const sortBy = (searchParams.get('sort') as SortBy) || SortBy.Newest;

  const setSortBy = (value: SortBy) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);

    setSearchParams(params);
  };

  const setCurrentPage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    setSearchParams(params);
  };

  const setItemsPerPage = (value: ItemsOnPage) => {
    const params = new URLSearchParams(searchParams);

    if (value === ItemsOnPage.All) {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('perPage', value);
      params.delete('page');
    }

    setSearchParams(params);
  };

  const sortedProducts = useMemo(
    () => sortPhones(filteredProducts, sortBy),
    [filteredProducts, sortBy],
  );

  const currentPage = Number(searchParams.get('page')) || 1;

  const perPage =
    itemsPerPage === ItemsOnPage.All
      ? filteredProducts.length
      : Number(itemsPerPage);

  return {
    products: filteredProducts,
    sortedProducts,

    sortBy,
    setSortBy,

    itemsPerPage,
    setItemsPerPage,

    currentPage,
    setCurrentPage,

    perPage,

    loading,
    error,
  };
};
