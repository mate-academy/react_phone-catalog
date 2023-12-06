import { getUniqueId } from '../../helpers/getFunctions/getUniqueld';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[]
};

export const ProductsList: React.FC<Props> = ({ products }) => (
  <ul
    data-cy="cardsContainer"
    className="products-list__grid"
  >
    {products.map(product => (
      <li
        key={getUniqueId()}
        className="products-list__item"
      >
        <ProductCard
          product={product}
        />
      </li>
    ))}
  </ul>
);
