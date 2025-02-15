import './App.scss';
import '/src/styles/main.scss';
import { Header } from './components/Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { Catalog } from './modules/Catalog';
import { PageNotFound } from './modules/PageNotFound';
import { useRef } from 'react';
import { Footer } from './components/Footer';
import { ProductDetails } from './modules/ProductDetails/ProductDetails';
import { Favorites } from './modules/Favorites';
import { Cart } from './modules/Cart';
import { Menu } from './components/Menu/Menu';
export const App = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header headerRef={headerRef} />

      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path={'/catalog/'} element={<Catalog />} />
        <Route path={'/catalog/:category'} element={<Catalog />} />
        <Route
          path="/catalog/:category/:productId"
          element={<ProductDetails />}
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer headerRef={headerRef} />
    </>
  );
};
