import './App.scss';
import React from 'react';
import { HomePage } from './pages/homePage/HomePage';
import { Catalog } from './pages/catalogPage/Catalog';
import { ProductDetails } from './pages/productDetailsPage/ProductDetails';
import { FavouritesPage } from './pages/favouritesPage/FavouritesPage';
import { CartPage } from './pages/cartPage/CartPage';

export const App: React.FC = () => (
  <div className="App">
    <h1 className="visible">Product Catalog</h1>
    <HomePage />
    {/*<Catalog />*/}
    {/*<ProductDetails />*/}
    {/*<FavouritesPage />*/}
    {/*<CartPage />*/}
  </div>
);
