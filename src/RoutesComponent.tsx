import { Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from './components/Menu';
import { HomePage } from './components/HomePage';
import { Phones } from './components/Phones/Phones';
import phonesFromServer from './api/phones.json';
import tabletsFromServer from './api/tablets.json';
import accessoriesFromServer from './api/accessories.json';
import { ProductsTypes } from './types/ProductsTypes';
import { Favourites } from './components/Favourites';
import { Cart } from './components/Cart';
import { PageNotFound } from './components/PageNotFound';

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/menu" element={<Menu />} />
      <Route
        path="/phones/:phoneId?"
        element={
          <Phones
            products={phonesFromServer}
            productsType={ProductsTypes.Phones}
          />
        }
      />
      <Route
        path="/tablets/:tabletId?"
        element={
          <Phones
            products={tabletsFromServer}
            productsType={ProductsTypes.Tablets}
          />
        }
      />
      <Route
        path="/accessories/:accessoryId?"
        element={
          <Phones
            products={accessoriesFromServer}
            productsType={ProductsTypes.Accessories}
          />
        }
      />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
