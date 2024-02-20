import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideMenu } from './components/SideMenu';
import { DispatchContext } from './store/State';
import { getAllProducts } from './api/productApi';
import { Product } from './types/product';
import { getLocalStorigeData } from './helpers/localStorageHelper';

export const App = () => {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getAllProducts<Product[]>()
      .then(products => {
        dispatch({ type: 'getAllProducts', payload: products });
      })
      .catch(() => dispatch({
        type: 'setLoadingError',
        payload: 'Something went wrong...',
      }))
      .finally(() => dispatch({ type: 'setLoading', payload: false }));

    const favoriteProducts = getLocalStorigeData('favoriteProducts');

    if (!favoriteProducts) {
      localStorage.setItem('favoriteProducts', JSON.stringify([]));
    } else {
      dispatch({
        type: 'updateFavorite',
        payload: favoriteProducts,
      });
    }

    const cart = getLocalStorigeData('cart');

    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      dispatch({
        type: 'updateCart',
        payload: cart,
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <SideMenu />

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
