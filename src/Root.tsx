import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { BurgerMenu } from './shared/BurgerMenu';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { Cart } from './modules/Cart';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './shared/ProductDetailsPage/ProductDetailsPage';
import { Favorites } from './shared/Favorites';
import { PhoneCatalog } from './modules/Catalogs/PhoneCatalog';
import { TabletCatalog } from './modules/Catalogs/TabletCatalog';
import { AccessoryCatalog } from './modules/Catalogs/AccessoryCatalog';

// const HomeWithFooter = () => (
//   <>
//     <HomePage />
//     <Footer />
//   </>
// );

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<BurgerMenu />} />
        <Route path="phones" element={<PhoneCatalog />} />
        <Route path="tablets" element={<TabletCatalog />} />
        <Route path="accessories" element={<AccessoryCatalog />} />
        <Route path="cart" element={<Cart />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
