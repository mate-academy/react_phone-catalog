import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { ProductContext } from './store/ProductContext';
import { Footer } from './components/Footer';
import { useContext } from 'react';
import classNames from 'classnames';
import { Menu } from './pages/Menu';
import { MenuContext } from './store/MenuContext';

export const App = () => {
  const { darkTheme } = useContext(ProductContext);
  const { displayMenu } = useContext(MenuContext);

  return (
    <>
      <Header />
      <Menu />
      <main className={classNames('body', { darkTheme: darkTheme })}>
        <section className="body__container">
          <Outlet />
        </section>
      </main>
      {!displayMenu && (
        <footer className="footer">
          <Footer />
        </footer>
      )}
    </>
  );
};
