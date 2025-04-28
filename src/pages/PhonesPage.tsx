import React from 'react';
import { ProductList } from '../components/ProductList/ProductList';
import { Filter } from '../components/Filter/Filter';
export const PhonesPage: React.FC = () => (
  <div className="section">
    <div className="container">
      <h1 className="title">Mobile Phones</h1>
      <label htmlFor="filter-select">Sort by:</label>
<Filter id="filter-select" />

      <ProductList category="phones" />
    </div>
  </div>
);
