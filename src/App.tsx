import './App.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { BurgerMenu } from './components/BurgerMenu';

export const App = () => {
  const [searchParams] = useSearchParams();
  const menuStatus = searchParams.get('menu') || '';

  return (
    <>
      <Header />
      {menuStatus && <BurgerMenu />}
      {!menuStatus && <Outlet />}

      {!menuStatus && <Footer />}
    </>
  );
};
