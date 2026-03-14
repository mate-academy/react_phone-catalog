import { Product } from '../../types/Product';
// import { Hero } from '../../modules/HomePage/components/Hero';
import { Hero } from '../../modules/HomePage/components/Hero';
import { BannerSlider } from '../BannerSlider';
import { NewModels } from '../NewModels';

type Props = {
  products: Product[];
};

export const Main: React.FC<Props> = ({ products }) => {
  return (
    <main>
      <Hero />
      <BannerSlider />
      <NewModels products={products} />
    </main>
  );
};
