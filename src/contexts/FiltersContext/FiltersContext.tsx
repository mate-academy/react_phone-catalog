/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { createContext, useMemo, useState } from 'react';

import { ProductCategory } from '../../shared/constants/productCategory';
import { FiltersContextType } from '../../shared/types/Context';
import { useProductsContext } from '../ProductsContext';

type Props = {
  children: React.ReactNode;
};

export const FiltersContext = createContext<FiltersContextType>({
  pageCategory: ProductCategory.PHONES,
  setPageCategory: () => {},
  newModels: [],
  hotModels: [],
});

export const FiltersProvider: React.FC<Props> = ({ children }) => {
  const { allProducts } = useProductsContext();
  const [pageCategory, setPageCategory] = useState<ProductCategory>(
    ProductCategory.PHONES,
  );

  const newModels = useMemo(
    () =>
      [...allProducts].sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year;
        }

        return b.price - a.price;
      }),
    [allProducts],
  );

  const hotModels = useMemo(
    () =>
      allProducts
        .filter(p => p.price < p.fullPrice)
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price)),
    [allProducts],
  );

  return (
    <FiltersContext.Provider
      value={{
        pageCategory,
        setPageCategory,
        newModels,
        hotModels,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
