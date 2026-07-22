import React from 'react';
import { ProductsPage } from '@modules/ProductsPage';
import { CATEGORY_CONFIG } from '@shared/constants/categoryConfig';
import { Container } from '@shared/components/Container';

export const TabletsPage: React.FC = () => (
  <Container>
    <ProductsPage
      currentCategory="tablets"
      title={CATEGORY_CONFIG.tablets.title}
      breadcrumb={CATEGORY_CONFIG.tablets.breadcrumb}
    />
  </Container>
);
