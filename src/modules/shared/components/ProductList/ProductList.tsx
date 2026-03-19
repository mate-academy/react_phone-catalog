import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
  currentIndex?: number;
  step?: number;
  showDiscount?: boolean;
  isSlider?: boolean;
};

export const ProductList: React.FC<Props> = ({
  products,
  currentIndex,
  step,
  showDiscount = false,
  isSlider = false,
}) => {
  return (
    <div
      className={isSlider ? styles.sliderTrack : styles.cardGrid}
      style={
        isSlider && currentIndex !== undefined && step !== undefined
          ? { transform: `translateX(-${currentIndex * step}px)` }
          : undefined
      }
    >
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          showDiscount={showDiscount}
        />
      ))}
    </div>
  );
};
