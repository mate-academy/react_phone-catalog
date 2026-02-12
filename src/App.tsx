import './i18n';
import './App.scss';
import './styles/fonts.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { ProductsProvider } from './context/ProductsContext';

import { createContext, useContext } from 'react';

export const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const App = () => {
  return (
    <div className="app">
      <ProductsProvider>
        <NavBar />

        <div className="main">
          <Outlet />
        </div>
      </ProductsProvider>

      <Footer />
    </div>
  );
};
