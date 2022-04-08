import { FunctionComponent, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Styles
import './App.scss';

// Api request
import { getProducts } from './api/getProducts';

// Types
import { Product } from './types/Product';

// Components
import { Header } from './components/Header';
import { Container } from './components/Container';
import { NoResults } from './components/NoResults';
import { Footer } from './components/Footer';

// Providers
import { FavouritesProvider } from './contexts/FavoritesProvider';
import { CartProvider } from './contexts/CartProvider';

// Pages
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

export const App: FunctionComponent = () => {
  useEffect(() => {
    getProducts().then(products => {
      const phones = products.filter((product: Product) => product.type === 'phone');
      const tablets = products.filter((product: Product) => product.type === 'tablet');
      const accessories = products.filter((product: Product) => product.type === 'accessory');

      localStorage.setItem('products', JSON.stringify(products));
      localStorage.setItem('phones', JSON.stringify(phones));
      localStorage.setItem('tablets', JSON.stringify(tablets));
      localStorage.setItem('accessories', JSON.stringify(accessories));
      localStorage.setItem('totalSum', '0');
    });
  }, []);

  return (
    <FavouritesProvider>
      <CartProvider>
        <div className="App">
          <Header />

          <main className="App__content">
            <Container>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/phones" element={<PhonesPage />} />
                <Route path="/phones/:productId" element={<ProductDetailsPage />} />
                <Route path="/tablets" element={<TabletsPage />} />
                <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
                <Route path="/accessories" element={<AccessoriesPage />} />
                <Route path="/accessories/:productId" element={<ProductDetailsPage />} />
                <Route path="/favourites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NoResults type="page" />} />
              </Routes>
            </Container>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </FavouritesProvider>
  );
};
