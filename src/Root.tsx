import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { PageNotFound } from './modules/PageNotFound/PageNotFound';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { ThemeProvider } from './store/ThemeContext';
import { ProductProvider } from './store/ProductContext';
import { TabletsPage } from './modules/TabletsPage';
import { FiltersProvider } from './store/FiltersContext';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { PaginationProvider } from './store/PaginationContext';
import ScrollToTop from './shared/components/ScrollToTop/ScrollToTop';
import { ProductDetailsProvider } from './store/ProductDetailsContext';
import { CartProvider } from './store/CartContext';
import { FavouritesProvider } from './store/FavouritesContext';

export const Root = () => (
  <Router>
    <ProductProvider>
      <CartProvider>
        <FavouritesProvider>
          <FiltersProvider>
            <PaginationProvider>
              <ThemeProvider>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<App />}>
                    <Route path="home" element={<Navigate to={'/'} />} />
                    <Route index element={<HomePage />} />
                    <Route path="phones" element={<PhonesPage />} />
                    <Route
                      path="phones/:productId?"
                      element={
                        <ProductDetailsProvider>
                          <ProductDetailsPage />
                        </ProductDetailsProvider>
                      }
                    ></Route>
                    <Route path="tablets" element={<TabletsPage />} />
                    <Route
                      path="tablets/:productId?"
                      element={
                        <ProductDetailsProvider>
                          <ProductDetailsPage />
                        </ProductDetailsProvider>
                      }
                    ></Route>
                    <Route path="accessories" element={<AccessoriesPage />} />
                    <Route
                      path="accessories/:productId?"
                      element={
                        <ProductDetailsProvider>
                          <ProductDetailsPage />
                        </ProductDetailsProvider>
                      }
                    ></Route>
                    <Route path="favourites" element={<FavouritesPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                </Routes>
              </ThemeProvider>
            </PaginationProvider>
          </FiltersProvider>
        </FavouritesProvider>
      </CartProvider>
    </ProductProvider>
  </Router>
);
