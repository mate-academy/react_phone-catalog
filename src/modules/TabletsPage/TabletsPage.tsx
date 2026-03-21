import React from 'react';
import { ProductsListPage } from '../ProductsListPage';
import productsData from '../../../public/api/products.json';
import { Product } from '../../types';

const tablets = (productsData as Product[]).filter(
  p => p.category === 'tablets',
);

export const TabletsPage: React.FC = () => (
  <ProductsListPage category="tablets" title="Tablets" data={tablets} />
);
