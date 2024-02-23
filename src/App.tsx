import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';
import { Footer } from './components/Footer';
import { ProductDetails } from './Pages/ProductDetails';
import { ProductsPage } from './Pages/ProductsPage';
import { HomePage } from './Pages/HomePage';
import { Cart } from './Pages/Cart';
import { Favorites } from './Pages/Favorites/Favorites';

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
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
};
