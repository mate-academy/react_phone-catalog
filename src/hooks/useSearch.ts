import { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';

export function useSearch<T, K extends keyof T>(items: T[], prop: K): T[] {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const queryString = query.toLowerCase().trim();

  const filterItems = () => {
    const filtered = [...items].filter(item => {
      const valueOfRequiredProp = item[prop];

      if (typeof valueOfRequiredProp === 'string') {
        const minifiedString = valueOfRequiredProp.toLowerCase().trim();

        return minifiedString.includes(`${queryString}`);
      }

      return false;
    });

    return filtered;
  };

  const applyFilter = useCallback(debounce(setFilteredItems, 300), []);

  useEffect(() => {
    const filtered = filterItems();

    applyFilter(filtered);

    return () => {
      applyFilter.cancel();
    };
  }, [searchParams, items]);

  return filteredItems;
}
