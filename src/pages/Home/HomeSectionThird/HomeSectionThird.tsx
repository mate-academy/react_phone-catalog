import React, { useContext } from 'react';

import './HomeSectionThird.module.scss';

import { SwiperModels } from '@/components/UI/SwiperModels';

import { ProductsSwiperContext } from '@/context/ProductsSwiperContext';

export const HomeSectionThird: React.FC = () => {
  const sectionName = 'Hot prices';
  const { filteredProductsByHotPrice } = useContext(ProductsSwiperContext);

  return (
    <SwiperModels
      sectionName={sectionName}
      filteredProducts={filteredProductsByHotPrice}
      isShowFullPrice={true}
    />
  );
};
