import { useMemo } from 'react';
import { CATEGORY_TITLES } from '../constants/categoryTitles';
import { PRODUCT_PAGES_ALL_CATEGORIES } from '../constants/productPagesAllCategories';
import type { Product } from '../types/product';
import { getProductsByCategory } from '../utils/getProductsByCategory';
import { sortProducts } from '../utils/sortProducts';

export function useCatalogProducts(
  products: Product[],
  category: string | undefined,
  sortBy: string,
  currentPage: number,
  itemsOnPage: string | number,
) {
  const isValidCategory =
    !!category && PRODUCT_PAGES_ALL_CATEGORIES.includes(category);

  const productsFromServer = useMemo(
    () =>
      isValidCategory ?
        getProductsByCategory(category!, PRODUCT_PAGES_ALL_CATEGORIES, products)
      : [],
    [category, products, isValidCategory],
  );

  const pageTitle = useMemo(
    () =>
      isValidCategory ?
        CATEGORY_TITLES[category as keyof typeof CATEGORY_TITLES] || 'Products'
      : 'Products',
    [category, isValidCategory],
  );

  const isAll = itemsOnPage === 'all';

  const itemsPerPage =
    isAll ? productsFromServer.length : (itemsOnPage as number);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const sortedProducts = useMemo(
    () => sortProducts(productsFromServer, sortBy),
    [productsFromServer, sortBy],
  );

  const visibleItems = useMemo(
    () =>
      isAll ? sortedProducts : (
        sortedProducts.slice(startIndex, startIndex + itemsPerPage)
      ),
    [isAll, sortedProducts, startIndex, itemsPerPage],
  );

  const pageCount =
    isAll ? 1 : Math.ceil(productsFromServer.length / itemsPerPage);

  return {
    isValidCategory,
    pageTitle,
    productsFromServer,
    visibleItems,
    pageCount,
    isAll,
  };
}
