import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProductsSlider } from '../../../ProductsSlider';
import { ProductsPresetType } from '../../../../types/sorting.types';

export const NewModels: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ProductsSlider
      title={t('title.newModels')}
      productsPreset={ProductsPresetType.Newest}
    />
  );
};
