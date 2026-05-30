import React, { useContext } from 'react';
import './HomeSectionFirst.module.scss';
import { ProductsSwiperContext } from '@/context/ProductsSwiperContext';
import { SwiperModels } from '@/components/UI/SwiperModels/SwiperModels';
import { useTranslation } from 'react-i18next';

export const HomeSectionFirst: React.FC = () => {
  const { t } = useTranslation();
  const sectionName = t(`home.newModels`);
  const { filteredProductsByNewModels } = useContext(ProductsSwiperContext);

  return (
    <SwiperModels
      sectionName={sectionName}
      filteredProducts={filteredProductsByNewModels}
      isShowFullPrice={true}
    />
  );
};
