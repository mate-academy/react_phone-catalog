import React, { useContext } from 'react';

import './HomeSectionThird.module.scss';

import { SwiperModels } from '@/components/UI/SwiperModels';

import { ProductsSwiperContext } from '@/context/ProductsSwiperContext';
import { useTranslation } from 'react-i18next';

export const HomeSectionThird: React.FC = () => {
  const { t } = useTranslation();
  const sectionName = t(`home.hotPrices`);
  const { filteredProductsByHotPrice } = useContext(ProductsSwiperContext);

  return (
    <SwiperModels
      sectionName={sectionName}
      filteredProducts={filteredProductsByHotPrice}
      isShowFullPrice={true}
    />
  );
};
