import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import './App.scss';
import { Main } from './components/Main/Main';
import { getProductsFromServer } from './helpers/api';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getNewProducts = () => {
    getProductsFromServer()
      .then(data => setProducts(data));
  };

  const getMostExpensiveBrand = () => {
    const filteredBrand = products.filter(item => item.discount === 0);

    return filteredBrand.sort((a: { price: number}, b: { price: number}) => (
      b.price - a.price
    ));
  };

  useEffect(() => {
    getNewProducts();
  }, []);

  const productsHot = products.filter(item => item.discount !== 0);
  const productsBrand = getMostExpensiveBrand();

  return (
    <div className="App">
      <Header />
      <Main
        productsBrand={productsBrand}
        productsHot={productsHot}
        fullProductList={products}
      />
      <Footer />
    </div>
  );
};

export default App;
