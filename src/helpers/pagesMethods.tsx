import React from 'react';

import { CatalogProduct } from '../types/CatalogProduct';
import { SortBy } from './enums';
import { getProducts } from '../utils/fetchData';
import { FavoriteItem } from '../types/FavoriteItem';

export const handleSort = (array: CatalogProduct[], sortValue: string) => {
  switch (sortValue) {
    case SortBy.Alphabetic:
      return [...array].sort((firstItem, secondItem) => firstItem.name
        .localeCompare(secondItem.name));

    case SortBy.Cheapest:
      return [...array].sort((firstItem, secondItem) => firstItem
        .fullPrice - secondItem.fullPrice);

    case SortBy.Newest:
    default:
      return [...array].sort((firstItem, secondItem) => firstItem
        .year - secondItem.year);
  }
};

export const handleSearch = (
  arrayToFilter: CatalogProduct[],
  query: string,
) => {
  const search = query.toLowerCase();

  const newArray = arrayToFilter
    .filter((item: CatalogProduct) => item.name.toLowerCase().includes(search));

  return newArray;
};

export const handleCurrentItemsList = (
  array: CatalogProduct[] | [],
  previousPageValue: string,
  pageValue: string,
): CatalogProduct[] => {
  if (!array.length) {
    return [];
  }

  let firstProductIdx: number;
  let lastProductIdx: number;

  if (previousPageValue === 'all') {
    firstProductIdx = 0;
    lastProductIdx = array.length;
  } else {
    firstProductIdx = (+pageValue - 1) * +previousPageValue;
    lastProductIdx = (firstProductIdx + +previousPageValue - 1) < array.length
      ? (firstProductIdx + +previousPageValue - 1) : array.length;
  }

  const currentList = array.filter((_product, idx) => (
    idx >= firstProductIdx && idx <= lastProductIdx
  ));

  return currentList;
};

export const getCurrentProductList = (
  products: CatalogProduct[],
  sort: string,
  query: string,
  previousPage: string,
  page: string,
  setPaginationTotal: React.Dispatch<React.SetStateAction<number>>,
) => {
  let currentList;
  const sortedPhones = handleSort(products, sort);

  if (query) {
    const searchResult = handleSearch(sortedPhones, query);

    setPaginationTotal(searchResult.length);
    currentList = handleCurrentItemsList(
      searchResult,
      previousPage,
      page,
    );
  } else {
    setPaginationTotal(products.length);
    currentList = handleCurrentItemsList(
      sortedPhones,
      previousPage,
      page,
    );
  }

  return currentList;
};

export const handleLoadMore = (
  array: CatalogProduct[],
  previousPageValue: string,
  currentItemsList: CatalogProduct[],
  setCurrentArray: React.Dispatch<React.SetStateAction<CatalogProduct[]>>,
) => {
  const firstItemIndex = currentItemsList.length - 1;

  const lastItemIndex
    = (firstItemIndex + +previousPageValue) < array.length
      ? (firstItemIndex + +previousPageValue)
      : array.length;

  const arrayToAdd = array.filter((_product, index) => (
    index >= firstItemIndex + 1 && index <= lastItemIndex
  ));

  setCurrentArray(prevArray => [...prevArray, ...arrayToAdd]);
};

export const getSuggestProducts = async (
  screen: string,
  capacity: string,
  itemId: string,
) => {
  try {
    const products = await getProducts();

    const suggestProducts = products.filter((product: CatalogProduct) => {
      if (product.itemId !== itemId
        && (product.screen === screen || product.capacity === capacity)) {
        return product;
      }

      return null;
    });

    return suggestProducts;
  } catch (error) {
    return [];
  }
};

export const getLinkToProduct = (
  category: string,
  nameId: string,
  capacity: string,
  color: string,
) => {
  return `/${category}/${nameId}-${capacity.toLowerCase()}-${color}`;
};

export const getMemoryCapacity = (capacity: string) => {
  const number = parseFloat(capacity);

  return `${number}${capacity.replace(`${number}`, '')}`;
};

export const getCurrentFavorites = (
  query: string,
  products: FavoriteItem[],
) => {
  const newArray = products
    .filter((product: FavoriteItem) => product.name.toLowerCase()
      === query.toLowerCase());

  return newArray;
};
