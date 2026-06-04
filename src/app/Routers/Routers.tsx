import { ScrollToTop } from "@/components/ScrollToTop";
import { FavouritesPage } from "@/modules/FavouritesPage";
import { HomePage } from "@/modules/HomePage";
import { NotFoundPage } from "@/modules/NotFoundPage";
import { ProductDetailsPage } from "@/modules/ProductDetailsPage";
import { ProductsPage } from "@/modules/ProductsPage";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { CartPage } from "@/modules/CartPage";


export const Routers = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="favourites" element={<FavouritesPage></FavouritesPage>} />
          <Route path="cart" element={<CartPage></CartPage>} />

          <Route path="phones">
            <Route index element={<ProductsPage key={'phones'} category="phones" />} />
            <Route path=":productId" element={<ProductDetailsPage category="phones" />} />
          </Route>

          <Route path="tablets">
            <Route index element={<ProductsPage key={'tablets'} category="tablets" />} />
            <Route path=":productId" element={<ProductDetailsPage category="tablets" />} />
          </Route>

          <Route path="accessories">
            <Route index element={<ProductsPage key={'accessories'} category="accessories" />} />
            <Route path=":productId" element={<ProductDetailsPage category="accessories" />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
