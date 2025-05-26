import React, { useContext } from 'react';
import { ProductsSwiperContext } from '@/context/ProductsSwiperContext';
import { SwiperModels } from '@/components/UI/SwiperModels';

export const ProductDetailsFirstSection: React.FC = () => {
  const sectionName = 'You may also like';
  const { filteredProductsByRandom } = useContext(ProductsSwiperContext);

  return (
    <SwiperModels
      sectionName={sectionName}
      filteredProducts={filteredProductsByRandom}
      isShowFullPrice={true}
    />
  );
};
