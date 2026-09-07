import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HomePage } from './modules/home-page';
import { ProductPage } from './modules/product-page';
import { ProductDetailsPage } from './modules/product-details-page';
import { NotFoundPage } from './modules/not-found-page';
import { CartPage } from './modules/cart-page';
import { FavoritesPage } from './modules/favorites-page';

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="phones" element={<ProductPage />}></Route>
            <Route path="tablets" element={<ProductPage />}></Route>
            <Route path="accessories" element={<ProductPage />}></Route>
            <Route
              path="/phones/:productId"
              element={<ProductDetailsPage />}
            ></Route>
            <Route
              path="/tablets/:productId"
              element={<ProductDetailsPage />}
            ></Route>
            <Route
              path="/accessories/:productId"
              element={<ProductDetailsPage />}
            ></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/favorites" element={<FavoritesPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};
