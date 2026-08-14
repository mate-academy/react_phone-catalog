import { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from './products';
import { Product } from '../types/Product';

const SAMSUNG_IMPOSTER: Product = {
  id: 2424,
  itemId: 'samsung-galaxy-s24',
  name: 'Samsung Galaxy S24 (Imposter ඞ)',
  price: 899,
  fullPrice: 999,
  screen: "6.2' Dynamic AMOLED",
  capacity: '256GB',
  ram: '8GB',
  color: 'black',
  year: 2024,
  image: './img/phones/samsung-galaxy-s24.png',
  category: 'phones',
  isImposter: true,
};

export const useCatalogProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const PAGE_TITLES: Record<string, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const location = useLocation();
  const currentCategory = location.pathname.slice(1);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const allProducts = await getProducts();

        const filteredByCategory = allProducts.filter(
          product => product.category === currentCategory,
        );

        setProducts(filteredByCategory);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`There are no phones/tablets/accessories yet`, error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, [currentCategory]);

  const SORT_TO_PARAM: Record<string, string> = {
    Newest: 'age',
    Alphabetically: 'title',
    Cheapest: 'price',
  };

  const PARAM_TO_SORT: Record<string, string> = {
    age: 'Newest',
    title: 'Alphabetically',
    price: 'Cheapest',
  };

  const currentSortParam = searchParams.get('sort') || 'age';
  const currentSortLabel = PARAM_TO_SORT[currentSortParam] || 'Newest';
  const currentPerPage = searchParams.get('perPage') || '16';
  const currentPageNumber = Number(searchParams.get('page')) || 1;

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (currentSortParam === 'age') {
        return b.year - a.year;
      }

      if (currentSortParam === 'price') {
        return a.price - b.price;
      }

      if (currentSortParam === 'title') {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });
  }, [products, currentSortParam]);

  const allCategoryProducts = useMemo(() => {
    if (currentCategory !== 'phones') {
      return sortedProducts;
    }

    const copy = [...sortedProducts];
    const TARGET_GLOBAL_INDEX = 56;

    if (copy.length >= TARGET_GLOBAL_INDEX) {
      copy.splice(TARGET_GLOBAL_INDEX, 0, SAMSUNG_IMPOSTER);
    } else {
      copy.push(SAMSUNG_IMPOSTER);
    }

    return copy;
  }, [sortedProducts, currentCategory]);

  const isAllSelected = currentPerPage.toLowerCase() === 'all';

  const itemsPerPageNumber = useMemo(() => {
    if (isAllSelected) {
      return allCategoryProducts.length || 1;
    }

    return Number(currentPerPage) || 16;
  }, [isAllSelected, allCategoryProducts.length, currentPerPage]);

  const visibleProducts = useMemo(() => {
    if (isAllSelected) {
      return allCategoryProducts;
    }

    const startIndex = (currentPageNumber - 1) * itemsPerPageNumber;

    return allCategoryProducts.slice(
      startIndex,
      startIndex + itemsPerPageNumber,
    );
  }, [
    allCategoryProducts,
    isAllSelected,
    currentPageNumber,
    itemsPerPageNumber,
  ]);

  const handleSortChange = (newLabel: string) => {
    const newParams = new URLSearchParams(searchParams);
    const paramValue = SORT_TO_PARAM[newLabel];

    if (paramValue && paramValue !== 'age') {
      newParams.set('sort', paramValue);
    } else {
      newParams.delete('sort');
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (newPerPage: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPerPage.toLowerCase() === 'all') {
      newParams.set('perPage', 'all');
    } else if (newPerPage !== '16') {
      newParams.set('perPage', newPerPage);
    } else {
      newParams.delete('perPage');
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  return {
    products: allCategoryProducts,
    visibleProducts,
    isLoading,
    hasError,
    currentCategory,
    handlePerPageChange,
    handleSortChange,
    currentSortLabel,
    currentPerPage,
    itemsPerPageNumber,
    currentPageNumber,
    PAGE_TITLES,
  };
};
