import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header/Header';
import { Footer } from './modules/shared/components/Footer/Footer';
import { useContext } from 'react';
import { ProductsContext } from './modules/shared/_store/DataProvider';
import { Loader } from './modules/shared/components/Loader';

export const App = () => {
  // const { products, loading, error } = useContext(ProductsContext);
  const { loading, error } = useContext(ProductsContext);

  return (
    <div className="app">
      <Header />
      {loading && <Loader />}
      {!!error && <p>{error}</p>}
      <Outlet />
      <Footer />
    </div>
  );
};
