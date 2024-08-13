import './App.module.scss';
import React from 'react';
import { Loader } from './components/Loader/Loader';
import { ProductSlider } from './components/ProductSlider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';

export const App: React.FC = () => {


  return (
    <div className="App">
      <h1>This website is under construction...</h1>
      <Header />
      <Breadcrumbs />
      <ProductSlider />
      <Footer />
      <Loader />
    </div>
  );
};
