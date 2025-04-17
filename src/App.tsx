/* eslint-disable max-len */
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { AccessoriesPage } from './Pages/AccessoriesPage/Accessories';
import { HomePage } from './Pages/HomePage/HomePage';
import { PhonePage } from './Pages/PhonePage/PhonePage';
import { TabletPage } from './Pages/TabletPage/TabletPage';
import { Layout } from './components/Header/Layout';
import { Aside } from './components/Aside/Aside';
import { ProductDetailsPage } from './Pages/ProductDetailsPage/ProductDetailsPage';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Aside />} />
        <Route path="/phones" element={<PhonePage />} />
        <Route path="/tablets" element={<TabletPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
      </Routes>
    </Layout>
  );
};
