import './App.scss';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { PageNotFound } from './modules/PageNotFound';
import { Header } from './components/Header';
import { CategoryProduct } from './modules/CategoryProduct';
import { Footer } from './components/Footer';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './contexts/CartContext/CartContext';

export const App = () => {
  return (
    <>
      <Router>
        <CartProvider>
          <div className="App">
            <Header />

            {/* routes */}
            <main className="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route
                  path="/:category/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="/:category" element={<CategoryProduct />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
          </div>

          <Footer />
        </CartProvider>
      </Router>
    </>
  );
};
