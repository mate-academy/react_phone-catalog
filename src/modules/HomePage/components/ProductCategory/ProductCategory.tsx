import { Product } from 'modules/shared/types/Product';

type Props = {
  products: Product[];
};

export const ProductCategory: React.FC<Props> = ({ products }) => {
  return <div>`Category ${products.length}`</div>;
};
