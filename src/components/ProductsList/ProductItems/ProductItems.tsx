import { Product } from '../../../types/Product';
import { ProductCard } from '../../ProductCard';

interface Props {
  items: Product[];
}

export const ProductItems: React.FC<Props> = ({ items }) => (
  <div className="products-list__items" data-cy="productList">
    {items.map((item) => (
      <ProductCard item={item} key={item.id} />
    ))}
  </div>
);
