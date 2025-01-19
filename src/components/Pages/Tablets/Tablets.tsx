import React from 'react';
import listProduct from '../../../api/products.json';
import { DevicePage } from '../DevicePage/DevicePage';
import { useTranslation } from 'react-i18next';
export const Tablets = () => {
  const listPhones = listProduct.filter(prod => prod.category === 'tablets');
  const { t } = useTranslation();

  return (
    <DevicePage
      listProduct={listPhones}
      titlePage={t('pageName.2')}
      pagePath={t('pageName.2')}
    />
  );
};
