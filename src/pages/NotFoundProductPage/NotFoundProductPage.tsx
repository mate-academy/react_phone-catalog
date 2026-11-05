import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { NotFoundTemplate } from '@/components/templates/NotFoundTemplate';

import productNotFoundImage from '/img/product-not-found.webp';

export const NotFoundProductPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('productNotFound')} | NICE GADGETS`;
  }, [t]);

  return (
    <NotFoundTemplate
      title="Product Not Found"
      image={productNotFoundImage}
    />
  );
};
