import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './components/context/ProductContext';
import { HomePage } from './components/HomePage/HomePage';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { FavouritesPage } from './components/FavouritesPage/FavouritesPage';
import { ProductCart } from './components/ProductCart/ProductCart';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ProductProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="phones/:productId" element={<ProductDetails />} />
          <Route path="accessories/:productId" element={<ProductDetails />} />
          <Route path="tablets/:productId" element={<ProductDetails />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<ProductCart />} />
        </Route>
      </Routes>
    </ProductProvider>
  </HashRouter>,
);
