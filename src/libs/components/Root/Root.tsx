/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getFromLocalSotrage } from '../../utils';
import { useAppDispatch } from '../../app/hooks';
import { ICartItem, IProduct } from '../../types';
import * as cartActions from '../../slices/cartSlice';
import * as favouritesActions from '../../slices/favouritesSlice';

import { Footer } from '../Footer';
import { Header } from '../Header/Header';

import './Root.scss';

export const Root = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartItems = getFromLocalSotrage<ICartItem[]>('cartItems');
    const favouritesItems = getFromLocalSotrage<IProduct[]>('favouritesItems');

    if (cartItems) {
      dispatch(cartActions.setItems(cartItems));
    }

    if (favouritesItems) {
      dispatch(favouritesActions.setItems(favouritesItems));
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

      <Footer classNames="app__footer" />
    </div>
  );
};
