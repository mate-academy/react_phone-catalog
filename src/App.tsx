import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductsProvider } from './context/ProductsProvider';
import { CartProvider } from './context/CartProvider';
import { FavouriteProvider } from './context/FavouriteProvider';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Favourites } from './pages/Favourites';
import { Cart } from './pages/Cart';
import { Footer } from './components/Footer';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { NotFoundPage } from './components/NotFoundPage';

import './App.scss';

const App = () => {
  return (
    <ProductsProvider>
      <CartProvider>
        <FavouriteProvider>
          <div className="App">
            <Header />

            <div className="App__mainBlock">
              <Routes>
                <Route
                  path="/"
                  element={<HomePage />}
                />
                <Route
                  path="/phones"
                  element={<PhonesPage />}
                />
                <Route
                  path="/phones/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route
                  path="/tablets"
                  element={<TabletsPage />}
                />
                <Route
                  path="/accessories"
                  element={<AccessoriesPage />}
                />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </FavouriteProvider>
      </CartProvider>
    </ProductsProvider>
  );
};

export default App;
