import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from '@components/Header';
import { HomePage } from '@pages/Home/HomePage';
import { Footer } from '@components/Footer';
import { ProductPage } from '@pages/ProductPage';
import { ProductDetail } from '@pages/ProductDetail';
import { NotFoundPage } from '@pages/NotFoundPage';
import { Favourites } from '@pages/Favourites';
import { Cart } from '@pages/Cart';
import './App.scss';

export const App = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', isLightMode);
  }, [isLightMode]);

  const handleSetMode = () => {
    setIsLightMode(prev => !prev);
  };

  return (
    <div className="app">
      <Header isLightMode={isLightMode} handleSetMode={handleSetMode} />
      <Routes>
        <Route path="/" element={<HomePage isLightMode={isLightMode} />} />
        <Route path="/home" element={<HomePage isLightMode={isLightMode} />} />

        <Route
          path="/phones"
          element={<ProductPage isLightMode={isLightMode} />}
        />
        <Route
          path="/phones/:itemId"
          element={<ProductDetail isLightMode={isLightMode} />}
        />

        <Route
          path="/tablets"
          element={<ProductPage isLightMode={isLightMode} />}
        />
        <Route
          path="/tablets/:itemId"
          element={<ProductDetail isLightMode={isLightMode} />}
        />

        <Route
          path="/accessories"
          element={<ProductPage isLightMode={isLightMode} />}
        />
        <Route
          path="/accessories/:itemId"
          element={<ProductDetail isLightMode={isLightMode} />}
        />

        <Route
          path="/favourites"
          element={<Favourites isLightMode={isLightMode} />}
        />
        <Route path="/cart" element={<Cart isLightMode={isLightMode} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer isLightMode={isLightMode} />
    </div>
  );
};
