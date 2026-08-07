// #regionImport
import 'react-loading-skeleton/dist/skeleton.css';
import './i18n';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './styles/globals.scss';
import './styles/App.scss';

import { Header } from '@shared/components/Header/Header';
import { MobileMenu } from '@shared/components/MobileMenu';
import { Main } from '@shared/components/Main/Main';
import { Footer } from '@shared/components/Footer';
import { RouteScrollReset } from '@shared/components/RouteScrollReset';
import { useMobileMenu } from '@hooks/useMobileMenu';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts } from './features/products';
// #endregion

export const App = () => {
  const { isMenuOpen, setIsMenuOpen } = useMobileMenu();
  const dispatch = useAppDispatch();

  const theme = useAppSelector(state => state.theme);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <MobileMenu isOpen={isMenuOpen} />

      <Main>
        <RouteScrollReset />
        <Outlet />
      </Main>

      <Footer />
    </div>
  );
};
