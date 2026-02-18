import { FC, ReactNode, useEffect, useMemo } from 'react';
import { PaginationContext } from '../contexts/PaginationContext';
import { useSearchParams } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

export const PaginationProvider: FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');

  const currentPage: number = Number(pageParam) || 1;
  const perPage: number = Number(perPageParam) || Infinity;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage, perPage]);

  const value = useMemo(
    () => ({
      currentPage,
      perPage,
    }),
    [currentPage, perPage],
  );

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
