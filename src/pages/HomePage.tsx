import React from 'react';
import { ShowcaseBlock } from '../components/ShowcaseBlock/ShowcaseBlock';
import { Carousel } from '../components/Carousel/Carousel';
import { Categories } from '../components/Categories/Categories';

export const HomePage = () => {
  return (
    <div className="container">
      <h1 className="visually-hidden">React Products Catalog</h1>
      <section className="section">
        <Carousel />
      </section>
      <section className="section">
        <ShowcaseBlock title="Hot prices" />
      </section>
      <section className="section">
        <Categories />
      </section>
      <section className="section">
        <ShowcaseBlock title="Brand new models" />
      </section>
    </div>
  );
};
