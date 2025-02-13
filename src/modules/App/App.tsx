import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';

import styles from './App.module.scss';

export const App = () => {
  const { pathname } = useLocation();

  return (
    <div className={classNames(styles.app)}>
      <Header className={styles.app__header} />
      <Menu />

      <div
        className={classNames(styles.app__body, {
          [styles['app__body--home']]: pathname === '/',
          [styles['app__body--shopping-bag']]: pathname === '/shopping-bag',
        })}
      >
        <div className={styles.app__content}>
          {!['/', '/404', '/shopping-bag'].includes(pathname) && (
            <Breadcrumbs pathname={pathname} />
          )}

          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};
