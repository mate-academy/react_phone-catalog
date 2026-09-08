import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Frame } from './components/Frame';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import phones from '../public/api/phones.json';
import tablets from '../public/api/tablets.json';
import accessories from '../public/api/accessories.json';
import products from '../public/api/products.json';
import { ProductPage } from './modules/ProductPage';
import { useContext } from 'react';
import { AddToFavContext } from './contexts/AddToFavContext';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage/CartPage';

export const App = () => {
  const phonesForCat = products.filter(
    product => product.category === 'phones',
  );
  const tabletsForCat = products.filter(
    product => product.category === 'tablets',
  );
  const accessoriesForCat = products.filter(
    product => product.category === 'accessories',
  );

  const { fav } = useContext(AddToFavContext);

  return (
    <Routes>
      <Route path="/" element={<Frame />}>
        <Route index element={<HomePage products={products} />} />
        <Route path="phones">
          <Route
            index
            element={
              <ProductsPage products={phonesForCat} title="Mobile phones" />
            }
          />
          <Route path=":product" element={<ProductPage products={phones} />} />
        </Route>

        <Route path="tablets">
          <Route
            index
            element={<ProductsPage products={tabletsForCat} title="Tablets" />}
          />
          <Route path=":product" element={<ProductPage products={tablets} />} />
        </Route>
        <Route path="accessories">
          <Route
            index
            element={
              <ProductsPage products={accessoriesForCat} title="Accessories" />
            }
          />
          <Route
            path=":product"
            element={<ProductPage products={accessories} />}
          />
        </Route>
        <Route
          path="favourites"
          index
          element={<ProductsPage products={fav} title="Favourites" />}
        />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
