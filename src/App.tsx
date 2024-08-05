import { Outlet } from 'react-router-dom';
import { Header } from './modules/shared/Header';
import './styles/App.scss';
import { Footer } from './modules/shared/Footer';
import { useContext } from 'react';
import { ProductContext } from './modules/shared/Context/Context';

export const App = () => {
  const { path } = useContext(ProductContext);

  return (
    <div className="app">
      <Header />

      <Outlet />

      {path !== '/menu' && <Footer />}
      <h1 hidden>Product Catalog</h1>
    </div>
  );
};
