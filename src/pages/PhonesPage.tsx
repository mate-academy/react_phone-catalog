import { Product } from '../types/Product';
import ProductPage from './ProductPage';

type Props = {
  list: Product[];
};

const PhonesPage: React.FC<Props> = ({ list }) => {
  return (
    <>
      <ProductPage
        list={list}
        title="Phones page"
      />
    </>
  );
};

export default PhonesPage;
