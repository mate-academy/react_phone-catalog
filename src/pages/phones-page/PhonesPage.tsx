import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductsPage } from '../../components/ProductsPage';

export const PhonesPage: React.FC = () => {
  const { t } = useTranslation();

  return <ProductsPage productType="phones" title={t('mobilePhonesPage')} breadcrumbLabel={t('phones')} emptyMessage={t('noPhonesYet')} />;
};
