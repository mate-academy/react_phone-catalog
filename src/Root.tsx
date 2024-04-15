import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { FavouritesProvider } from './context/favouritesContext';
import { CartProvider } from './context/cartContext';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { ProductProvider } from './context/productContext';

export const Root = () => {
  return (
    <ProductProvider>
      <FavouritesProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />

                <Route path="phones">
                  <Route index element={<PhonesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path="tablets">
                  <Route index element={<TabletsPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path="accessories">
                  <Route index element={<AccessoriesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path="favourites">
                  <Route index element={<FavouritesPage />} />
                </Route>

                <Route path="cart">
                  <Route index element={<CartPage />} />
                </Route>

                <Route
                  path="*"
                  element={<h1 className="title">Page not found</h1>}
                />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </FavouritesProvider>
    </ProductProvider>
  );
};
