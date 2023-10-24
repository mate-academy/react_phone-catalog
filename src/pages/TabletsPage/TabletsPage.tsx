import React from 'react';
import { NamesByHeader } from '../../types/NamesByHeader';
import { NamesBySections } from '../../types/NamesBySections';
import { NamesByCategories } from '../../types/NamesByCategories';
import { ProductPage } from '../ProductPage/ProductPage';

export const TabletsPage: React.FC = () => (
  <ProductPage
    productCategiryName={NamesByCategories.Tablets}
    productHaederName={NamesByHeader.Tablets}
    productSectionName={NamesBySections.Tablets}
  />
);
