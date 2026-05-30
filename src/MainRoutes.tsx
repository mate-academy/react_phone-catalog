import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './component/HomePage';
import { ProductPage } from './component/PageOfProducts';
import { MainInfo } from './component/MainInfoOfProduct';
import { Favorites } from './component/Favorites/Favorites';
import { Cart } from './component/CartForBuying/Cart';
import { PageNotfound } from './component/PageNotFound/PageNotfound';

export const MainRoutes = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
        <Route path="phones" element={<ProductPage pageName="phone" />}>
          <Route
            path=":phoneId"
            element={<MainInfo typeOfProduct={'phones'} />}
          />
        </Route>

        <Route path="tablets" element={<ProductPage pageName="tablets" />}>
          <Route
            path=":phoneId"
            element={<MainInfo typeOfProduct={'tablets'} />}
          />
        </Route>
        <Route
          path="accessories"
          element={<ProductPage pageName="accessories" />}
        >
          <Route
            path=":phoneId"
            element={<MainInfo typeOfProduct={'accessories'} />}
          />
        </Route>
        <Route path="*" element={<PageNotfound />} />
      </Route>
    </Routes>
  </HashRouter>
);
