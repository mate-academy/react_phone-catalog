/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getFromLocalSotrage } from '../../utils';
import { useAppDispatch } from '../../app/hooks';
import * as cartActions from '../../slices/cartSlice';

import { Footer } from '../Footer';
import { Header } from '../Header/Header';

import './Root.scss';
import { ICartItem } from '../../types';

export const Root = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const response = getFromLocalSotrage<ICartItem[]>('cartItems');

    if (response) {
      dispatch(cartActions.setItems(response));
    }
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
