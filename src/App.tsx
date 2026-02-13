import './App.scss';
import './components/Grid.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage';
import { FavoritePage } from './components/FavoritePage';
import { CartPage } from './components/CartPage';
import { Navigation } from './components/Navigation';
import { ProductPage } from './components/ProductPage';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="App" id="#">
      <header >
        <Navigation />
      </header>
      <main>
        <div className="grid-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:prodactId?" element={<ProductPage />} />
            <Route path="*" element={<div>404: Page Not Found</div>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};
