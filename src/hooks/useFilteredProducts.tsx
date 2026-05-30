import { useMemo, useState } from 'react';
import { ProductType } from '../types/ProductType';

export const useFilteredProducts = (products: ProductType[]) => {
  const [sortBy, setSortBy] = useState<string>('Newest');
  const [itemPerPage, setItemPerPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredProducts = useMemo(() => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case 'Low to High':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case 'High to Low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;

      case 'Newest':
        sortedProducts.sort((a, b) => b.year - a.year);
        break;

      case 'Oldest':
        sortedProducts.sort((a, b) => a.year - b.year);
        break;

      default:
        break;
    }

    const startIndex = (currentPage - 1) * itemPerPage;

    return sortedProducts.slice(startIndex, startIndex + itemPerPage);
  }, [products, sortBy, itemPerPage, currentPage]);

  const totalPages = Math.ceil(products.length / itemPerPage);

  return {
    filteredProducts,
    sortBy,
    setSortBy,
    itemPerPage,
    setItemPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};
