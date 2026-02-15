import listProduct from '../../../api/products.json';
import { DevicePage } from '../DevicePage/DevicePage';
import { useTranslation } from 'react-i18next';

export const Accessories = () => {
  const listAccessories = listProduct.filter(
    prod => prod.category === 'accessories',
  );
  const { t } = useTranslation();

  return (
    <DevicePage
      listProduct={listAccessories}
      titlePage={t('pageName.3')}
      pagePath={t('pageName.3')}
    />
  );
};
