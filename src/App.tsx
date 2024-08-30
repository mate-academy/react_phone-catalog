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
      id="top"
    >
      <header
        className={classNames(styles.header, {
          [styles['header-dark']]: !isSunSelected,
        })}
      >
        <Header />
      </header>
      <main className="main">
        <div className="main__continer noPadding">
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
