import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";

import App from "../App";

import { HomePage } from "../../modules/HomePage";
import { NotFoundPage } from "../../modules/NotFoundPage";
import { CategoryPage } from "../../modules/CategoryPage";
import { CartPage } from "../../modules/CartPage";

import { GuardCategory } from "./GuardCategory";
import { ProductDetailsPage } from "../../modules/ProductDetailsPage";
import { GuardDetails } from "./GuardDetails";
import { FavouritesPage } from "../../modules/FavoritesPage";

export const Root = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route element={<GuardCategory />}>
              <Route path=":categoryName">
                <Route index element={<CategoryPage />} />
                <Route element={<GuardDetails />}>
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
              </Route>
            </Route>

            <Route path="favourites" element={<FavouritesPage/>} />
            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
};
