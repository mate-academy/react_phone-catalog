import React, { useContext, useEffect } from 'react';
import {
  Route,
  Routes,
  Navigate,
  useParams,
} from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { Cart } from './components/Cart/Cart';
import { Favorite } from './components/Favorite/Favorite';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { PhoneCatalogContext } from './PhoneCatalogContext';

const App: React.FC = () => {
  const { setSelectedId } = useContext(PhoneCatalogContext);

  const { productId } = useParams();

  useEffect(() => {
    setSelectedId(productId);
  }, []);

  return (
    <div className="App">
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="home" element={<Navigate to="/" />} />

          <Route
            path="/phones"
            element={
              (
                <ProductsPage
                  title="Mobile phones"
                  navTitle="Phones"
                  type="phones"
                />
              )
            }
          />

          <Route
            path="/phones/:productId"
            element={
              (
                <ProductPage />
              )
            }
          />

          <Route path="/cart" element={<Cart />} />

          <Route path="/favorites" element={<Favorite />} />

          <Route
            path="/tablets"
            element={
              (
                <ProductsPage
                  title="Tablets"
                  navTitle="Tablets"
                  type="tablets"
                />
              )
            }
          />

          <Route
            path="/accessories"
            element={
              (
                <ProductsPage
                  title="Accessories"
                  navTitle="Accessories"
                  type="accessories"
                />
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
