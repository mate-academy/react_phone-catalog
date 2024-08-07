import './App.scss';
import './styles/main.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideMenu } from './components/SideMenu';
import { HomePage } from './pages/HomePage';
import { useState } from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { ItemPage } from './pages/ItemPage';

export const App = () => {
  const [page, setPage] = useState('details');

  return (
    <div className="App">
      <h1 className="visually-hidden">Product Catalog</h1>
      <Header activePage={page} goToPage={setPage} />

      <SideMenu />

      <div className="container">
        {page === 'home' && <HomePage />}
        {page === 'phones' && <CatalogPage />}
        {page === 'details' && <ItemPage />}
      </div>

      <Footer />
    </div>
  );
};
