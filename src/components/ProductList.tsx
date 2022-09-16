import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="productlist">
      {
        products.map(item => (
          <ProductCard product={item} key={item.id} isSlider={false} />
        ))
      }
    </div>
  );
};
