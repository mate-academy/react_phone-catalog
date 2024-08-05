import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';

import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { ChangeColor } from './Components/ChangeColor/ChangeColor';
import classNames from 'classnames';

export const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const menuBurger = pathname === '/menu';

  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>

      <div>
        <ChangeColor />
      </div>

      <main
        className={classNames('main', {
          'main--with-burger': menuBurger,
        })}
      >
        <Outlet />
      </main>

      {!menuBurger && (
        <footer className="footer footer__container">
          <Footer />
        </footer>
      )}
    </div>
  );
};
