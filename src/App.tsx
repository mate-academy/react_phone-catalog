import './App.modules.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/components/HomePage';
import { PhonesPage } from './modules/PhonesPage/components/PhonesPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/components/ProductDetailsPage/ProductDetailsPage';

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
        <Route path="*" />
      </Routes>
      <Footer />
    </>
  );
};
