import { Product } from '../../../../types/Product';
import { Hero } from '../Hero/Hero';
import { BannerSlider } from '../BannerSlider/BannerSlider';
import { NewModels } from '../NewModels/NewModels';
import { ShopByCategory } from '../ShopByCategory';

type Props = {
  products: Product[];
};

export const Main: React.FC<Props> = ({ products }) => {
  return (
    <main>
      <Hero />
      <BannerSlider />
      <NewModels products={products} />
      <ShopByCategory />
    </main>
  );
};
