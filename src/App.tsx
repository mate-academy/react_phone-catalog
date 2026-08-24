import './App.scss';
import { HomePage } from './modules/HomePage/HomePage';
import { Header } from './components/Header/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Menu } from './components/Menu/Menu';
import { Phones } from './modules/PhonesPage/Phones';
import { Tablets } from './modules/TabletsPage/Tablets';
import { Accessories } from './modules/AccessoriesPage/Accessories';
import { ScrollToTop } from './styles/utils/ScrollToTop';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { Favorites } from './components/Favorites/Favorites';
import { CartItems } from './components/Cart/CartItems';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/menu';

  return (
    <div className="app">
      <Header />
      <ScrollToTop />

      <div className="layout">
        <Routes>
          <Route
            path="/"
            element={
              <main className="App">
                <HomePage />
              </main>
            }
          />
          <Route path="/phones">
            <Route index element={<Phones />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="/tablets">
            <Route index element={<Tablets />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="/accessories">
            <Route index element={<Accessories />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="/menu" element={<Menu />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<CartItems />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
};
