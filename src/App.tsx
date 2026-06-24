import './App.scss';
import { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  PhonesPage,
  TabletsPage,
  AccessoriesPage,
  FavouritesPage,
  CartPage,
  ProductDetailsPage,
  NotFoundPage,
} from './modules';
import { Header, Footer } from './modules/shared/components';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/phones" element={<PhonesPage />} />

        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />

        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/:category/:itemId" element={<ProductDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};
