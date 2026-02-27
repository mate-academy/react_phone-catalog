/* eslint-disable @typescript-eslint/indent */
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { SelectOption } from '../../types/SelectOptions';
import { ProductPageSearchParams } from './ProductPage.types';
import { ProductCatalogItem } from '../../types/ProductCatalogItem';

import {
  DEFAULT_ITEMS_ON_PAGE,
  DEFAULT_SORT,
  PRODUCT_LIST_MENU,
  PRODUCT_MENU_KEY,
} from './ProductPage.constants';
import { getSortedProducts, ProductSortTypes } from '../../utils/catalog';
import { DEBOUNCED_DELAY } from '../constants';

type MenuParamKey =
  | ProductPageSearchParams.sort
  | ProductPageSearchParams.perPage;

const MENU_PARAM_KEYS: MenuParamKey[] = [
  ProductPageSearchParams.sort,
  ProductPageSearchParams.perPage,
];

const DEFAULT_MENU_VALUES: Record<MenuParamKey, string> = {
  [ProductPageSearchParams.sort]: DEFAULT_SORT,
  [ProductPageSearchParams.perPage]: DEFAULT_ITEMS_ON_PAGE,
};

function getValidParam(
  allowedValues: string[],
  currentValue: string,
  defaultParam: string,
) {
  return allowedValues.includes(currentValue) ? currentValue : defaultParam;
}

function useMenuParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const storedParamsString = localStorage.getItem(PRODUCT_MENU_KEY) || '';
  const isEmptyParams = searchParams.toString() === '';

  const loadedParams = isEmptyParams
    ? new URLSearchParams(storedParamsString)
    : searchParams;

  const sortParam = getValidParam(
    PRODUCT_LIST_MENU.sortBy,
    loadedParams.get(ProductPageSearchParams.sort) || '',
    DEFAULT_SORT,
  );

  const perPageParam = getValidParam(
    PRODUCT_LIST_MENU.perPage,
    loadedParams.get(ProductPageSearchParams.perPage) || '',
    DEFAULT_ITEMS_ON_PAGE,
  );

  useEffect(() => {
    if (isEmptyParams && storedParamsString) {
      if (localStorage.getItem(PRODUCT_MENU_KEY)) {
        setSearchParams(storedParamsString, { replace: true });
      }
    }
  }, [isEmptyParams, storedParamsString, searchParams, setSearchParams]);

  const updateMenuParam = (key: MenuParamKey, value: string) => {
    setSearchParams(prevParams => {
      if (DEFAULT_MENU_VALUES[key] === value) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
        prevParams.sort();
      }

      const serializedParams = MENU_PARAM_KEYS.filter(paramKey =>
        prevParams.get(paramKey),
      )
        .map(paramKey => `${paramKey}=${prevParams.get(paramKey) || ''}`)
        .join('&');

      localStorage.setItem(PRODUCT_MENU_KEY, serializedParams);

      return prevParams;
    });
  };

  return {
    sortParam,
    itemsOnPageParam: perPageParam,
    updateMenuParam,
  };
}

export function useMenuSelectors(): {
  selectedSort: SelectOption;
  selectedPerPage: SelectOption;
  perPageOptions: SelectOption[];
  sortOptions: SelectOption[];
  handleSortChange: (option: SelectOption | null) => void;
  handleItemsOnPageChange: (option: SelectOption | null) => void;
} {
  const { t } = useTranslation();
  const {
    sortParam,
    itemsOnPageParam: perPageParam,
    updateMenuParam: setMenuParams,
  } = useMenuParams();

  const perPageOptions: SelectOption[] = useMemo(
    () =>
      PRODUCT_LIST_MENU.perPage.map(value => ({
        value,
        label: Number.isInteger(Number(value))
          ? value
          : t(`products_page.menu_items_values.${value}`),
      })),
    [t],
  );

  const sortOptions: SelectOption[] = useMemo(
    () =>
      PRODUCT_LIST_MENU.sortBy.map(value => ({
        value,
        label: t(`products_page.menu_sort_values.${value}`),
      })),
    [t],
  );

  const selectedSort: SelectOption = sortOptions.find(
    sortOption => sortOption.value === sortParam,
  )!;

  const selectedPerPage = perPageOptions.find(
    item => item.value === perPageParam,
  ) as SelectOption;

  const handleSortChange = (option: SelectOption | null) => {
    if (!option) {
      return;
    }

    setMenuParams(ProductPageSearchParams.sort, option.value);
  };

  const handleItemsOnPageChange = (option: SelectOption | null) => {
    if (!option) {
      return;
    }

    setMenuParams(ProductPageSearchParams.perPage, option.value);
  };

  return {
    selectedSort,
    selectedPerPage,
    perPageOptions,
    sortOptions,
    handleSortChange,
    handleItemsOnPageChange,
  };
}

interface UseSelectedProductOptions {
  products: ProductCatalogItem[];
  title: string;
  selectedSort: SelectOption;
  selectedPerPage: SelectOption;
  currentPage: number;
  searchQuery: string;
}

export function useSelectedProduct({
  products,
  title,
  selectedSort,
  selectedPerPage,
  currentPage,
  searchQuery,
}: UseSelectedProductOptions): {
  pageProducts: ProductCatalogItem[];
  total: number;
} {
  const [filteredProducts, setFilteredProduct] = useState<ProductCatalogItem[]>(
    [],
  );

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const [sortedProducts, setSortedProduct] = useState<ProductCatalogItem[]>([]);
  const [paginatedProducts, setPaginatedProduct] = useState<
    ProductCatalogItem[]
  >([]);

  useEffect(() => {
    const timerId = setTimeout(
      () => setDebouncedQuery(searchQuery),
      DEBOUNCED_DELAY,
    );

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  useEffect(() => {
    setFilteredProduct(
      products.filter(
        product =>
          product.category === (title || '') &&
          product.name.includes(debouncedQuery),
      ),
    );
  }, [products, title, debouncedQuery]);

  useEffect(() => {
    setSortedProduct(
      getSortedProducts(
        filteredProducts,
        selectedSort.value as ProductSortTypes,
      ),
    );
  }, [filteredProducts, selectedSort.value]);

  useEffect(() => {
    const perPage = Number(selectedPerPage.value);
    const startIndex = (currentPage - 1) * +selectedPerPage.value;
    const endIndex = Math.min(
      currentPage * +selectedPerPage.value,
      sortedProducts.length,
    );

    const currentPageProducts = perPage
      ? sortedProducts.slice(startIndex, endIndex)
      : [...sortedProducts];

    setPaginatedProduct(currentPageProducts);
  }, [sortedProducts, selectedPerPage.value, currentPage]);

  return { pageProducts: paginatedProducts, total: sortedProducts.length };
}
