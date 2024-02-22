/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header/Header';
import { useAppDispatch } from '../../app/hooks';
import * as productsActions from '../../slices/productsSlice';
import './Root.scss';

export const Root = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productsActions.fetchAll());
  }, [dispatch]);

  return (
    <div className="app">
      <Header classNames="app__header" />

      <main className="main">
        <div className="main__container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
