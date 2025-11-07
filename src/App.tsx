import './App.scss';
import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import MenuMobile from './components/MenuMobile';
import PhonesPage from './pages/PhonesPage/PhonesPage';
import TabletsPage from './pages/TabletsPage/TabletsPage';
import AccessoriesPage from './pages/AccessoriesPage/AccessoriesPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import SearchPage from './pages/SearchPage/SearchPage';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ModalProvider } from './context/ModalContext';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage/CartPage';
import ContactsPage from './pages/ContactsPage';
import RightsPage from './pages/RightsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import BackToTopButton from './components/BackToTopButton/BackToTopButton';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const body = document.body;
    const noScrollClass = 'body--no-scroll';

    if (isMenuOpen) {
      body.classList.add(noScrollClass);
    } else {
      body.classList.remove(noScrollClass);
    }

    return () => body.classList.remove(noScrollClass);
  }, [isMenuOpen]);

  return (
    <Router>
      <ModalProvider>
        <CartProvider>
          <FavoritesProvider>
            <ScrollToTop />

            <div className="App">
              <TopHeader
                isMenuOpen={isMenuOpen}
                onMenuToggle={handleMenuToggle}
              />

              {isMenuOpen && <MenuMobile onClose={handleMenuClose} />}

              <main className="main">
                <div className="container">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/phones" element={<PhonesPage />} />
                    <Route path="/tablets" element={<TabletsPage />} />
                    <Route path="/accessories" element={<AccessoriesPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route
                      path="/:category/:productId"
                      element={<ProductDetailsPage />}
                    />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/rights" element={<RightsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </div>
              </main>

              <Footer />
              <BackToTopButton isMenuOpen={isMenuOpen} />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </ModalProvider>
    </Router>
  );
};
