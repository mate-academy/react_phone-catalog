import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { App } from './App';

import { HomePage } from './pages/Home/HomePage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { HomeRedirect } from './pages/Home/HomeRedirect';
import { PhonesPage } from './pages/Phones/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetails/ProductDetailsPage';
import { TabletsPage } from './pages/Tablets/TabletsPage';
import { AccessoriesPage } from './pages/Accessories/AccessoriesPage';
import { FavouritesPage } from './pages/Favourites/FavouritesPage';
import { CartPage } from './pages/Cart/CartPage';

import { ProductsSwiperProvider } from './context/ProductsSwiperContext';
import { ProductDetailsProvider } from './context/ProductDetailsContext';
import { ProductProvider } from './context/ProductContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

export const Root = () => (
  <Router>
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <ProductProvider>
            <ProductsSwiperProvider>
              <ProductDetailsProvider>
                <Routes>
                  <Route path="/" element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path="home" element={<HomeRedirect />} />
                    <Route path="phones" element={<PhonesPage />}>
                      <Route path=":itemId" element={<ProductDetailsPage />} />
                    </Route>
                    <Route path="tablets" element={<TabletsPage />}>
                      <Route path=":itemId" element={<ProductDetailsPage />} />
                    </Route>
                    <Route path="accessories" element={<AccessoriesPage />}>
                      <Route path=":itemId" element={<ProductDetailsPage />} />
                    </Route>
                    <Route path="favourites" element={<FavouritesPage />} />
                    <Route path="cart" element={<CartPage />} />
                  </Route>
                  <Route path="*" element={<NotFoundPage />}></Route>
                </Routes>
              </ProductDetailsProvider>
            </ProductsSwiperProvider>
          </ProductProvider>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </Router>
);
