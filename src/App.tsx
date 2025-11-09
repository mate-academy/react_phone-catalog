import { Navigate, Route, Routes } from 'react-router-dom';
import '../src/App.scss';
import '../src/modules/shared/styles/base/_base.scss';
import { Header } from './modules/shared/components/Header/Header';
import { HomePage } from './modules/HomePage/HomePage';
import { Favourites } from './modules/Favourites/Favourites';
import { Footer } from './modules/shared/components/Footer/Footer';
import { Catalog } from './modules/Catalog/Catalog';
import { useContext } from 'react';
import { DataContext } from './context/ContextProvider';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const App = () => {
  const { products } = useContext(DataContext);

  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <div className="app" id="top" tabIndex={-1}>
      <h1 className="visually-hidden">Phone Catalog</h1>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<Navigate to="/" replace />}></Route>
          <Route
            path="/phones"
            element={<Catalog items={phones} title="Mobile phones" />}
          ></Route>
          <Route
            path="/tablets"
            element={<Catalog items={tablets} title="Tablets" />}
          ></Route>
          <Route
            path="/accessories"
            element={<Catalog items={accessories} title="Accessories" />}
          ></Route>
          <Route
            path="/product/:productId"
            element={<ProductDetailsPage />}
          ></Route>
          <Route path="/favourites" element={<Favourites />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
