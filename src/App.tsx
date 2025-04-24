import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from './shared/components/Footer';
import { Header } from './shared/components/Header';
import { useContext } from 'react';
import { ProductContext } from './shared/store/GlobalProvider';
import { Loader } from './shared/components/Loader';

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
