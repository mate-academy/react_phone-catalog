import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';

import styles from './Slider.module.scss';
import { Card } from '../../modules/Card/Card';
import layoutStyles from '../Layout/Layout.module.scss';
import { useSlider } from '../../hooks/useSlider';

interface SliderProps {
  products: (Product | ProductDetails)[];
  showDiscount?: boolean;
  title?: string;
}

export const Slider: React.FC<SliderProps> = ({
  title,
  products,
  showDiscount,
}) => {
  const { sliderRef, prev, next } = useSlider();

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={prev}
            aria-label="Previous products"
          >
            <img src="./img/icons/ArrowLeft.svg" alt="" />
          </button>

          <button
            type="button"
            className={styles.arrow}
            onClick={next}
            aria-label="Next products"
          >
            <img src="./img/icons/ArrowRight.svg" alt="" />
          </button>
        </div>
      </div>

      <div className={layoutStyles['layout--slider']} ref={sliderRef}>
        {products.map(product => (
          <Card
            key={product.id}
            product={product}
            variant="slider"
            showPrices
            showSpecs
            showActions
            showDiscount={showDiscount}
          />
        ))}
      </div>
    </section>
  );
};
