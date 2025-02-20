import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { AppProvider } from './context/AppContext';
import { HomePage } from './pages/HomePage';
import { useEffect, useState } from 'react';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';

export const App = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    setIsMenuOpen(searchParams.has('menu'));
  }, [location]);

  return (
    <div className="App">
      <AppProvider>
        <Header />

        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path=":category" element={<CategoryPage />} />
            <Route path=":category/:productId" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
          </Routes>

          {isMenuOpen && <Menu />}
        </main>

        <Footer />
      </AppProvider>
    </div>
  );
};
