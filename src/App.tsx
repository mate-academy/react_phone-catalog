import './App.module.scss';
import React from 'react';
import { Loader } from './components/Loader/Loader';
import { ProductCard } from './components/ProductCard/ProductCard';
import { ProductSlider } from './components/ProductSlider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Pagination } from './components/Pagination';
/* import { ProductList } from './components/ProductList'; */


export const App: React.FC = () => {


  return (
    <div className="App">
      <h1>This website is under construction...</h1>
      <Header />
      <Breadcrumbs />
      <ProductSlider />
      <ProductCard productId="apple-iphone-7-32gb-rosegold" />
      {/* <ProductList /> */}
      <Pagination />
      <Footer />
      <Loader />
    </div>
  );
};
