import { useCallback, useState } from 'react';

import { TProduct } from '@utils/types/product.type';

import { useOutsideClick, useProducts } from './index';

export const useSearch = () => {
  const { products, filteredByQuery } = useProducts();

  const [query, setQuery] = useState('');
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);

  const resetSearchBar = () => {
    setQuery('');
    setFilteredProducts([]);
    setIsOpenInput(false);
  };

  const searchRef = useOutsideClick(resetSearchBar);

  const onChangeFilterProducts = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setQuery('');
        return;
      }
      setQuery(query);

      const filtered = filteredByQuery(query.trim());

      setFilteredProducts(filtered);
    },
    [products, setFilteredProducts],
  );

  return {
    query,
    isOpenInput,
    searchRef,
    filteredProducts,
    resetSearchBar,
    setIsOpenInput,
    setFilteredProducts,
    onChangeFilterProducts,
  };
};
