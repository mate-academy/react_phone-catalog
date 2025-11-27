/* eslint-disable @typescript-eslint/indent */
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SelectOption } from '../../types/SelectOptions';
import {
  DEFAULT_ITEMS_ON_PAGE,
  DEFAULT_SORT,
  PRODUCT_LIST_MENU,
} from './ProductPage.constants';
import { ProductPageSearchParams } from './ProductPage.types';
import { useEffect, useMemo, useState } from 'react';
import { ProductCatalogItem } from '../../types/ProductCatalogItem';
import { getSortedProducts, ProductSortTypes } from '../../utils/catalog';

const PRODUCT_MENU_KEY = 'productMenuKey';

type MenuParams =
  | ProductPageSearchParams.sort
  | ProductPageSearchParams.perPage;

const menuParams: MenuParams[] = [
  ProductPageSearchParams.sort,
  ProductPageSearchParams.perPage,
];

const defaultMenuValues: Record<MenuParams, string> = {
  [ProductPageSearchParams.sort]: DEFAULT_SORT,
  [ProductPageSearchParams.perPage]: DEFAULT_ITEMS_ON_PAGE,
};

function checkSearchParam(
  params: string[],
  param: string,
  defaultParam: string,
) {
  if (params.includes(param)) {
    return param;
  }

  return defaultParam;
}

function useMenuParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  if (searchParams.toString() === '') {
    const saveMenuParams = localStorage.getItem(PRODUCT_MENU_KEY) || '';
    const loadParams = new URLSearchParams(saveMenuParams);

    setSearchParams(loadParams);
  }

  const sortParam = checkSearchParam(
    PRODUCT_LIST_MENU.sortBy,
    searchParams.get(ProductPageSearchParams.sort) || '',
    DEFAULT_SORT,
  );

  const itemsOnPageParam = checkSearchParam(
    PRODUCT_LIST_MENU.itemsOnPage,
    searchParams.get(ProductPageSearchParams.perPage) || '',
    DEFAULT_ITEMS_ON_PAGE,
  );

  const setMenuParams = (paramName: MenuParams, paramValue: string) => {
    setSearchParams(prevSearchParams => {
      if (defaultMenuValues[paramName] === paramValue) {
        prevSearchParams.delete(paramName);
      } else {
        prevSearchParams.set(paramName, paramValue);
        prevSearchParams.sort();
      }

      localStorage.setItem(
        PRODUCT_MENU_KEY,
        menuParams
          .filter(curParamName => prevSearchParams.get(curParamName))
          .map(
            curParamName =>
              `${curParamName}=${prevSearchParams.get(curParamName) || ''}`,
          )
          .reduce((searchString, paramPair) => `${searchString}&${paramPair}`),
      );

      return prevSearchParams;
    });
  };

  return { sortParam, itemsOnPageParam, setMenuParams };
}

export function useMenuSelectors() {
  const { t } = useTranslation();
  const { sortParam, itemsOnPageParam, setMenuParams } = useMenuParams();

  const itemsOnPageOptions: SelectOption[] = useMemo(
    () =>
      PRODUCT_LIST_MENU.itemsOnPage.map(value => ({
        value,
        label: Number.isInteger(Number(value))
          ? value
          : t(`products_page.menu_items_values.${value}`),
      })),
    [t],
  );

  const sortByOptions: SelectOption[] = useMemo(
    () =>
      PRODUCT_LIST_MENU.sortBy.map(value => ({
        value,
        label: t(`products_page.menu_sort_values.${value}`),
      })),
    [t],
  );

  const sortValue = sortByOptions.find(
    sortOption => sortOption.value === sortParam,
  ) as SelectOption;

  const itemsOnPageValue = itemsOnPageOptions.find(
    item => item.value === itemsOnPageParam,
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
    sortValue,
    itemsOnPageValue,
    itemsOnPageOptions,
    sortByOptions,
    handleSortChange,
    handleItemsOnPageChange,
  };
}

export function useSelectedProduct(
  products: ProductCatalogItem[],
  title: string,
  sortValue: SelectOption,
  itemsOnPageValue: SelectOption,
  currentPage: number,
) {
  const [pageCategoryProducts, setPageCategoryProducts] = useState<
    ProductCatalogItem[]
  >([]);

  const [sortedProduct, setSortedProduct] = useState<ProductCatalogItem[]>([]);
  const [pageProducts, setPageProducts] = useState<ProductCatalogItem[]>([]);

  useEffect(() => {
    setPageCategoryProducts(
      products.filter(product => product.category === (title || '')),
    );
  }, [products, title]);

  useEffect(() => {
    setSortedProduct(
      getSortedProducts(
        pageCategoryProducts,
        sortValue.value as ProductSortTypes,
      ),
    );
  }, [pageCategoryProducts, sortValue.value]);

  useEffect(() => {
    const currentPageProducts = +itemsOnPageValue.value
      ? sortedProduct.slice(
          (currentPage - 1) * +itemsOnPageValue.value,
          Math.min(currentPage * +itemsOnPageValue.value, sortedProduct.length),
        )
      : [...sortedProduct];

    setPageProducts(currentPageProducts);
  }, [sortedProduct, itemsOnPageValue.value, currentPage]);

  return { pageProducts, total: sortedProduct.length };
}
