import React from 'react';
import { NamesByHeader } from '../../types/NamesByHeader';
import { NamesBySections } from '../../types/NamesBySections';
import { NamesByCategories } from '../../types/NamesByCategories';
import { ProductPage } from '../ProductPage/ProductPage';

export const AccessoriesPage: React.FC = () => (
  <ProductPage
    productCategiryName={NamesByCategories.Accessories}
    productHaederName={NamesByHeader.Accessories}
    productSectionName={NamesBySections.Accessories}
  />
);
