import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../modules/HomePage/HomePage';
import { NotFoundPage } from '../modules/NotFoundPage/NotFoundPage';
import { Cart } from '../modules/Cart';
import { PhoneCatalog } from '../modules/Catalogs/PhoneCatalog';
import { TabletCatalog } from '../modules/Catalogs/TabletCatalog';
import { AccessoryCatalog } from '../modules/Catalogs/AccessoryCatalog';
import ScrollToTop from '../shared/ScrollToTop/ScrollToTop';
import { Favorites } from '../modules/Favorites';
import { BurgerMenu } from '../modules/BurgerMenu';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
import { MyProvider } from '../Context/ProductContexts';

export const Root = () => (
  <Router>
    <MyProvider>
      <ScrollToTop />
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
    </MyProvider>
  </Router>
);
