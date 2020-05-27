import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getProducts } from '../../helpers/api';
import debounce from '../../helpers/debounce';

export const useSearch = () => {
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const query = search.get('query') || '';
  const sortBy = search.get('sortBy');
  const [inputValue, setInputValue] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);

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
        case 'Hot':
          return b.discount - a.discount;
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
