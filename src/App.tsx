import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { useContext, useEffect } from 'react';
import { getProducts } from './api';
import { DispatchContext } from './Store';
import { Footer } from './components/Footer';

export const App = () => {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getProducts().then(dataProducts =>
      dispatch({
        type: 'setProducts',
        payload: dataProducts,
      }),
    );
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
