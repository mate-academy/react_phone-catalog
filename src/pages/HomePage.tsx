/* eslint-disable react/react-in-jsx-scope */
import { BrandNewModels } from '../components/BrandNewModels';
import { HotPrices } from '../components/HotPrices';
import { PicturesSlider } from '../components/PicturesSlider';
import { ShopByCategory } from '../components/ShopByCategory';

export const HomePage = () => {
  return (
    <>
      <div>
        <PicturesSlider />
        <BrandNewModels />
        <ShopByCategory />
        <HotPrices />
      </div>
    </>
  );
};
