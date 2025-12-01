import { Navigate, Route, Routes } from 'react-router-dom';
import '../src/App.scss';
import '../src/modules/shared/styles/_base.scss';
import { Header } from './modules/shared/components/Header';
import { HomePage } from './modules/HomePage';
import { Favourites } from './modules/Favourites';
import { Footer } from './modules/shared/components/Footer';
import { Catalog } from './modules/Catalog';
import { useContext } from 'react';
import { DataContext } from './context/ContextProvider';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { Cart } from './modules/Cart';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const App = () => {
  const { products, cartItems } = useContext(DataContext);

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
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
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
            path="/:category/:productId"
            element={<ProductDetailsPage />}
          ></Route>
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/cart" element={<Cart items={cartItems} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
