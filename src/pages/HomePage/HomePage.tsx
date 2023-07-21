import { FC } from 'react';
import { Product } from '../../types/Product';
import { BannerSlider } from '../../components/BannerSlider';
import { HotPrices } from '../../components/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory';
import { BrandNew } from '../../components/BrandNew';

type Props = {
  products: Product[],
};

export const HomePage: FC<Props> = ({ products }) => {
  return (
    <>
      <BannerSlider />
      <HotPrices products={products} />
      <ShopByCategory products={products} />
      <BrandNew products={products} />
    </>
  );
};
