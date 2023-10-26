import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './SliderList.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul
      className="product-slider__list"
      data-cy="cardsContainer"
    >
      {products.map(product => (
        <ProductCard
          product={product}
          key={product.id}
        />
      ))}
    </ul>
  );
};
