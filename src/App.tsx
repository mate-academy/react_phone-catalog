import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/home-page';
import { PhonesPage } from './pages/phones-page/PhonesPage';
import { TabletsPage } from './pages/tablets-page/TabletsPage';
import { AccessoriesPage } from './pages/accessories-page/AccessoriesPage';
import { ProductDetailsPage } from './pages/product-details-page';
import { ContactsPage } from './pages/contact-us-page';
import { RightsPage } from './pages/rights-page/RightsPage';
import { FavouritesPage } from './pages/favorite-page';
import { CartPage } from './pages/cart-page/CartPage';
import { NotFoundPage } from './pages/not-found-page';
import './i18n';
import './App.scss';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <FavoriteProvider>
          <CartProvider>
            <div className="app">
              {/* Fixed Header */}
              <Header />

              {/* Main Content Area */}
              <main className="main-content">
                <Routes>
                  {/* Main Pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/phones" element={<PhonesPage />} />
                  <Route path="/tablets" element={<TabletsPage />} />
                  <Route path="/accessories" element={<AccessoriesPage />} />

                  {/* Product Details Page */}
                  <Route path="/product/:productId" element={<ProductDetailsPage />} />

                  {/* User Pages */}
                  <Route path="/favorites" element={<FavouritesPage />} />
                  <Route path="/cart" element={<CartPage />} />

                  {/* Footer Pages */}
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path="/rights" element={<RightsPage />} />

                  {/* 404 Page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          </CartProvider>
        </FavoriteProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
