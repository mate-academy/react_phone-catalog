import { useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from './shared/components/Footer';
import { Header } from './shared/components/Header';
import { Loader } from './shared/components/Loader';
import { ProductContext } from './shared/store/GlobalProvider';
import { SideMenu } from './shared/components/SideMenu';

export const App = () => {
  const { isLoading } = useContext(ProductContext);
  const { pathname } = useLocation();
  const [isOpenSide, setIsOpenSide] = useState(false);

  return (
    <>
      <Header isOpenSide={isOpenSide} setIsOpenSide={setIsOpenSide} />
      {isOpenSide ? (
        <SideMenu setIsOpenSide={setIsOpenSide} />
      ) : (
        <>
          {isLoading ? <Loader /> : <Outlet key={pathname} />}
          <Footer />
        </>
      )}
    </>
  );
};
