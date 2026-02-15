import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartProvider } from './shared/context/CartContext';
import { ToastContainer } from 'react-toastify';
import { Footer } from './components/Footer';
import { CataloguePage } from './pages/CataloguePage/CataloguePage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { FavoritesProvider } from './shared/context/Favorites';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

export const App = () => (
  <CartProvider>
    <FavoritesProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:category" element={<CataloguePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="*"
            element={
              <NotFoundPage
                title="Oops! Page not found"
                description="This section of the site is still beyond our reach. Stay tuned!"
              />
            }
          />
        </Routes>

        <Footer />
      </div>
      <ToastContainer />
    </FavoritesProvider>
  </CartProvider>
);
