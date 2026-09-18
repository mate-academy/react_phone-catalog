import './App.scss';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { PhonesCatalog } from './components/PhonesCatalog';
import { TabletsCatalog } from './components/TabletsCatalog';
import { AccessoriesCatalog } from './components/AccessoriesCatalog';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { ScrollToTop } from './components/ScrollToTop';
import { Cart } from './components/Cart';
import { FavouritesProvider } from './components/FavouritesContext';
import { CartProvider } from './components/CartContext';
import { FavouritesPage } from './components/FavouritesPage';

export const App = () => {
  return (
    <Router>
      <CartProvider>
        <FavouritesProvider>
          <div className="app">
            <Header />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/home" element={<Main />} />{' '}
              <Route path="/phones" element={<PhonesCatalog />} />
              <Route
                path="/phones/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/tablets" element={<TabletsCatalog />} />
              <Route
                path="/tablets/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/accessories" element={<AccessoriesCatalog />} />
              <Route
                path="/accessories/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<FavouritesPage />} />
              <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
          </div>
        </FavouritesProvider>
      </CartProvider>
    </Router>
  );
};
