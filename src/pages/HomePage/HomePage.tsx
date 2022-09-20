import { Category } from '../../components/Category';
import { HotPrice } from '../../components/HotPrice';
import { NewModels } from '../../components/NewModels';
import { Novelties } from '../../components/Novelties';
import { Phone } from '../../types/Phone';

type Props = {
  products: Phone[]
};

export const HomePage: React.FC<Props> = ({ products }) => {
  return (
    <>
      <Novelties />
      {products && (
        <>
          <HotPrice
            products={products}
          />
          <Category />
          <NewModels
            products={products}
          />
        </>
      )}
    </>
  );
};
