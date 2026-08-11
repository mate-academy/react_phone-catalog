import React, { createContext, useContext, useState, useMemo } from 'react';
import { SortValue } from 'models/sortvalue.model';

type FilterContextType = {
  sort: SortValue;
  perPage: string;
  page: number;
  setSort: (value: SortValue) => void;
  setPerPage: (value: string) => void;
  setPage: (value: number) => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sort, setSort] = useState<SortValue>('newest');
  const [perPage, setPerPage] = useState<string>('16');
  const [page, setPage] = useState<number>(1);

  const value = useMemo(
    () => ({
      sort,
      perPage,
      page,
      setSort,
      setPerPage,
      setPage,
    }),
    [sort, perPage, page],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilter must be used within FilterProvider');
  }

  return context;
};
