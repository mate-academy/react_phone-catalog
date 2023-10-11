import { Navigate, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.scss';

import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { PhonesPage } from './pages/PhonesPage';
import { TabletPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';

const App = () => (
  <AnimatePresence exitBeforeEnter>
    <div className="app">
      <Header />

      <section className="app__section">
        <div className="app__content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />

              <Route
                path=":productId"
                element={<ProductDetailsPage />}
              />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletPage />} />

              <Route
                path=":productId"
                element={<ProductDetailsPage />}
              />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />

              <Route
                path=":productId"
                element={<ProductDetailsPage />}
              />
            </Route>

            <Route
              path="favorites"
              element={<FavoritesPage />}
            />

            <Route
              path="cart"
              element={<CartPage />}
            />

            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </div>
      </section>

      <div className="app__footer">
        <Footer />
      </div>
    </div>
  </AnimatePresence>
);

export default App;
