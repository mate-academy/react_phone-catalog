import './App.scss';
import './styles/main.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideMenu } from './components/SideMenu';
import { HomePage } from './pages/HomePage';
import { useState } from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { ItemPage } from './pages/ItemPage';
import { FavoritePage } from './pages/FavoritePage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  const [page, setPage] = useState('123');

  return (
    <div className="App">
      <h1 className="visually-hidden" id="home">
        Product Catalog
      </h1>
      <Header activePage={page} goToPage={setPage} />

      <SideMenu />

      <div className="container">
        {page === 'home' && <HomePage />}
        {page === 'phones' && <CatalogPage />}
        {page === 'details' && <ItemPage />}
        {page === 'favorites' && <FavoritePage />}
        {page === 'cart' && <CartPage />}
        {page === '123' && <NotFoundPage />}
      </div>

      <Footer />
    </div>
  );
};
