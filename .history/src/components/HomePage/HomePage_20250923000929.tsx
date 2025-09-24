import { PicturesSlider } from './PicturesSlider';
import { ProductsSlider } from './ProductsSlider';
import { HotPrices } from './HotPrice';
import { ShopByCategory } from './ShopByCategory';

export const HomePage = () => {
  return (
    <div>
      <PicturesSlider />
      <ProductsSlider />
      <ShopByCategory />
      <HotPrices />
    </div>
  );
};
