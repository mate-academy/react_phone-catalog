import './App.scss';

import { Body } from './components/HomePage/HomePage';
import { PhonePage } from './components/CatalogPages/PhonePage';
import { MainLayout } from './components/MainLayout';
import { ItemCardPage } from './components/ItemCardPage/ItemCardPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Favourites } from './components/Favourites/Favourites';
import { Cart } from './components/Cart/Cart';
import { TabletsPage } from './components/CatalogPages/TabletsPage';
import { AccessoriesPage } from './components/CatalogPages/AccessoriesPage';
import { NotFoundPage } from './components/NotFoundPage';
import { CategoryProvider } from './context/CategoryContext';

export const App = () => {
  return (
    <CategoryProvider>
      <div className="App">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Body />} />
            <Route path="product/:productId" element={<ItemCardPage />} />

            <Route path="phones" element={<PhonePage />} />
            <Route path="tablets" element={<TabletsPage />} />
            <Route path="accessories" element={<AccessoriesPage />} />

            <Route path="favourites" element={<Favourites />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
        </Routes>
      </div>
    </CategoryProvider>
  );
};
