import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { ProductDetailPage } from './pages/ProductDetailPage/ProductDetailPage';
import { FavoritePage } from './pages/FavoritePage/FavoritePage';
import { FavoritesProvider } from './utils/FavoritePageContext';
import { CartPage } from './pages/CartPage/CartPage';
import { CartProvider } from './utils/CartContext';

export const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <header>
          <NavBar />
        </header>
        <div className="container">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<ProductPage type={'phones'} title={'Phones'} />} />
              <Route path="/tablets" element={<ProductPage type={'tablets'} title={'Tablets'} />} />
              <Route
                path="/accessories"
                element={<ProductPage type={'accessories'} title={'Accessories'} />}
              />
              <Route path="/:category/:productId" element={<ProductDetailPage />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </main>
        </div>
        <footer>
          <Footer />
        </footer>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default App;
