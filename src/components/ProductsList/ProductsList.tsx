import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard/ProductCard';
import './style.scss';

type Props = {
  products: Phone[],
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <section className="products-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
};
