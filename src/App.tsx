import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Product } from './types/Product';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const App: React.FC = () => {
  // const cartItemsFromLocalStorage = localStorage.getItem('cartItems');
  // const initialItems = cartItemsFromLocalStorage
  //   ? JSON.parse(cartItemsFromLocalStorage)
  //   : [];

  // const favouritesFromLocalStorage = localStorage.getItem('favourites');
  // const initialFavourites: Product[] = favouritesFromLocalStorage
  //   ? JSON.parse(favouritesFromLocalStorage)
  //   : [];

  const [products, setProducts] = useState<Product[]>([]);
  // const [cartItems, setCartItems] = useState<Product[]>(initialItems);
  // const [favourites, setFavourites] = useState<Product[]>(initialFavourites);

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(setProducts);
  }, []);

  // const deleteProductFromCart = (product: Product) => {
  //   setCartItems(cartItems.filter(item => item.id !== product.id));
  // };

  // useEffect(() => {
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // }, [cartItems]);

  // useEffect(() => {
  //   localStorage.setItem('favourites', JSON.stringify(favourites));
  // }, [favourites]);

  // const addProductToCart = (product: Product) => {
  //   if (!cartItems.find(item => item.id === product.id)) {
  //     return setCartItems([...cartItems, product]);
  //   }

  //   return setCartItems(cartItems.filter(item => item.id !== product.id));
  // };

  // const addProductToFavourites = (product: Product) => {
  //   if (!favourites.find(item => item.id === product.id)) {
  //     return setFavourites([...favourites, product]);
  //   }

  //   return setFavourites(favourites.filter(item => item.id !== product.id));
  // };

  const phones = products.filter(product => product.type === 'phone');
  const tablets = products.filter(product => product.type === 'tablet');
  const accessories = products.filter(product => product.type === 'accessory');

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route
            index
            // eslint-disable-next-line max-len
            element={<HomePage products={products} />}
          />
          <Route
            path=":productId"
            // eslint-disable-next-line max-len
            element={<ProductDetailsPage products={products} />}
          />
        </Route>

        <Route path="phones">
          <Route
            index
            // eslint-disable-next-line max-len
            element={<PhonesPage phones={phones} />}
          />
          <Route
            path=":productId"
            // eslint-disable-next-line max-len
            element={<ProductDetailsPage products={phones} />}
          />
        </Route>

        <Route path="tablets">
          <Route
            index
            // eslint-disable-next-line max-len
            element={<TabletsPage tablets={tablets} />}
          />
          <Route
            path=":productId"
            // eslint-disable-next-line max-len
            element={<ProductDetailsPage products={tablets} />}
          />
        </Route>

        <Route path="accessories">
          <Route
            index
            // eslint-disable-next-line max-len
            element={<AccessoriesPage accessories={accessories} />}
          />
          <Route
            path=":productId"
            // eslint-disable-next-line max-len
            element={<ProductDetailsPage products={accessories} />}
          />
        </Route>

        <Route
          path="favourites"
          // eslint-disable-next-line max-len
          element={<FavouritesPage />}
        />

        <Route
          path="shoppingBag"
          // eslint-disable-next-line max-len
          element={<CartPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
