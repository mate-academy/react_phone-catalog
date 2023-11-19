import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/HomePage/HomePage';
import './App.scss';
import { Phones } from './pages/PhonesPage/PhonesPage';
import { Tablets } from './pages/TabletsPage/TabletsPage';
import { Favorites } from './pages/FavoritesPage/FavoritesPage';
import { Cart } from './pages/CartPage/CartPage';
import { Accessories } from './pages/AccessoriesPage/AccessoriesPage';
import { Header } from './components/Heder/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <main className="page__main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </main>
    <Footer />
  </div>
);
