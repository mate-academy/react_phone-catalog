import type { HeroSliderData } from '@/components/organisms/HeroSlider';
import type { ProductsSlidesData } from '@/components/organisms/Product/ProductsSlider';
import type { ShopByCategoryData } from '@/components/organisms/ShopByCategory';

export type Data = {
  heroSlider: HeroSliderData;
  brandNewModels: ProductsSlidesData;
  shopByCategory: ShopByCategoryData;
  hotPrices: ProductsSlidesData;
};
