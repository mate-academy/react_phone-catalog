import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import { ProductsProvider } from './contexts/Products';
import { MainPage } from './components/MainPage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavouritesProvider } from './contexts/Favourites';
import { FavouritesPage } from './modules/Favourites';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './modules/CartPage';
import { CartContextProvider } from './contexts/Cart';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductsProvider>
    <CartContextProvider>
      <FavouritesProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<MainPage />} />
              <Route path="home" element={<Navigate to="/" />} />
              <Route path="phones" element={<PhonesPage />} />
              <Route path="tablets" element={<TabletsPage />} />
              <Route path="accessories" element={<AccessoriesPage />} />
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<Cart />} />
              <Route path="product/:productId" element={<ProductDetails />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </FavouritesProvider>
    </CartContextProvider>
  </ProductsProvider>,
);
