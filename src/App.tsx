import './App.module.scss';
import React from 'react';
import { Loader } from './components/Loader/Loader';
import { ProductCard } from './components/ProductCard/ProductCard';
import { ProductSlider } from './components/ProductSlider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => (
  <div className="App">
    <h1>This website is under construction...</h1>
    <Header />
    <Breadcrumbs />
    <ProductSlider />
    <ProductCard />
    <Pagination />
    <Footer />
    <Loader />
  </div>
);
