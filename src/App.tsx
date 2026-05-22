/* eslint-disable max-len */
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './modules/homepage/components/footer/footer';
import { Header } from './modules/homepage/components/header/header';
import { HeroPage } from './modules/homepage/components/hero/hero';
import { Menu } from './modules/homepage/components/menu/menu';
import { PhonesPage } from './modules/catalogo/components/phonespage/phonespage';
import { TabletPage } from './modules/catalogo/components/tabletpage/tabletpage';
import { AccessoriesPage } from './modules/catalogo/components/accessories/accessories';
import { ProductDetailsPage } from './modules/productdetails/ProductDetailsPage/productdetails';
import { CartProvider } from './utils/Cartcontext/cartcontext';
import { Cart } from './modules/cart/cart';
import { Favorites } from './modules/favorites/favorites';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
/* eslint-enable max-len  */

export const App = () => {
  return (
    <>
      <CartProvider>
        <div className="App">
          <Header />
          <Menu />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HeroPage />} />
              <Route path="/phones">
                <Route index element={<PhonesPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="/tablets">
                <Route index element={<TabletPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="/accessories">
                <Route index element={<AccessoriesPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="/bag" element={<Cart />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </>
  );
};
