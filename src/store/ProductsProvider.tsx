import React, { createContext, useEffect, useState } from 'react';
import { getGadgets } from '../utils/fetchMethods';
import { Products } from '../types/ContextType/Products';
import { useLocation, useSearchParams } from 'react-router-dom';
import { filterGadgets } from '../utils/filterGadgets';
import { sortedBy } from '../utils/sortGadgets';
import { SortBy } from '../enums/SortBy';

type ContextType = {
  products: Products[];
  setProducts: (v: Products[]) => void;
  gadgets: {
    gadgetsLen: number;
    gadgets: Products[];
  };
  resultFilteredDev: Products[];
};

export const ProductsContext = createContext<ContextType>({
  products: [],
  setProducts: () => {},
  gadgets: {
    gadgetsLen: 0,
    gadgets: [],
  },
  resultFilteredDev: [],
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const gadgets = filterGadgets(pathname, products);
  const sortBy = searchParams.get('sortBy') || SortBy.newest;
  const page = searchParams.get('page') || '1';
  const itemsPerPage = searchParams.get('itemsOnPage') || '4';
  const sortedGadgets = sortedBy(sortBy, gadgets.gadgets);

  const filteredList = (
    devices: Products[],
    devicesPerPage: string = '4',
    currentPage: number,
  ) => {
    const copyDevices = [...devices];

    if (devicesPerPage === 'All') {
      return copyDevices;
    } else {
      const entIndex = +devicesPerPage * currentPage;
      const startIndex = entIndex - +devicesPerPage;
      return copyDevices.slice(startIndex, entIndex);
    }
  };

  const resultFilteredDev = filteredList(sortedGadgets, itemsPerPage, +page);

  useEffect(() => {
    getGadgets('/products.json').then(response => setProducts(response));
  }, []);

  const gadgetsTools = {
    products,
    setProducts,
    gadgets,
    resultFilteredDev,
  };

  return (
    <ProductsContext.Provider value={gadgetsTools}>
      {children}
    </ProductsContext.Provider>
  );
};
