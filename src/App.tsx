import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './modules/Header';
import Footer from './modules/Footer';
import { ProductCatalogProvider } from './ProductCatalogContext';
import { ProductDetailProvider } from './ProductDetailContext';
import { GlobalStateProvider } from './store';

export const App = () => {
  return (
    <GlobalStateProvider>
      <ProductCatalogProvider>
        <ProductDetailProvider>
          <div className="App App__container">
            <Header />
            <Outlet />
            <Footer />
          </div>
        </ProductDetailProvider>
      </ProductCatalogProvider>
    </GlobalStateProvider>
  );
};
