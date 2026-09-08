import { Home } from './home/Home';
import { NewModels } from './newModels/NewModels';
import { Category } from './Category/Category';
import { HotPrices } from './HotPrices/HotPrices';
import { Product } from '../../../src/types/Product';

type Props = {
  products: Product[];
};

export const HomePage: React.FC<Props> = ({ products }) => {
  return (
    <>
      <Home />
      <NewModels products={products} />
      <Category />
      <HotPrices products={products} />
    </>
  );
};
