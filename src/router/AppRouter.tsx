import { Routes, Route } from "react-router-dom";
import { HomePage } from "../modules/HomePage/HomePage";
import { PhonesPage } from "../modules/PhonesPage/PhonesPage";
import { TabletsPage } from "../modules/TabletsPage/TabletsPage";
import { AccessoriesPage } from "../modules/AccessoriesPage/AccessoriesPage";
import { CartPage } from "../modules/CartPage/CartPage";
import { FavoritesPage } from "../modules/FavoritesPage/FavoritesPage";
import { ProductDetailsPage } from "../modules/ProductDetailsPage/ProductDetailsPage";
import { NotFoundPage } from "../modules/NotFoundPage/NotFoundPage";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/phones" element={<PhonesPage />} />
    <Route path="/tablets" element={<TabletsPage />} />
    <Route path="/accessories" element={<AccessoriesPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="/product/:itemId" element={<ProductDetailsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

