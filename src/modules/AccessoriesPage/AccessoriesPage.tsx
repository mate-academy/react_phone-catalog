import React from 'react';
import { ProductsPage } from '@modules/ProductsPage';
import { CATEGORY_CONFIG } from '@shared/constants/categoryConfig';
import { Container } from '@shared/components/Container';

export const AccessoriesPage: React.FC = () => (
  <Container>
    <ProductsPage
      currentCategory="accessories"
      title={CATEGORY_CONFIG.accessories.title}
      breadcrumb={CATEGORY_CONFIG.accessories.breadcrumb}
    />
  </Container>
);
