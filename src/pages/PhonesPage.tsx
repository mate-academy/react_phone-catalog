import React from 'react';
import { ProductList } from '../components/ProductList/ProductList';
import { Filter } from '../components/Filter/Filter';
export const PhonesPage: React.FC = () => (
  <div className="section" id="phones">
    <div className="container">
      <h1 id="heading1">
        Mobile phones
      </h1>
      <label htmlFor="filter-select">Sort by:</label>
      <Filter id="filter-select" />

      <ProductList category="phones" />
    </div>
  </div>
);
