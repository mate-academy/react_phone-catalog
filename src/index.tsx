import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { PhonePage } from './pages/ProductsPages/PhonePage';
import { TabletPage } from './pages/ProductsPages/TabletPage';
import { AccessoryPage } from './pages/ProductsPages/AccessoryPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritePage } from './pages/ProductsPages/FavoritePage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { Homepage } from './pages/HomePage/HomePage';
import { DetailsPage } from './pages/DetailsPage/DetailsPage';

import './index.scss';

const Root: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />

          <Route path="/phones" element={<PhonePage />} />
          <Route path="/phones/:productId" element={<DetailsPage />} />

          <Route path="/tablets" element={<TabletPage />} />
          <Route path="/tablets/:productId" element={<DetailsPage />} />

          <Route path="/accessories" element={<AccessoryPage />} />
          <Route path="/accessories/:productId" element={<DetailsPage />} />

          <Route path="/favorites" element={<FavoritePage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
