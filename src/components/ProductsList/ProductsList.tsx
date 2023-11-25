import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  items: Product[];
};

export const ProductsList: React.FC<Props> = ({ items }) => {
  return (
    <div className="ProductsList" data-cy="productList">
      <ul className="ProductsList__list">
        {items.map((item) => (
          <li
            key={item.id}
            className="ProductsList__item"
          >
            <ProductCard
              product={item}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
