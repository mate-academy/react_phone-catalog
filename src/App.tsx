import './App.modules.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/components/HomePage';
import { PhonesPage } from './modules/PhonesPage/components/PhonesPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/components/ProductDetailsPage/ProductDetailsPage';
import { TabletsPage } from './modules/TabletsPage/components/TabletsPage';
// eslint-disable-next-line max-len
import { AccessoriesPage } from './modules/AccesoriesPage/components/AccesoriesPage';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route
          path="/phones/:productId"
          element={<ProductDetailsPage category="phones" />}
        />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route
          path="/tablets/:productId"
          element={<ProductDetailsPage category="tablets" />}
        />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route
          path="/accessories/:productId"
          element={<ProductDetailsPage category="accessories" />}
        />
        <Route path="*" />
      </Routes>
      <Footer />
    </>
  );
};
