import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SelectOption } from '../../types/SelectOptions';
import {
  DEFAULT_ITEMS_ON_PAGE,
  DEFAULT_SORT,
  PRODUCT_LIST_MENU,
} from './ProductPage.constants';
import { ProductPageSearchParams } from './ProductPage.types';
import { useMemo } from 'react';

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

export function useMenuSelectors() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

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

    setSearchParams(prevSearchParams => {
      if (option.value === DEFAULT_SORT) {
        prevSearchParams.delete(ProductPageSearchParams.sort);
      } else {
        prevSearchParams.set(ProductPageSearchParams.sort, option.value);
        prevSearchParams.sort();
      }

      return prevSearchParams;
    });
  };

  const handleItemsOnPageChange = (option: SelectOption | null) => {
    if (!option) {
      return;
    }

    setSearchParams(prevSearchParams => {
      if (option.value === DEFAULT_ITEMS_ON_PAGE) {
        prevSearchParams.delete(ProductPageSearchParams.perPage);
      } else {
        prevSearchParams.set(ProductPageSearchParams.perPage, option.value);
        prevSearchParams.sort();
      }

      return prevSearchParams;
    });
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
