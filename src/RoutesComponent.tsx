import { Route, Routes } from 'react-router-dom';
import { Menu } from './components/Menu';
import { HomePage } from './components/HomePage';
import { Phones } from './components/Phones/Phones';
import phonesFromServer from './api/phones.json';
import tabletsFromServer from './api/tablets.json';
import accessoriesFromServer from './api/accessories.json';
import { ProductsTypes } from './types/ProductsTypes';

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/menu" element={<Menu />} />
      <Route path="/" element={<HomePage />} />
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
    </Routes>
  );
};