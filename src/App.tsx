import './App.scss';
import React from 'react';
import { HomePage } from './pages/homePage/HomePage';
import { Catalog } from './pages/catalog/Catalog';
import { ProductDetails } from './pages/productDetails/ProductDetails';

export const App: React.FC = () => (
  <div className="App">
    <h1 className="visible">Product Catalog</h1>
    {/*<HomePage />*/}
    {/*<Catalog />*/}
    <ProductDetails />
  </div>
);
