import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  SortOption,
  SORT_KEYS,
  SortKey,
  getSortKeyFromOption,
} from '../types/DropDownSortOptions';
import {
  ITEMS_PER_PAGE_OPTIONS,
  ItemsPerPageOptions,
} from '../types/DropDownItemsPerPage';

// Names of URL parameters we're working with
type ParamName = 'sort' | 'perPage' | 'page';

// Possible types for our parameter values
export type ParamValue = number | ItemsPerPageOptions | SortKey | SortOption;

// Check if a value is valid for a given parameter
const isValidParamValue = (param: ParamName, value: ParamValue): boolean => {
  switch (param) {
    case 'sort':
      return SORT_KEYS.includes(value as SortKey);
    case 'perPage':
      return ITEMS_PER_PAGE_OPTIONS.includes(
        value === 'All' ? value : (Number(value) as ItemsPerPageOptions),
      );
    case 'page':
      return !isNaN(+value) && Number.isInteger(+value) && +value > 0;
    default:
      return false;
  }
};

/**
 * A hook to easily work with URL parameters.
 *
 * @param paramName - Which URL parameter to use
 * @param defaultValue - What to use if the parameter isn't in the URL
 * @returns Current value and a function to update it
 */
export const useSearchParamValue = (
  paramName: ParamName,
  defaultValue: ParamValue,
): [ParamValue, (newValue: ParamValue) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue = searchParams.get(paramName) as ParamValue;

  // Figure out the current value
  const value: ParamValue = useMemo(() => {
    if (paramValue !== null && isValidParamValue(paramName, paramValue)) {
      if (paramName === 'page' || paramName === 'perPage') {
        return (
          paramValue === 'All' ? paramValue : Number(paramValue)
        ) as ParamValue;
      }
      if (paramName === 'sort') {
        return paramValue as SortKey;
      }
    }
    return defaultValue;
  }, [paramName, paramValue, defaultValue]);

  // Function to update the value
  const setValue = useCallback(
    (newValue: ParamValue) => {
      let stringValue: string;

      if (paramName === 'sort' && typeof newValue === 'string') {
        // Converting SortOption to SortKey if necessary
        const sortKey = getSortKeyFromOption(newValue as SortOption);
        stringValue = sortKey || String(newValue);
      } else {
        stringValue = String(newValue);
      }

      if (isValidParamValue(paramName, newValue)) {
        const newSearchParams = new URLSearchParams(searchParams);

        // setting the page to 1 after changing perPage to avoid errors
        if (paramName === 'perPage') {
          newSearchParams.set('page', '1');
        }

        newSearchParams.set(paramName, stringValue);
        setSearchParams(newSearchParams);
      } else {
        console.error(`Oops! Invalid value for ${paramName}: ${newValue}`);
      }
    },
    [paramName, searchParams, setSearchParams],
  );

  return [value, setValue];
};
