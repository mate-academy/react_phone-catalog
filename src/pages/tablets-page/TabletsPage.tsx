import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductsPage } from '../../components/ProductsPage';

export const TabletsPage: React.FC = () => {
  const { t } = useTranslation();

  return <ProductsPage productType="tablets" title={t('tabletsPage')} breadcrumbLabel={t('tablets')} emptyMessage={t('noTabletsYet')} />;
};
