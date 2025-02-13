import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { Homepage } from './Homepage/Homepage';
import { Footer } from './Footer/Footer';
import { TopBar } from './TopBar/TopBar';
import { ProductDetailsPage } from './ProductDetails/ProductDetails';
import { Favorites } from './Favorites/Favorites';
import { Cart } from './Cart/Cart';
import { Menu } from './Menu/Menu';
import { ScrollToTop } from './utils/scrollToTop';
import { NotFound } from './NotFound/NotFound';
import { ProductPage } from './ProductPage/ProductPage';

export const App = () => {
  const location = useLocation();

  return (
    <>
      <div className="app">
        <ScrollToTop />
        <TopBar />
        <main className="app__main">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Homepage />} />

            <Route
              path="/phones"
              element={<ProductPage pageType="phones" />}
            ></Route>
            <Route
              path="/tablets"
              element={<ProductPage pageType="tablets" />}
            ></Route>
            <Route
              path="/accessories"
              element={<ProductPage pageType="accessories" />}
            ></Route>
            <Route
              path="/phones/:productId"
              element={<ProductDetailsPage productType="phones" />}
            />
            <Route
              path="/tablets/:productId"
              element={<ProductDetailsPage productType="tablets" />}
            />
            <Route
              path="/accessories/:productId"
              element={<ProductDetailsPage productType="accessories" />}
            />
            <Route path="/favorites" element={<Favorites />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {location.pathname !== '/menu' && <Footer />}
      </div>
    </>
  );
};
