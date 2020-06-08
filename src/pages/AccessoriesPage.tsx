import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Heading } from '../components/Heading/Heading';

export const AccessoriesPage = () => {
  return (
    <div className="container">
      <section className="section">
        <Breadcrumbs />
        <Heading title="Accessories" />
        <h3
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            marginTop: '30px',
          }}
        >
          Sorry, no products in this category yet
        </h3>
        <img
          src="./img/empty-cart.png"
          alt="Empty cart"
          style={{
            display: 'block',
            maxWidth: '200px',
            margin: '0 auto',
          }}
        />
      </section>
    </div>
  );
};
