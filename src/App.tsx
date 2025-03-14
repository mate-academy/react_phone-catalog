import { Outlet, useSearchParams } from 'react-router-dom';
import './App.scss';
import { Header } from './features/Header';
import { Footer } from './features/Footer';
import classNames from 'classnames';

export const App = () => {
  const [searchParams] = useSearchParams();
  const isMenuOpen = searchParams.get('menu');

  return (
    <div className={classNames('App', { 'App__menu-open': isMenuOpen })}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
