import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { App } from './App';
import { ApiProvider } from './context/ApiContext';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { Favorite } from './pages/Favorite';
import { LocalStorageProvider } from './context/LocaleStorageContext';
import { Carts } from './pages/Carts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ApiProvider>
    <LocalStorageProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="carts" element={<Carts />} />
            <Route path=":category">
              <Route index element={<CategoryPage />} />
              <Route path="pages/:page" element={<CategoryPage />} />
              <Route path="product/:id" element={<ProductDetails />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </LocalStorageProvider>
  </ApiProvider>,
);
