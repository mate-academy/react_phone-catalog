import { BrandNewModels } from '../components/BrandNewModels/BrandNewModels';
import { HotPrices } from '../components/HotPrices/HotPrices';
import { PicturesSlider } from '../components/PicturesSlider/PicturesSlider';

import { ShopByCategory } from '../components/ShopByCategory/ShopByCategory';

export const HomePage = () => {
  return (
    <>
      <h1 style={{ display: 'none' }}>Product Catalog</h1>
      <PicturesSlider />
      <BrandNewModels />
      <ShopByCategory />
      <HotPrices />
    </>
  );
};
