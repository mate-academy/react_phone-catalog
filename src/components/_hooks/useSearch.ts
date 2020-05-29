import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from '../../helpers/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, loadProducts } from '../../store';

export const useSearch = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const search = new URLSearchParams(location.search);
  const query = search.get('query') || '';
  const sortBy = search.get('sortBy');
  const [inputValue, setInputValue] = useState(query);
  const products: Product[] = useSelector(getProducts);

  useEffect(() => {
    dispatch(loadProducts());

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

  let searchedProducts: Product[] = useMemo(() => {
    return products.filter(({ name }) => (
      name.toLowerCase().includes(query)
    ));
  }, [products, query]);

  searchedProducts = useMemo(() => {
    return [...searchedProducts].sort((a, b) => {
      switch (sortBy) {
        case 'Newest':
          return a.age - b.age;
        case 'From-A-to-Z':
          return a.name.localeCompare(b.name);
        case 'From-Z-to-A':
          return b.name.localeCompare(a.name);
        case 'Cheapest':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [searchedProducts, sortBy]);

  const searchReset = () => {
    setInputValue('');

    if (!(search.get('query') || '')) {
      search.delete('query');
    }

    history.push({ search: '' });
  };

  return {
    inputValue,
    searchProducts,
    searchedProducts,
    location,
    history,
    search,
    searchReset,
  };
};
