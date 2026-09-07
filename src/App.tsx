import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from './shared/components/Footer';
import { Header } from './shared/components/Header';
import { Loader } from './shared/components/Loader';
import { SideMenu } from './shared/components/SideMenu';
import { Error } from './shared/components/Error';

import { loadProducts } from './store/initialDataSlice/initialDataSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

export const App = () => {
  const { isLoading, error } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [isOpenSide, setIsOpenSide] = useState(false);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Header isOpenSide={isOpenSide} setIsOpenSide={setIsOpenSide} />
      <SideMenu isOpenSide={isOpenSide} setIsOpenSide={setIsOpenSide} />
      {isLoading ? <Loader /> : <Outlet key={pathname} />}
      <Footer />
    </>
  );
};
