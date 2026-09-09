import { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import chevronLeft from '../../assets/icons/chevron-left.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  showFullPrice?: boolean;
};

// шаг сдвига = ширина карточки + зазор между ними
const CARD_WIDTH = 272;
const GAP = 16;
const VISIBLE_COUNT = 4;

export const ProductsSlider = ({ title, products, showFullPrice }: Props) => {
  const [index, setIndex] = useState(0);

  // дальше этого индекса листать некуда: справа уже нечего показывать
  const maxIndex = Math.max(products.length - VISIBLE_COUNT, 0);

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => setIndex(index - 1)}
            disabled={index === 0}
            aria-label="Previous products"
          >
            <img src={chevronLeft} alt="" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => setIndex(index + 1)}
            disabled={index >= maxIndex}
            aria-label="Next products"
          >
            <img src={chevronRight} alt="" />
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)` }}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showFullPrice={showFullPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
