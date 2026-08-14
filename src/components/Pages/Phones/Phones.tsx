import React from 'react';
import listProduct from '../../../api/products.json';
import { DevicePage } from '../DevicePage/DevicePage';
import { useTranslation } from 'react-i18next';

export const Phones = () => {
  const listPhones = listProduct.filter(prod => prod.category === 'phones');
  const { t } = useTranslation();

  return (
    <DevicePage
      listProduct={listPhones}
      titlePage={t('pageName.1')}
      pagePath={t('pageName.4')}
    />
  );
};
