import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { CartPage } from './pages/CartPage/components/CartPage';
import { ProductPage } from './pages/ProductPage/ProductPage/ProductPage';
import { HeaderMobile } from './components/HeaderMobile';
import { Footer } from './components/Footer';
import { ProductCategories } from './types/ProductCategories';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage/components/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import HeaderLarge from './components/HeaderLarge/HeaderLarge';
import './styles/main.scss';
import './App.scss';
import './utils/_reset.scss';
import { useWindowDimensions } from './hooks/useWindowsDimensions';

export const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    if (windowDimensions.width > 639) {
      setIsMobile(false);
    } else {
      if (!isMobile) {
        setIsMobile(true);
      }
    }
  }, [isMobile, windowDimensions.width]);

  const { Phones, Tablets, Accessories } = ProductCategories;

  return (
    <>
      {isMobile ? <HeaderMobile /> : <HeaderLarge />}

      <Routes>
        <Route path="/" index element={<HomePage />} />

        <Route path="/phones" element={<ProductPage category={Phones} />} />
        <Route path="/tablets" element={<ProductPage category={Tablets} />} />
        <Route
          path="/accessories"
          element={<ProductPage category={Accessories} />}
        />

        <Route path="/product/:productId" element={<ProductDetailsPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/favorites" element={<FavoritesPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
};
