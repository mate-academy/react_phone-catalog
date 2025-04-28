import { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from './shared/components/Footer';
import { Header } from './shared/components/Header';
import { Loader } from './shared/components/Loader';
import { ProductContext } from './shared/store/GlobalProvider';

export const App = () => {
  const { isLoading } = useContext(ProductContext);
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      {isLoading ? <Loader /> : <Outlet key={pathname} />}
      <Footer />
    </>
  );
};
