import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';

type Props = {
  products: Product[],
  index: number,
};

export const ProductSlider: React.FC<Props> = ({ products, index }) => {
  return (
    <div className="ProductSlider">
      <ul className="ProductSlider__list">
        {products.slice(index, index + 4).map((product: Product) => {
          return (
            <li key={product.id} className="ProductSlider__item">
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
