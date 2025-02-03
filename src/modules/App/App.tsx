import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './App.module.scss';

import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TopNavigation } from './components/TopNavigation';

export const App = () => {
  const { pathname } = useLocation();

  return (
    <div className={classNames(styles.app)}>
      <div className={styles.app__header}>
        <Header />
      </div>

      <Menu />

      <div
        className={classNames(styles.app__body, {
          [styles['app__body--home']]: pathname === '/',
        })}
      >
        <div className={styles.app__content}>
          {pathname !== '/' && <TopNavigation pathname={pathname} />}

          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};
