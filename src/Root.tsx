import {
  HashRouter as Router,
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
import { ProductDetails } from "./pages/ProductDetailsPage";
import { AppSettingsProvider } from "./providers/AppSettingsProvider";

export const routes = {
  home: "/",
  phones: "/phones",
  tablets: "/tablets",
  accessories: "/accessories",
  favorites: "/favorites",
  cart: "/cart",
  product: "/product/:productId",
};

export const Root = () => (
  <Router>
    <AppSettingsProvider>
      <GlobalStateProvider>
        <Routes>
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
    </AppSettingsProvider>
  </Router>
);
