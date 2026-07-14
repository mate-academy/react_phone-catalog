import { Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductsDetailsPage } from './pages/ProductsDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { RightsPage } from './pages/RightsPage';

export const Root = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/:category" element={<ProductsPage />} />
          <Route path="/:category/:itemId" element={<ProductsDetailsPage />} />
          <Route path="/checkout" element={<ThankYouPage />} />
          <Route path="/rights" element={<RightsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};
