import { useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';

import { Theme } from '@sTypes/Theme';
import { menuActions } from '@features/menuSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { useLoweredLocation } from '@hooks/useLoweredLocation';
import { useScrollRestoration } from '@hooks/useScrollRestoration';

import styles from './App.module.scss';

function updateTheme(theme: Theme) {
  const page = document.querySelector('.page');

  if (theme === Theme.dark) {
    page?.classList.add('page--dark');
  } else {
    page?.classList.remove('page--dark');
  }
}

export const App = () => {
  useScrollRestoration();

  const dispatch = useAppDispatch();
  const { pathname } = useLoweredLocation();

  const theme = useAppSelector(state => state.theme);

  useLayoutEffect(() => {
    updateTheme(theme);
  }, [theme]);

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
          [styles['app__body--cart']]: pathname === '/cart',
          [styles['app__body--shopping-bag']]: pathname === '/shopping-bag',
        })}
      >
        <div className={styles.app__content}>
          {!['/', '/404', '/cart'].includes(pathname) && (
            <Breadcrumbs pathname={pathname} />
          )}

          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};
