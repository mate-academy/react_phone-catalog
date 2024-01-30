import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './app/store';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer';
import { Catalog } from './pages/Catalog/Catalog';
import { Favourites } from './pages/Favourites';
import { Cart } from './pages/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { NotFound } from './components/NotFound';

import './App.scss';

export const App: React.FC = () => (
  <Provider store={store}>
    <HashRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/phones">
            <Route
              index
              element={<Catalog category="phones" title="Mobile phones" />}
            />
            <Route
              path="/phones/:productId"
              element={<ProductDetails />}
            />
          </Route>

          <Route
            path="/phones/:productId"
            element={<ProductDetails />}
          />

          <Route
            path="/tablets"
            element={<Catalog category="tablets" title="Tablets" />}
          />

          <Route
            path="/accessories"
            element={<Catalog category="accessories" title="Accessories" />}
          />

          <Route
            path="/favourites"
            element={<Favourites />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  </Provider>
);
