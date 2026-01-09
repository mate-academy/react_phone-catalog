//hooks
import { useEffect, useState } from 'react';

//react-router
import { Navigate, Route, Routes } from 'react-router-dom';

//style
import './styles/Reset.scss';
import styles from './App.module.scss';

//components
import { NavBar } from './components/NavBar';

//pages
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage';
import { Cart } from './pages/Cart';

import { CartContext } from './services/CartContext';

export const App = () => {
  const [cart, setCart] = useState<string[]>(['cart']);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + '#/');
    }
  }, []);

  return (
    <div className={styles.app}>
      <CartContext.Provider value={{ cart, setCart }}>
        <NavBar />

        <Routes>
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/phones"
            element={<ProductsPage productsType={'phones'} />}
          />
          <Route
            path="/tablets"
            element={<ProductsPage productsType={'tablets'} />}
          />
          <Route
            path="/accessories"
            element={<ProductsPage productsType={'accessories'} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CartContext.Provider>
    </div>
  );
};
