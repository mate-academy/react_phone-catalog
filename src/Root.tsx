import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { PhonePage } from './pages/PhonePage';
import { TabletPage } from './pages/TabletPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<PhonePage />} />
        <Route path="tablets" element={<TabletPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="phones/:itemId" element={<ProductDetailsPage />} />
        <Route path="tablets/:itemId" element={<ProductDetailsPage />} />
        <Route path="accessories/:itemId" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
