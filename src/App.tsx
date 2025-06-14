import './App.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Outlet, useLocation } from 'react-router-dom';
import { init } from './features/ProductSlice';
import { setStatusPagin, setCurrentPage } from './features/PaginationSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setStatus } from './features/FilterSlice';
import { PaginationStatus } from './types/pagination';
import { FilteredStatus } from './types/filters';
export const App = () => {
  const [searchParams] = useSearchParams();
  const totalPage = useAppSelector(state => state.pagination.totalPage);
  const dispach = useAppDispatch();
  const isLoaded = useAppSelector(state => state.products.isLoaded);

  useEffect(() => {
    const sortParam = searchParams.get('sort');
    const sort: FilteredStatus = ['age', 'name', 'price'].includes(
      sortParam as FilteredStatus,
    )
      ? (sortParam as FilteredStatus)
      : 'name';

    const paginationParam = searchParams.get('perPage') as PaginationStatus;
    const pagination: PaginationStatus = ['4', '8', '16', 'all'].includes(
      paginationParam as PaginationStatus,
    )
      ? (paginationParam as PaginationStatus)
      : 'all';

    dispach(setStatus(sort));
    dispach(setStatusPagin(pagination));
    if (!isLoaded) {
      dispach(init());
    }
  }, [dispach, searchParams, isLoaded]);

  useEffect(() => {
    const pageParam = searchParams.get('page') ?? 1;
    const page = Number(pageParam);

    if (totalPage !== null) {
      const validatedPage = page > totalPage ? totalPage : page;

      dispach(setCurrentPage(validatedPage));
    }
  }, [searchParams, totalPage, dispach]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
