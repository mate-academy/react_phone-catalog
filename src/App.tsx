import { Route, Routes } from 'react-router-dom';

import HomePage from './modules/HomePage/index';
import ProductsPage from './modules/ProductsPage';
import ProductDetailsPage from './modules/ProductDetailsPage/index';
import CartPage from './modules/CartPage/index';
import FavoritesPage from './modules/FavoritesPage/index';
import { NotFoundPage } from './modules/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer/index';
import './App.scss';

const App = () => {
  const onBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="app-container">
        <Header />
        <main className="main">
          <div className="main__content">
            <h1 className="visually-hidden">Product Catalog</h1>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones">
                <Route
                  index
                  element={
                    <ProductsPage category="phones" title="Phones page" />
                  }
                />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="/tablets">
                <Route
                  index
                  element={
                    <ProductsPage category="tablets" title="Tablets page" />
                  }
                />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="/accessories">
                <Route
                  index
                  element={
                    <ProductsPage
                      category="accessories"
                      title="Accessories page"
                    />
                  }
                />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>

        <Footer onBackToTop={onBackToTop} />
      </div>
    </>
  );
};

export default App;
