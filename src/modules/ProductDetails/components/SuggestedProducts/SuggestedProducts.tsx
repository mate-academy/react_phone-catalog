import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ProductsSlider } from '../../../ProductsSlider';

interface SuggestedProductsProps {
  category: string;
}

export const SuggestedProducts: React.FC<SuggestedProductsProps> = ({
  category,
}) => {
  const { productId } = useParams<{ productId: string }>();

  const { t } = useTranslation();

  return (
    <ProductsSlider
      title={t('title.mayAlsoLike')}
      category={category}
      excludeItemId={productId || ''}
      limit={12}
      preset="random"
    />
  );
};
