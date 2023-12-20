/* eslint-disable max-len */
import './HomePage.scss';

import { BannerSlider } from '../../components/sliders/BannerSlider/BannerSlider';
import { ProductSlider } from '../../components/sliders/ProductSlider/ProductSlider';
import { Category } from '../../components/Category/Category';
import { Product } from '../../types/Products';

type Props = {
  products: Product[]
};

export const HomePage: React.FC<Props> = ({ products }) => {
  return (
    <div className="container">
      <BannerSlider />
      <ProductSlider products={products} />
      <Category />
      <ProductSlider products={products} />
    </div>
  );
};
