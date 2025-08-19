import { Outlet } from 'react-router-dom';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import { ProductsProvider } from './shared/context/ProductsContext';
import './styles/resetStyles.scss';
import './App.scss';

export const App = () => (
  <ProductsProvider>
    <div className="app">
      <Header />
      <main className="main-content">
        <h1 className="title_visually_hidden">Product Catalog</h1>
        <Outlet />
      </main>
      <Footer />
    </div>
  </ProductsProvider>
);
