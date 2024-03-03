import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';
import { Footer } from './components/Footer';
import { ProductDetails } from './pages/ProductDetails';
import { ProductsPage } from './pages/ProductsPage';
import { HomePage } from './pages/HomePage';
import { Cart } from './pages/Cart';
import { Favorites } from './pages/Favorites/Favorites';
import { Error } from './components/Error';

export const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="app__content">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="phones"
              element={(
                <ProductsPage searchQuery="phones" />
              )}
            />
            <Route
              path="tablets"
              element={(
                <ProductsPage searchQuery="tablets" />
              )}
            />
            <Route
              path="accessories"
              element={(
                <ProductsPage searchQuery="accessories" />
              )}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              path="/favorites"
              element={<Favorites />}
            />
            <Route path="/:category/:id" element={<ProductDetails />} />
            <Route path="*" element={<Error error="Page Not Found" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};
