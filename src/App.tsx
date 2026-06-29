import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './modules/Header';
import Footer from './modules/Footer';
import { ProductCatalogProvider } from './ProductCatalogContext';
import { ProductDetailProvider } from './ProductDetailContext';
import { useSelector } from 'react-redux';
import { RootState } from './store/index';
import { useEffect } from 'react';

export const App = () => {
  const theme = useSelector((state: RootState) => state.layoutTheme.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ProductCatalogProvider>
      <ProductDetailProvider>
        <div className="App App__container">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </ProductDetailProvider>
    </ProductCatalogProvider>
  );
};
