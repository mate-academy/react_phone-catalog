import React from 'react';
import { NamesByHeader } from '../../types/NamesByHeader';
import { NamesBySections } from '../../types/NamesBySections';
import { NamesByCategories } from '../../types/NamesByCategories';
import { ProductPage } from '../ProductPage/ProductPage';

export const PhonesPage: React.FC = () => (
  <ProductPage
    productCategiryName={NamesByCategories.Phones}
    productHaederName={NamesByHeader.Phones}
    productSectionName={NamesBySections.Phones}
  />
);
