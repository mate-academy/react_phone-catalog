import React, { useContext, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/helpers/searchHelper';
import { FiltersContextType, SortField } from '../types/FiltersContextType';
import { ProductContext } from './ProductContext';
import { Product } from '../types/Product';
import { SelectOptions } from '../types/selectType';
import { sortBy } from '../shared/ui/Select/data/selectData';
import { adaptedProductList } from '../utils/adapters/adaptedProductList';

export const FiltersContext = React.createContext<FiltersContextType | null>(
  null,
);

type Props = {
  children: React.ReactNode;
};

export const FiltersProvider: React.FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useContext(ProductContext);
  const location = useLocation();

  const value = useMemo(() => {
    const sortParam = searchParams.get('sort');

    return sortBy.find(option => option.value === sortParam) || sortBy[0];
  }, [searchParams]);
  const sort = (searchParams.get('sort') as SortField) ?? 'newest';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const sortedProduct = useMemo(() => {
    const fieldMap: Record<Lowercase<SortField>, keyof Product> = {
      newest: 'year',
      alphabetically: 'name',
      cheapest: 'price',
    };

    const sortKey = sort?.toLowerCase() as keyof typeof fieldMap;

    if (!sort) {
      return products;
    }

    return [...products].sort((a, b) => {
      const product1 = a[fieldMap[sortKey]];
      const product2 = b[fieldMap[sortKey]];

      if (typeof product1 === 'string' && typeof product2 === 'string') {
        return product1.localeCompare(product2);
      }

      if (
        sortKey === 'cheapest' &&
        typeof product1 === 'number' &&
        typeof product2 === 'number'
      ) {
        return product1 - product2;
      }

      if (
        sortKey === 'newest' &&
        typeof product1 === 'number' &&
        typeof product2 === 'number'
      ) {
        return product2 - product1;
      }

      return 0;
    });
  }, [products, sort]);

  const getProductsByCategory = () => {
    const pathname = location.pathname.replace('/', '');

    if (!pathname) {
      return sortedProduct;
    }

    return sortedProduct.filter(product => product.category === pathname);
  };

  const currentProducts = getProductsByCategory();
  const productCard = currentProducts.map(adaptedProductList);

  const handleSelectChange = (option: SelectOptions) => {
    setSearchWith({ sort: option.value.toString() });
  };

  return (
    <FiltersContext.Provider
      value={{
        setSearchWith,
        searchParams,
        setSearchParams,
        sortedProduct,
        sort,
        getProductsByCategory,
        currentProducts,
        productCard,
        value,
        handleSelectChange,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const filter = useContext(FiltersContext) as FiltersContextType;

  return filter;
};
