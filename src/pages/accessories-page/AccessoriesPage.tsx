import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductsPage } from '../../components/ProductsPage';

export const AccessoriesPage: React.FC = () => {
  const { t } = useTranslation();

  return <ProductsPage productType="accessories" title={t('accessoriesPage')} breadcrumbLabel={t('accessories')} emptyMessage={t('noAccessoriesYet')} />;
};
