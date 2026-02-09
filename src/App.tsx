import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './modules/Header';
import Footer from './modules/Footer';
import { ProductCatalogProvider } from './ProductCatalogContext';
import { ProductDetailProvider } from './ProductDetailContext';
import { Provider } from 'react-redux';
import store from './store/index';

export const App = () => {
  return (
    <Provider store={store}>
      <ProductCatalogProvider>
        <ProductDetailProvider>
          <div className="App App__container">
            <Header />
            <Outlet />
            <Footer />
          </div>
        </ProductDetailProvider>
      </ProductCatalogProvider>
    </Provider>
  );
};
