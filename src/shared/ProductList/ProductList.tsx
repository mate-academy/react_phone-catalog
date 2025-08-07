/* eslint-disable @typescript-eslint/indent */
import styles from './ProductList.module.scss';
import { ProductCard } from '../ProductCard';
import { useLocation } from 'react-router-dom';
import { ProductDemo } from '../../types/ProductDemo';
import { CartItem } from '../CartItem';

type ProductListProps = {
  data: ProductDemo[];
  emblaRef?: (node: HTMLElement | null) => void;
  showFullPrice?: boolean;
  toCart?: boolean;
};

export const ProductList: React.FC<ProductListProps> = ({
  data,
  emblaRef,
  showFullPrice,
  toCart,
}) => {
  const location = useLocation();

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <ul
          className={styles.embla__container}
          style={
            [
              '/phones',
              '/tablets',
              '/accessories',
              '/cart',
              '/favorites',
            ].includes(location.pathname)
              ? { flexDirection: 'column', gap: `${40}px` }
              : {}
          }
        >
          {toCart
            ? data.map(product => (
                <CartItem product={product} key={product.id} />
              ))
            : data.map(product => (
                <ProductCard
                  product={product}
                  key={product.id}
                  showFullPrice={showFullPrice}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};
