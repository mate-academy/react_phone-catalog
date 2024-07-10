import './App.module.scss';
import React from 'react';
import { Loader } from './components/Loader/Loader';
import { ProductCard } from './components/ProductCard/ProductCard';
import { ProductSlider } from './components/ProductSlider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';

export const App: React.FC = () => (
  <div className="App">
    <Header />
    <Breadcrumbs />
    <ProductSlider />
    <ProductCard />
    <Footer />
    <Loader />
  </div>
);
