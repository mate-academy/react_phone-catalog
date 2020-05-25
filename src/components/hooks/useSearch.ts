import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getProducts } from '../../helpers/api';

export const useSearch = () => {
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const query = search.get('query') || '';
  const [inputValue, setInputValue] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data));
  }, []);

  const historyPush = () => {
    history.push({ search: search.toString() });
  };

  const searchProducts = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      search.set('query', value.toLowerCase());

      if (!(search.get('query') || '').trim()) {
        search.delete('query');
      }

      setInputValue(value);
      historyPush();
    }, [search, historyPush],
  );

  const searchedProducts: Product[] = useMemo(() => {
    return products.filter(({ name }) => (
      name.toLowerCase().includes(query)
    ));
  }, [products, query]);

  return {
    inputValue,
    searchProducts,
    searchedProducts,
    location,
  };
};
