import React, { FC, PropsWithChildren, createContext, useContext } from 'react';

type Pagination = {
  pageCount: number;
  currentSelectedIndex: number;
  select: (index: number) => void;
};

export const PaginationContext = createContext<Pagination | null>(null);

export const usePagination = () => {
  const pagination = useContext(PaginationContext);

  if (!pagination) {
    throw new Error('PaginationProvider was not found');
  }

  return pagination;
};

export const PaginationProviedr: FC<PropsWithChildren<Pagination>> = ({
  children,
  ...value
}) => {
  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
