import { useShop } from '../../../../store/shop/ShopContext';
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
  const { favourites } = useShop();

  return (
    <div
      className={isSlider ? styles.sliderTrack : styles.cardGrid}
      style={
        isSlider && currentIndex !== undefined && step !== undefined
          ? { transform: `translateX(-${currentIndex * step}px)` }
          : undefined
      }
    >
      {products.map(product => {
        const isFavourite = favourites.some(item => item.id === product.id);

        return (
          <ProductCard
            key={product.id}
            product={product}
            isFavourite={isFavourite}
            showDiscount={showDiscount}
          />
        );
      })}
    </div>
  );
};
