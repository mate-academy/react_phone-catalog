import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useContext, useEffect } from 'react';
import { DispatchContext } from './store/GlobalProvider';
import { getCategories } from './helpers/helpers';

export const App = () => {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getCategories()
      .then(catIds => dispatch({ type: 'loadCategories', payload: catIds }))
      .catch(() => 'something wrong while fetching products');
  }, [dispatch]);

  return (
    <div className="App">
      <h1 className="App__title">Product Catalog</h1>
      <div className="App__header">
        <Header />
      </div>

      <div className="App__main">
        <Outlet />
      </div>

      <div className="App__footer">
        <Footer />
      </div>
    </div>
  );
};
