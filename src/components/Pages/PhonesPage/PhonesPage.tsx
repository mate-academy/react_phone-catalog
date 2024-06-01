import React from 'react';
import { ProductPage } from '../ProductPage';
import { Category, PageName } from '../../../types';

export const PhonesPage = () => (
  <ProductPage category={Category.Phones} title={PageName.Phones} />
);
