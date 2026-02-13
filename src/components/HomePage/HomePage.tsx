import { HotPriceSlider } from './HotPriceSlider';
import { PicturesSlider } from './PicturesSlider';
import { ProductsSlider } from './ProductsSlider';
import { ShopCategory } from './ShopCategory';
import './HomePage.scss';

export const HomePage = () => (
  <main>
    <PicturesSlider></PicturesSlider>
    <ProductsSlider></ProductsSlider>
    <ShopCategory></ShopCategory>
    <HotPriceSlider></HotPriceSlider>
  </main>
);
