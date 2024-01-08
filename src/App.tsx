import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import * as productsSlice from './features/productsSlice';

import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';

import './styles/utils/main.scss';
import './App.scss';

export const App = () => {
  const dispatch = useAppDispatch();
  const { loaded } = useAppSelector(state => state.products);

  useEffect(() => {
    console.info('App->useEffect->dispatch(productsSlice.fetchProducts())');// eslint-disable-line
    dispatch(productsSlice.fetchProducts());
  }, [dispatch]);

  return (
    <div className="App App__container page__body">
      <div className="App__top">
        <Header />

        {!loaded ? (
          <Loader />
        ) : (
          <Outlet />
        )}
      </div>

      <Footer />
    </div>
  );
};
