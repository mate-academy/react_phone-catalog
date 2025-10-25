import './App.scss';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/pages/Home/Home';
import { Phones } from './components/pages/ProductPage/Phone/PhoneGrid';
import { Tablets } from './components/pages/ProductPage/Tablets/TabletsGrid';
import { Accessories } from './components/pages/ProductPage/Accessories/AccessoriesGrid';
import { ScrollToTop } from './utils/ScrollToTop';

import ProductPageWrapper from './components/pages/ProductPage/ImportAll';
import { ShoppingCart } from './components/pages/ShoppingCart/ShoppingCart';
import { FavouritesCart } from './components/pages/FavouritesCart/FavouritesCart';
import { FavouritesProvider } from './components/pages/FavouritesCart/favouritesProvider';

export default function App() {
  return (
    <FavouritesProvider>
      <div className="app">
        <Header />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/Home" element={<Home />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/:category/:id" element={<ProductPageWrapper />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/favourites" element={<FavouritesCart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FavouritesProvider>
  );
}
