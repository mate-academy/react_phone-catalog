import { Product } from '../../types/Products';
import { HotPrices } from '../HotPrices/HotPrices';
import { MainSlider } from '../MainSlider/MainSlider';

type Props = {
  products: Product[],
};

export const Homepage: React.FC<Props> = ({ products }) => {
  return (
    <main className="homepage">
      <MainSlider />
      <HotPrices products={products} />
    </main>
  );
};
