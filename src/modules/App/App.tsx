import { useEffect } from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';

import { useAppDispatch } from '@store/hooks';
import { menuActions } from '@features/menuSlice';
import { useLoweredLocation } from '@hooks/useLoweredLocation';
import { useScrollRestoration } from '@hooks/useScrollRestoration';

import styles from './App.module.scss';

export const App = () => {
  useScrollRestoration();

  const dispatch = useAppDispatch();
  const { pathname } = useLoweredLocation();

  useEffect(() => {
    dispatch(menuActions.set(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(menuActions.set(false));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

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
