import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import debounce from '../../common/helpers/debounce';
import { getFavorites, getProducts } from '../../redux';
import { SORT } from '../../common/enums.d';
import { LOCATIONS } from '../../common/constants';
import { useRouter } from './useRouter';

export const useSearch = () => {
  const { location, history, search } = useRouter();
  const inputEl = useRef<HTMLInputElement>(null);
  const query = useMemo(() => search.get('query') || '', [search]);
  const sortBy = search.get('sortBy');
  const [inputValue, setInputValue] = useState(query);
  const products: Product[] = useSelector(getProducts);
  const favorites: Product[] = useSelector(getFavorites);

  useEffect(() => {
    return () => setInputValue('');
  }, [location.pathname]);

  const historyPushWithDebounce = useCallback(
    debounce((value: string) => {
      search.set('query', value.toLowerCase());

      if (!(search.get('query') || '')) {
        search.delete('query');
      }

      history.push({ search: search.toString() });
    }, 500), [],
  );

  const searchProducts = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setInputValue(value);
      historyPushWithDebounce(value);
    }, [historyPushWithDebounce],
  );

  const searchedProducts: Product[] = useMemo(() => {
    if (location.pathname === LOCATIONS.favorites) {
      return favorites.filter(({ name }) => (
        name.toLowerCase().includes(query)
      ));
    }

    return products.filter(({ name }) => (
      name.toLowerCase().includes(query)
    ))
      .slice()
      .sort((a, b) => {
        switch (sortBy) {
          case SORT.NEWEST:
            return a.age - b.age;
          case SORT.FROM_A_TO_Z:
            return a.name.localeCompare(b.name);
          case SORT.FROM_Z_TO_A:
            return b.name.localeCompare(a.name);
          case SORT.CHEAPEST:
            return a.price - b.price;
          default:
            return 0;
        }
      });
  }, [products, query, sortBy, favorites, location.pathname]);

  const searchReset = useCallback(() => {
    setInputValue('');

    if (!(search.get('query') || '')) {
      search.delete('query');
    }

    history.push({ search: '' });
  }, [search, history]);

  const handleResetAndFocus = useCallback(() => {
    searchReset();

    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }, [searchReset]);

  const onKeyDown = useCallback(
    ({ key }: React.KeyboardEvent) => {
      if (key === 'Escape') {
        handleResetAndFocus();
      }
    }, [handleResetAndFocus],
  );

  return {
    inputValue,
    searchProducts,
    searchedProducts,
    searchReset,
    products,
    onKeyDown,
    inputEl,
    handleResetAndFocus,
  };
};
