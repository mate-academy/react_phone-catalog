import { Product } from '../../types/Product';
import { ButtonMove } from '../ButtonMove';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';

type Props = {
  title: string,
  products: Product[],
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <p className="product-slider__title title">{title}</p>

        <div className="product-slider__buttons">
          <ButtonMove icon="prev" />
          <ButtonMove icon="next" />
        </div>
      </div>

      <div className="product-slider__content">
        {products.map(product => {
          return (
            <ProductCard product={product} key={product.id} />
          );
        })}
      </div>
    </div>
  );
};
