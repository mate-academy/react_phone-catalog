import { useContext, useState } from 'react';
import { Header } from './shared/components/Header/Header';
import { SideMenu } from './shared/components/SideMenu/SideMenu';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './shared/components/Footer/Footer';
import { Loader } from './shared/components/Loader/Loader';
import { ProductContext } from './shared/store/GlobalProvider';

export const App = () => {
  const [isOpenSide, setIsOpenSide] = useState(false);
  const { isLoading } = useContext(ProductContext);
  const { pathname } = useLocation();

  return (
    <div className="App">
      <>
        <Header isOpenSide={isOpenSide} setIsOpenSide={setIsOpenSide} />
        <SideMenu isOpenSide={isOpenSide} setIsOpenSide={setIsOpenSide} />
        {isLoading ? <Loader /> : <Outlet key={pathname} />}
        <Footer />
      </>
    </div>
  );
};
