import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { FavoriteProvider } from "./api/context/FavoriteContext";
import App from "./App";
import { PhonesPage } from "./pages/PhonesPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { CardProvider } from "./api/context/CardContext";
import { CardPage } from "./pages/CardPage";
import { TabletsPage } from "./pages/TabletsPage";
import { AccessoriesPage } from "./pages/AccessoriesPage";
import { HomePage } from "./pages/HomePage";

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route
        path="/"
        element={
          <CardProvider>
            <FavoriteProvider>
              <App />
            </FavoriteProvider>
          </CardProvider>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<TabletsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<AccessoriesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="favorites">
          <Route index element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="card">
          <Route index element={<CardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);
