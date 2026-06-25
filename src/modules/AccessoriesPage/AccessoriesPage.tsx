import React from 'react';
import { ProductsListPage } from '../ProductsListPage';
import productsData from '../../../public/api/products.json';
import { Product } from '../../types';

const accessories = (productsData as Product[]).filter(
  p => p.category === 'accessories',
);

export const AccessoriesPage: React.FC = () => (
  <ProductsListPage
    category="accessories"
    title="Accessories"
    data={accessories}
  />
);
