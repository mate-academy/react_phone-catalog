import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PageNotFound } from './modules/components/PageNotFound/PageNotFound';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetails } from './modules/ProductDetails/ProductDetails';
import { FavouritesProducts } from './modules/components/FavouritesProducts';
import { CartPage } from './modules/CartPage/CartPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/phones/:id" element={<ProductDetails />} />

        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/tablets/:id" element={<ProductDetails />} />

        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/accessories/:id" element={<ProductDetails />} />

        <Route path="/favourites" element={<FavouritesProducts />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
