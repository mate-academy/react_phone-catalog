import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './context/AppContext';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Catalog } from './components/Catalog';

import './utils/styles/index.scss';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { Favourites } from './components/Favourites';
import { Cart } from './components/Cart';
import { ThemeProvider } from './context/ThemeContext';

export const Root = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path=":category">
              <Route index element={<Catalog />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="favourites" element={<Favourites />} />

            <Route path="cart" element={<Cart />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </ThemeProvider>
  );
};
