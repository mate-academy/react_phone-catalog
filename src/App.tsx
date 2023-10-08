import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { HomePage } from './pages/HomePage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessorysPage } from './components/AccessoryPage/AccessoryPage';
import { CartPage } from './components/CartPage/CartPage';
import { FavouritesPage } from './components/FavouritesPage/FavouritesPage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

const App = () => (
  <div className="App">
    <div className="App__header">
      <Header />
    </div>
    <section className="main-section">
      <div className="main-section__content">
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
