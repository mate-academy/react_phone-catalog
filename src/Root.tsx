import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./Pages/HomePage";
import { PhonesPage } from "./Pages/PhonesPage";
import { TabletsPage } from "./Pages/TabletsPage";
import { AccessoriesPage } from "./Pages/AccessoriesPage";
import { ProductDetailsPage } from "./Pages/ProductDetailsPage";
import { ScrollToTop } from "./shared/components/utils/ScrollToTop";
import { PageNotFound } from "./Pages/PageNotFound";
import { CartPage } from "./Pages/CartPage";
import { FavoritesPage } from "./Pages/FavoritesPage";

export const Root = () => (
  <Router>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="product/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
