import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { Layout } from './shared/Layout';
import { HomePage } from './modules/HomePage';
import { Phones } from './modules/Phones';
import { Tablets } from './modules/Tablets/Tablets';
import { Accessories } from './modules/Accessories';
import { ProductInfo } from './modules/ProductInfo/ProductInfo';
import { Cart } from './modules/Cart';
import { Favourites } from './modules/Favourites/Favourites';
import './i18n/i18n';

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/phones" element={<Phones />} />

        <Route path="/tablets" element={<Tablets />} />

        <Route path="/accessories" element={<Accessories />} />

        <Route path="/case" element={<Cart />} />

        <Route path="/favourites" element={<Favourites />} />

        <Route path="/:category/:modelName" element={<ProductInfo />} />

        <Route
          path="*"
          element={<img src="/img/page-not-found.png" alt="Page not found" />}
        />
      </Routes>
    </Layout>
  );
};
