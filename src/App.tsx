import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from './hooks/hooks';
import { getData } from './utils/httpClient';
import { getCategories } from './services/categoryHelper';
import { Product } from './types/Product';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'fetchStart' });

    getData<Product[]>('api/products')
      .then(products => dispatch({ type: 'fetchSuccess', payload: products }))
      .catch(() =>
        dispatch({
          type: 'fetchFailed',
          payload: 'Sorry, something went wrong. Please, try later.',
        }),
      );

    getCategories()
      .then(categoriesList =>
        dispatch({ type: 'loadCategories', payload: categoriesList }),
      )
      .catch(() =>
        dispatch({
          type: 'fetchFailed',
          payload: 'Sorry, something went wrong. Please, try later.',
        }),
      );
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
      <h1 className="page__hidden">Product Catalog</h1>
      <Outlet />
      <Footer />
    </div>
  );
};
