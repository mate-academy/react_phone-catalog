import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { PageNotFound } from './Components/PageNotFound';
import { PhonesPage } from './Components/PhonesPage';
import { TabletsPage } from './Components/TabletsPage';
import { AccessoriesPage } from './Components/AccessoriesPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { FavoritesPage } from './Components/FavoritesPage';
import { CartItem } from './Components/CartItem';

export const App = () => {
  return (
    <FavoritesProvider>
      <main>
        <Header />
        <CartItem
          product={{
            id: 152,
            category: 'accessories',
            itemId: 'apple-watch-se-44mm-gold',
            name: 'Apple Watch SE 44mm Gold',
            fullPrice: 309,
            price: 289,
            screen: "1.78' OLED",
            capacity: '44mm',
            color: 'gold',
            ram: '1GB',
            year: 2020,
            image: 'img/accessories/apple-watch-se/gold/00.webp',
          }}
        />

        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/cart" element={<div>Cart page</div>} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </main>
    </FavoritesProvider>
  );
};
