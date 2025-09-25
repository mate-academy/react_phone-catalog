import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './modules/HomePage/HomePage';
import { Catalog } from './modules/Catalog/Catalog';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetails/ProductDetailsPage';
import Footer from './components/Footer';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/phones" element={<Catalog type={'phones'} />}></Route>
        <Route path="/tablets" element={<Catalog type={'tablets'} />}></Route>
        <Route
          path="/accessories"
          element={<Catalog type={'accessories'} />}
        ></Route>
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
