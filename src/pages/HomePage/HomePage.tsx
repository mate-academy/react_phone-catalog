import React from 'react';
import { PromoSlider } from '../../components/PromoSlider';
import { HotPrice } from '../../components/HotPrice';
import { ShopByCategory } from '../../components/ShopByCategory';
import { BrandNewModels } from '../../components/BrandNewModels';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <main className="home-page">
      <div className="container">
        <div className="home-page__content">
          <PromoSlider />

          <HotPrice />

          <ShopByCategory />

          <BrandNewModels />
        </div>
      </div>
    </main>
  );
};
