import React, { useContext } from 'react';
import './HomeSectionFirst.module.scss';
import { ProductsSwiperContext } from '@/context/ProductsSwiperContext';
import { SwiperModels } from '@/components/UI/SwiperModels';

export const HomeSectionFirst: React.FC = () => {
  const sectionName = 'Brand new models';
  const { filteredProductsByNewModels } = useContext(ProductsSwiperContext);

  return (
    <SwiperModels
      sectionName={sectionName}
      filteredProducts={filteredProductsByNewModels}
      isShowFullPrice={true}
    />
  );
};
