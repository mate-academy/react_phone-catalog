import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  arrOfItems: Product[];
};

export const ProductsList: React.FC<Props> = ({ arrOfItems }) => (
  <div className="productsList" data-cy="productList">
    {arrOfItems.map(item => (
      <div className="productsList__card" key={item.id}>
        <ProductCard product={item} />
      </div>
    ))}
  </div>
);
