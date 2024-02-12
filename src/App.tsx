import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';
import { Footer } from './components/Footer';
import { DispatchContext } from './store/State';
import { getAllProducts } from './api/productApi';
import { Product } from './types/product';

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

    const favoriteProducts = localStorage.getItem('favoriteProducts');

    if (!favoriteProducts) {
      localStorage.setItem('favoriteProducts', JSON.stringify([]));
    } else {
      dispatch({
        type: 'updateFavorite',
        payload: JSON.parse(favoriteProducts),
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
