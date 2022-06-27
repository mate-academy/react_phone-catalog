import { Product } from '../types/Product';
import ProductPage from './ProductPage';

type Props = {
  list: Product[];
};

const TabletsPage: React.FC<Props> = ({ list }) => {
  return (
    <>
      <ProductPage
        list={list}
        title="Tablets page"
      />
    </>
  );
};

export default TabletsPage;
