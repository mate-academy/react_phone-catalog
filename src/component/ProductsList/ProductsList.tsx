import { ProductCard } from '../modules/ProductCard';
import { Products } from './../../types/Products';

type Props = {
  products: Products[];
  title: string;
  loading: boolean;
  error: string;
};

export const ProductList: React.FC<Props> = ({ title, products }) => {
  return (
    <div>
      <h1>{title}</h1>
      <ProductCard products={products} />
    </div>
  );
};
