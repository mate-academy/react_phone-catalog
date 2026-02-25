import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { GlobalStateProvider } from "./providers/GlobalStateProvider";
import { App } from "./App";
import React from "react";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Category } from "./types/types";
import { CatalogPage } from "./pages/CatalogPage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { CartPage } from "./pages/CartPage";
// import { Menu } from "./components/Menu";
import { ProductDetails } from "./pages/ProductDetailsPage";

export const routes = {
  home: "/",
  phones: "/phones",
  tablets: "/tablets",
  accessories: "/accessories",
  favorites: "/favorites",
  cart: "/cart",
  product: "/product/:productId",
  // menu: "/menu",
};

export const Root = () => (
  <Router>
    <GlobalStateProvider>
      <Routes>
        {/*<Route path={routes.menu} element={<Menu />} />*/}
        <Route path={routes.home} element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path={routes.phones}
            element={<CatalogPage category={Category.Phones} />}
          />
          <Route
            path={routes.tablets}
            element={<CatalogPage category={Category.Tablets} />}
          />
          <Route
            path={routes.accessories}
            element={<CatalogPage category={Category.Accessories} />}
          />

          <Route path={routes.product} element={<ProductDetails />}></Route>

          <Route path={routes.favorites} element={<FavouritesPage />} />
          <Route path={routes.cart} element={<CartPage />} />

          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </GlobalStateProvider>
  </Router>
);
