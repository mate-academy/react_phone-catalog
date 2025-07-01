import React, { useContext } from 'react';
import { ProductsSwiperContext } from '@/context/ProductsSwiperContext';
import { SwiperModels } from '@/components/UI/SwiperModels';
import { useTranslation } from 'react-i18next';

export const ProductDetailsFirstSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionName = t('swiper.youMayAlsoLike');
  const { filteredProductsByRandom } = useContext(ProductsSwiperContext);

  return (
    <SwiperModels
      sectionName={sectionName}
      filteredProducts={filteredProductsByRandom}
      isShowFullPrice={true}
    />
  );
};
