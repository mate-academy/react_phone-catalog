import React from 'react';
import './Catalog.scss';
import { ProductCard } from '../ProductCard';

export const Catalog = () => {
  return (
    <section className="catalog">
      <div className="container catalog__container">
        <h1 className="catalog__title"></h1>
        <div className="catalog__counter">95 models</div>
        <div className="catalog__dropdown">
          <div className="catalog__sortby">Sort by</div>
          <div className="catalog__pages">Items on page</div>
        </div>
        <div className="catalog__wrapper">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <div className="catalog__pagination"></div>
      </div>
    </section>
  );
};
