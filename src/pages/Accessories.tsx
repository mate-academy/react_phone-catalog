import { Product } from '../types/Product';
import ProductPage from './ProductPage';

type Props = {
  list: Product[];
};

const AccessoriesPage: React.FC<Props> = ({ list }) => {
  return (
    <>
      <ProductPage
        list={list}
        title="Accessories page"
      />
    </>
  );
};

export default AccessoriesPage;
