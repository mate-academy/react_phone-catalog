import { useRef } from 'react';
import styles from '../ProductsSlider/ProductsSlider.module.scss';
import { ProductCard } from '../../../shared/body/ProductCard';

import arrowLeft from '../../../shared/icons/MainPage/arrowleft.png';
import arrowRight from '../../../shared/icons/MainPage/arrowright.png';
import { Product } from '../../../shared/types/Product';

export type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount = true,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!listRef.current) {
      return;
    }

    const cardWidth = 272 + 16;
    const scrollAmount = cardWidth * 4;

    listRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.slider}>
      <div className={styles.header}>
        <h2>{title}</h2>

        <div className={styles.buttons}>
          <button onClick={() => scroll('left')}>
            <img src={arrowLeft} className={styles.arrow} />
          </button>
          <button onClick={() => scroll('right')}>
            <img src={arrowRight} className={styles.arrow} />
          </button>
        </div>
      </div>

      <div className={styles.list} ref={listRef}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={showDiscount}
          />
        ))}
      </div>
    </div>
  );
};
