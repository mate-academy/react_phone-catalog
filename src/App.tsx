import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import './App.scss';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletPage } from './pages/TabletPage/TabletPage';
import { AccessoriesPage } from './pages/Accessories/Accessories';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { FavoritesProvider } from './context/Favoritescontext/Favoritescontext';
import { CartPage } from './pages/CartPage/CartPage';
import { CartProvider } from './context/CartContext/CartContext';
import { Page404 } from './pages/Page404/Page404';

export const App = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/phones">
                <Route index element={<PhonesPage />} />
                <Route path=":productId" element={<ProductPage />} />
              </Route>

              <Route path="/tablets">
                <Route index element={<TabletPage />} />
                <Route path=":productId" element={<ProductPage />} />
              </Route>

              <Route path="/accessories">
                <Route index element={<AccessoriesPage />} />
                <Route path=":productId" element={<ProductPage />} />
              </Route>

              <Route path="/favorites" element={<FavoritesPage />} />

              <Route path="/cart" element={<CartPage />} />

              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </FavoritesProvider>
  );
};
