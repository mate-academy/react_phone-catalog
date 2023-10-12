import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { HomePage } from './pages/Homepage/HomePage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessorysPage } from './pages/AccessoryPage/AccessoryPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';

const App = () => (
  <div className="App">
    <div className="App__header">
      <Header />
    </div>
    <section className="App__main-section">
      <div className="App__content">
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
            <Route index element={<TabletsPage />} />

            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessorysPage />} />

            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route
            path="cart"
            element={<CartPage />}
          />

          <Route
            path="favourites"
            element={<FavouritesPage />}
          />

          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>

      </div>
    </section>
    <div className="App__footer">
      <Footer />
    </div>
  </div>
);

export default App;
