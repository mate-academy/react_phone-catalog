import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { FavouritesProvider } from './context/Favouritescontext';
import { CartProvider } from './context/Cartcontext';
import { HomePage } from './components/HomePage/HomePage';
import { Phone } from './components/Phone/Phone';
import { Tablet } from './components/Tablet/Tablet';
import { Accessories } from './components/Accessories/Accessories';
import { ItemCard } from './components/ItemCard/ItemCard';
import { FavouritesPage } from './components/FavouritesPage/FavouritesPage';
import { CartPage } from './components/CartPage/CartPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

export const App = () => (
  <Router>
    <FavouritesProvider>
      <CartProvider>
        <div className="App">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<Phone />} />
            <Route path="/tablets" element={<Tablet />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/product/:productId" element={<ItemCard />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </CartProvider>
    </FavouritesProvider>
  </Router>
);
