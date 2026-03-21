import React from 'react';
import { ProductsListPage } from '../ProductsListPage';
import productsData from '../../../public/api/products.json';
import { Product } from '../../types';

const phones = (productsData as Product[]).filter(p => p.category === 'phones');

export const PhonesPage: React.FC = () => (
  <ProductsListPage category="phones" title="Mobile phones" data={phones} />
);
