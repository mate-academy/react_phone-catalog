import { BrandNewModels } from './components/BrandNewModels';
import { HotPrices } from './components/HotPrices';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';

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
