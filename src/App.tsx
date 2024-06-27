import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { ProductContext } from './store/ProductContext';
import { Footer } from './components/Footer';
import { useContext } from 'react';
import classNames from 'classnames';

export const App = () => {
  const { darkTheme } = useContext(ProductContext);
  const { pathname } = useLocation();
  const displayFooter = !pathname.includes('menu');

  return (
    <>
      <Header />
      <main className={classNames('body', { darkTheme: darkTheme })}>
        <Outlet />
      </main>
      {displayFooter && (
        <footer className="footer">
          <Footer />
        </footer>
      )}
    </>
  );
};
