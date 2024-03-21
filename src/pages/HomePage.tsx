import React from 'react';

import { BannerSlider } from '../components/BannerSlider';
import { Categories } from '../components/Categories';
import { ProductsSection } from '../components/ProductsSection';

import { getBrandNewProducts, getHotPriceProducts } from '../utils/filters';

export const HomePage: React.FC = () => {
  return (
    <div className="Main__homePage">
      <BannerSlider />

      <ProductsSection
        getSectionProducts={getHotPriceProducts}
        title="Hot Prices"
        sectionName="hotPrices"
      />

      <Categories />

      <ProductsSection
        getSectionProducts={getBrandNewProducts}
        title="Brand new models"
        sectionName="newModels"
      />
    </div>
  );
};
