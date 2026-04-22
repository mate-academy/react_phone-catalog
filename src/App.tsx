import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header/Header';
import { Footer } from './modules/shared/components/Footer';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartsPage } from './modules/CartsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Preferences } from './modules/shared/components/Preferences';
import { ScrollToTop } from './modules/shared/components/ScrollToTop';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="page">
      <Header openMenu={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="page__content">
        <div className="page__preferences">
          <Preferences />
        </div>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/cart" element={<CartsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
