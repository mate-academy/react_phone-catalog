import React, { useContext } from 'react';
import { CatalogContext } from '../../CatalogContext';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { useUnique } from '../../utils/useUnique';

export const BrandNewSlider: React.FC = () => {
  const { brandNewModels } = useContext(CatalogContext);
  const modelForShow = [...useUnique(brandNewModels)];

  return <ProductSlider models={modelForShow} sectionName={'brand-new'} />;
};
