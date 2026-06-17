import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

export const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="App">
          <Navbar />

          <div className="section">
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/phones" element={<PhonesPage />} />
                {/*<Route path="/tablets" element={<TabletsPage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />

      <Route path="/product/:productId" element={<ProductDetailsPage />} />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />*/}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
};
