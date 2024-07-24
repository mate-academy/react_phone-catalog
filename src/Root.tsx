import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
// import { Catalog } from './pages/Catalog';
import { HomePage } from './pages/HomePage';
import { FavouritesProvider } from './contexts/favouritesContext';
import { CartProvider } from './contexts/CartContext';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <FavouritesProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </FavouritesProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path=":category">
            {/* <Route index element={<Catalog />} /> */}
          </Route>
          <Route />
          <Route />
        </Route>
      </Routes>
    </HashRouter>
  );
};
