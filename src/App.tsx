import './App.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Outlet, useLocation } from 'react-router-dom';
import { init } from './features/ProductSlice';
import { setStatusPagin, setCurrentPage } from './features/PaginationSlice';
import { useAppDispatch } from './app/hooks';
import { setStatus } from './features/FilterSlice';
import { PaginationStatus } from './types/pagination';
import { FilteredStatus } from './types/filters';
export const App = () => {
  const [searchParams] = useSearchParams();

  const dispach = useAppDispatch();

  useEffect(() => {
    const sortParam = searchParams.get('sort')
    const sort: FilteredStatus = ['age' , 'name' , 'price'].includes(sortParam as FilteredStatus) ?
      sortParam as FilteredStatus : 'name';

    const paginationParam = (searchParams.get('perPage')) as PaginationStatus;
    const pagination: PaginationStatus = ['4', '8', '16', 'all'].includes(paginationParam as PaginationStatus) ?
      paginationParam as PaginationStatus : 'all';



    dispach(setStatus(sort));
    dispach(setStatusPagin(pagination));
    
    dispach(init());
  }, [dispach, searchParams]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
