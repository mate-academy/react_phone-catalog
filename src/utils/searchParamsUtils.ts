import { DEFAULT_PER_PAGE, DEFAULT_SORT } from '../constants/constJS';

const defaults: Record<string, string> = {
  sort: DEFAULT_SORT,
  perPage: DEFAULT_PER_PAGE.toString(),
  page: '1',
};

export const updateSearchParamsWithDefaults = (
  updates: Record<string, string>,
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
) => {
  const updatedParams = new URLSearchParams(searchParams);
  let hasChanged = false;

  Object.entries(updates).forEach(([key, value]) => {
    if (defaults[key] !== undefined && value === defaults[key]) {
      if (updatedParams.has(key)) {
        updatedParams.delete(key);
        hasChanged = true;
      }
    } else {
      if (updatedParams.get(key) !== value) {
        updatedParams.set(key, value);
        hasChanged = true;
      }
    }
  });

  if (Object.keys(updates).length === 0) {
    Object.entries(defaults).forEach(([key, defaultValue]) => {
      if (updatedParams.get(key) === defaultValue) {
        updatedParams.delete(key);
        hasChanged = true;
      }
    });
  }

  if (hasChanged) {
    setSearchParams(updatedParams);
  }
};

export const parsePerPage = (
  value: string | null,
  totalLength: number,
): number => {
  if (!value || value === 'All') {
    return totalLength;
  }

  const parsed = parseInt(value, 10);

  return isNaN(parsed) ? totalLength : parsed;
};
