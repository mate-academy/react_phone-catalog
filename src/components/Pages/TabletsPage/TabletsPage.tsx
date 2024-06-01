import React from 'react';
import { ProductPage } from '../ProductPage';
import { Category, PageName } from '../../../types';

export const TabletsPage = () => (
  <ProductPage category={Category.Tablets} title={PageName.Tablets} />
);
