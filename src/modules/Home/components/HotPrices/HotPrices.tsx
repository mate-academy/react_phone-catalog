import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProductsSlider } from '../../../ProductsSlider';
import { ProductsPresetType } from '../../../../types/sorting.types';

export const HotPrices: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ProductsSlider
      title={t('title.hotPrices')}
      productsPreset={ProductsPresetType.HotPrices}
    />
  );
};
