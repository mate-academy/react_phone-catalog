import React from 'react';
import { ShowcaseBlock } from './ShowcaseBlock';
import { Carousel } from './Carousel';
import { Categories } from './Categories';

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
