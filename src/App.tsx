import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './modules/Header';
import Footer from './modules/Footer';
import { ProductCatalogProvider } from './ProductContext';

export const App = () => {
  return (
    <ProductCatalogProvider>
      <div className="App App__container">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ProductCatalogProvider>
  );
};
