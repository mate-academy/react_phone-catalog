import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { ProductsProvider } from './context/ProductsContext';

export const App = () => {
  return (
    <ProductsProvider>
      <div className="app">
        <Header />
        <div className="main">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ProductsProvider>
  );
};
