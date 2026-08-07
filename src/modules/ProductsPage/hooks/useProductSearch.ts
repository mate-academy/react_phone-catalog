import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from 'src/types/Product';

const SEARCH_DEBOUNCE_DELAY = 1000;

export const useProductSearch = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(appliedQuery);

  const updateUrlQuery = useMemo(
    () =>
      debounce((value: string) => {
        setSearchParams(prev => {
          const params = new URLSearchParams(prev);

          if (value.trim()) {
            params.set('query', value);
          } else {
            params.delete('query');
          }

          return params;
        });
      }, SEARCH_DEBOUNCE_DELAY),
    [setSearchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    updateUrlQuery(event.target.value);
  };

  const handleClear = () => {
    updateUrlQuery.cancel();
    setQuery('');

    const params = new URLSearchParams(searchParams);

    params.delete('query');
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = appliedQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery),
    );
  }, [products, appliedQuery]);

  const hasNoResults =
    appliedQuery.trim() !== '' && filteredProducts.length === 0;

  return {
    query,
    filteredProducts,
    handleQueryChange,
    handleClear,
    hasNoResults,
  };
};
