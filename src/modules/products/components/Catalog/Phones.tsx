import { useTranslation } from 'react-i18next';

import { PRODUCT_CATEGORIES } from '@/modules/products/constants';

import { Catalog } from './Catalog';

export const Phones = () => {
  const { t } = useTranslation();

  return (
    <Catalog
      categoryName={t('mobilePhones')}
      category={PRODUCT_CATEGORIES.phones}
    />
  );
};
