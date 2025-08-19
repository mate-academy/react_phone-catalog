import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Page/HomePage/HomePage';
import { PhonesPage } from './Page/PhonesPage';
import { ProductDetails } from './ProductDetails/ProductDetails';
import { TabletsPage } from './Page/TabletsPage';
import { AccessoriesPage } from './Page/AccessoriesPage';
import { FavouritesProducts } from './component/FavouritesProducts';
import { CartPage } from './component/CartPage';

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
      </Route>
    </Routes>
  );
};
