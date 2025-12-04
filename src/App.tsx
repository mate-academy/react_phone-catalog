// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Phones from './pages/Phones';
import Tablets from './pages/Tablets';
import Accessories from './pages/Accessories';
import Footer from './components/Footer';
import './styles/vars.css';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import { CartProvider } from './pages/ShoppingCart';
import { FavoritesProvider } from './pages/Favorites/FavoritesContext';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './pages/NotFound/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import styles from './App.module.css';
import { ToastProvider } from './components/Toast/ToastContext';

export const App: React.FC = () => (
  <ThemeProvider>
    <Router>
      <FavoritesProvider>
        <CartProvider>
          <ToastProvider>
            <div className={styles.app}>
              <Navbar />
              <main className={styles.content}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/phones" element={<Phones />} />
                  <Route path="/tablets" element={<Tablets />} />
                  <Route path="/accessories" element={<Accessories />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </FavoritesProvider>
    </Router>
  </ThemeProvider>
);

export default App;
