import { useCallback, useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';
import { SingleValue } from 'react-select';

import { SelectOption } from '@shared/components/Select/Select';
import { ItemsOnPage, SortBy } from '@shared/types/common';

import { ITEMS_ON_PAGE_CONFIG, SORT_BY_CONFIG } from '../../utils/filters';

export const useProductsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSortByOption = useMemo(() => {
    const sortBy = searchParams.get('sort_by') as SortBy;
    const isValid = ['newest', 'high_to_low', 'low_to_high'].includes(
      'sort_by',
    );

    if (!sortBy || !isValid) {
      searchParams.set('sort_by', SORT_BY_CONFIG[0].value);

      return SORT_BY_CONFIG[0];
    }

    return SORT_BY_CONFIG.find(({ value }) => value === sortBy) as SelectOption;
  }, [searchParams]);

  const defaultItemsOnPageOption = useMemo(() => {
    const itemsOnPage = searchParams.get('items_on_page') as ItemsOnPage;
    const isValid = ['16', '32'].includes(itemsOnPage);

    if (!itemsOnPage || !isValid) {
      return ITEMS_ON_PAGE_CONFIG[0];
    }

    return ITEMS_ON_PAGE_CONFIG.find(
      ({ value }) => value === itemsOnPage,
    ) as SelectOption;
  }, [searchParams]);

  const onChange = useCallback(
    (option: SingleValue<SelectOption>, key: string) => {
      if (option) {
        const newParams = new URLSearchParams(searchParams);

        newParams.set(key, option.value);

        setSearchParams(newParams);
      }
    },
    [searchParams, setSearchParams],
  );

  return {
    defaultSortByOption,
    defaultItemsOnPageOption,
    onChange,
  };
};
