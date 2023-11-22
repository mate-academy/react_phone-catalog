import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { AccessorysPage } from './pages/AccessorysPage/AccessorysPage';
import { ProductDetailsPage } from
  './pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';

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

          <Route path="/contacts" element={<ContactsPage />} />

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
