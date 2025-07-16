import { useEffect } from 'react';
import { BrandNewModels } from './components/BrandNewModels';
import { HeroBanner } from './components/HeroBanner';
import { HotPrices } from './components/HotPrices';
import { ShopByCategory } from './components/ShopByCategory';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroBanner />
      <BrandNewModels />
      <ShopByCategory />
      <HotPrices />
    </div>
  );
};
