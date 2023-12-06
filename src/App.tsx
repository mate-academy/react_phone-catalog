import {
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { useState } from 'react';

import './App.scss';

import { HeaderOnPage } from './components/Header/HeaderOnPage';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './components/HomePage/Carusel/MainPage/HomePage';
import { PhonePage } from './components/PhonePage/PhonePage';
import { Product } from './helpers/Product';

import jsonProduct from './products.json';

import { TabletPage } from './components/TabletsPage/TablatesPage';
import { Accessories } from './components/Accessories/Accessories';
import { NotFound } from './components/NotFound/NotFound';
import { PhoneCriteria } from './components/PhoneCriteria/PhoneCriteria';
import { AddPage } from './components/AddPage/AddPage';
import { LikeProduct } from './components/LikeProducts/LikeProducts';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';

type Props = {
  likeProduct: Product[];
  addProduct: Product[];
};

const OutletPage: React.FC<Props> = ({ likeProduct, addProduct }) => {
  return (
    <div className="page">
      <HeaderOnPage likeProduct={likeProduct} addProduct={addProduct} />

      <Outlet />

      <Footer />
    </div>
  );
};

export const App = () => {
  const [products] = useState<Product[]>(() => {
    const storedProduct = localStorage.getItem('product');

    return storedProduct ? JSON.parse(storedProduct) : jsonProduct;
  });

  const [addProduct, setAddProduct] = useState<Product[]>(() => {
    const storedProduct = localStorage.getItem('chart');

    return storedProduct ? JSON.parse(storedProduct) : [];
  });

  const [likeProduct, setLikeProduct] = useState<Product[]>(() => {
    const storedProduct = localStorage.getItem('likeProduct');

    return storedProduct ? JSON.parse(storedProduct) : [];
  });

  const addProductToLike = (product: Product) => {
    const isLiked = likeProduct
      .some(likedProduct => likedProduct.phoneId === product.phoneId);

    if (isLiked) {
      const updatedLikeProduct = likeProduct
        .filter(likedProduct => likedProduct.phoneId !== product.phoneId);

      setLikeProduct(updatedLikeProduct);

      localStorage.setItem('likeProduct', JSON.stringify(updatedLikeProduct));
    } else {
      setLikeProduct([...likeProduct, product]);

      localStorage.setItem('likeProduct', JSON.stringify(
        [...likeProduct, product],
      ));
    }
  };

  const addProductToChart = (product: Product) => {
    const isAdd = addProduct.some(chart => chart.phoneId === product.phoneId);

    if (isAdd) {
      const updatedAddProduct = addProduct
        .filter(chart => chart.phoneId !== product.phoneId);

      setAddProduct(updatedAddProduct);

      localStorage.setItem('chart', JSON.stringify(updatedAddProduct));
    } else {
      setAddProduct([...addProduct, product]);

      localStorage.setItem('chart', JSON.stringify(
        [...addProduct, product],
      ));
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <OutletPage
            likeProduct={likeProduct}
            addProduct={addProduct}
          />
        )}
      >

        <Route
          path="menu"
          element={(
            <HeaderMenu />
          )}
        />
        <Route
          index
          element={(
            <HomePage
              products={products}
              onLikeClick={addProductToLike}
              likeProduct={likeProduct}
              addProduct={addProduct}
              onAddtoChart={addProductToChart}
            />
          )}
        />

        <Route
          path="phones"
          element={(
            <PhonePage
              products={products}
              onLikeClick={addProductToLike}
              likeProduct={likeProduct}
              addProduct={addProduct}
              onAddtoChart={addProductToChart}
            />
          )}
        />

        <Route
          path="tablets"
          element={(
            <TabletPage
              products={products}
              onLikeClick={addProductToLike}
              likeProduct={likeProduct}
              addProduct={addProduct}
              onAddtoChart={addProductToChart}
            />
          )}
        />

        <Route
          path="accessories"
          element={(
            <Accessories
              products={products}
              onLikeClick={addProductToLike}
              likeProduct={likeProduct}
              addProduct={addProduct}
              onAddtoChart={addProductToChart}
            />
          )}
        />

        <Route
          path="favourites"
          element={(
            <LikeProduct
              likePr={likeProduct}
              onLikeClick={addProductToLike}
              addProduct={addProduct}
              onAddtoChart={addProductToChart}
            />
          )}
        />

        <Route
          path="addPage"
          element={(
            <AddPage
              addProduct={addProduct}
              onAddtoChart={addProductToChart}
            />
          )}
        />

        <Route
          path="/phones/:productId"
          element={(
            <PhoneCriteria
              products={products}
              onLikeClick={addProductToLike}
              likeProduct={likeProduct}
              addProduct={addProduct}
              onAddtoChart={addProductToChart}
            />
          )}
        />

        <Route path="*" element={<NotFound />} />
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
