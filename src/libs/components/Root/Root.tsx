/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getFromLocalSotrage } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICartItem, IProduct } from '../../types';
import * as cartActions from '../../slices/cartSlice';
import * as favouritesActions from '../../slices/favouritesSlice';
import * as productsActions from '../../slices/productsSlice';

import { Footer } from '../Footer';
import { Header } from '../Header/Header';

import './Root.scss';

export const Root = () => {
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector(state => state.products);

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

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(productsActions.fetchAll());
    }
  }, [dispatch, allProducts]);

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
