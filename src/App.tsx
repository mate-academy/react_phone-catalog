// eslint-disable-next-line max-len
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { Phones } from './components/Phones/Phones';
import { Tablets } from './components/Tablets/Tablets';
import { Favorites } from './components/Favorite/Favorites';
import { Cart } from './components/Card/Cart';
import { Accessories } from './components/Accessories/Accessories';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from './Product/ProductDetailsPage';

export const App: React.FC = () => {
  return (
    <div className="content">
      <div>
        <Header />
      </div>
      <main className="main">
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/tablets" element={<Tablets />} />
            <Route
              path="/accessories"
              element={<Accessories />}
            />
            <Route
              path="/favorites"
              element={<Favorites />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/product/:category/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
