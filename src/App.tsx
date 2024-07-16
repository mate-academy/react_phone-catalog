import { Outlet } from 'react-router-dom';
import './App.scss';
import styles from './components/shared/Header/Header.module.scss';
import './styles/global.scss';
import { Header } from './components/shared/Header';
import { Footer } from './components/shared/Footer';
import { GlobalContext } from './components/shared/GlobalContext/GlobalContext';
import { useContext } from 'react';
import classNames from 'classnames';

export const App = () => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <div
      className={classNames('App', {
        'is-bg-dark': !isSunSelected,
      })}
    >
      <header className={styles.header} id="header">
        <Header />
      </header>
      <main className="main">
        <div className="main__continer">
          <Outlet />
        </div>
      </main>
      <footer
        className={classNames('footer', {
          'is-footer-dark': !isSunSelected,
        })}
      >
        <Footer />
      </footer>
    </div>
  );
};
