import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { Footer } from './components/Footer/Footer';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
/* eslint-disable max-len */
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
/* eslint-enable max-len */
import { Favorites } from './pages/Favorites/Favorites';

import { Cart } from './pages/Cart/Cart';

export const App = () => {
  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/phones"
            element={<CategoryPage title="Mobile phones" category="phones" />}
          />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route
            path="/tablets"
            element={<CategoryPage title="Tablets" category="tablets" />}
          />
          <Route
            path="/accessories"
            element={
              <CategoryPage title="Accessories" category="accessories" />
            }
          />
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
