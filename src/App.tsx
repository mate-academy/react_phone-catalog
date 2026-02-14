import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Menu } from './components/Menu';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from './store/hooks';
import * as productsActions from './store/products/productsSlice';
import { useMenu } from './hooks/useMenu';
import { useOverflowHidden } from './hooks/useOverflowHidden';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useMenu();
  const { isDark: isThemeDark } = useAppSelector(state => state.theme);

  useOverflowHidden(isOpen);

  useEffect(() => {
    dispatch(productsActions.init());
  }, [dispatch]);

  useEffect(() => {
    if (isThemeDark) {
      document.documentElement.classList.add('page--dark');
    } else {
      document.documentElement.classList.remove('page--dark');
    }
  }, [isThemeDark]);

  return (
    <div className={'app'}>
      <div className="app__header">
        <Header />
      </div>

      <div
        className={cn('app__menu', {
          ['app__menu--active']: isOpen,
        })}
      >
        <Menu />
      </div>

      <div className="app__content">
        <Outlet />
      </div>

      <div className="app__footer">
        <Footer />
      </div>
    </div>
  );
};
