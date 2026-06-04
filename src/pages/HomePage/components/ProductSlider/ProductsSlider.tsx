import { useRef, useState } from 'react';
import { ArrowIcon } from '../../../../components/icons/Arrow';
import { ProductCard } from '../../../../components/ProductCard';
import { BaseProduct } from '../../../../types/BaseProduct';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: BaseProduct[];
  className?: string;
};

export const ProductsSlider = ({ title, products, className }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const getCardWidth = () => {
    if (!sliderTrackRef.current) {
      return 288;
    }

    const card = sliderTrackRef.current.firstElementChild as HTMLElement;

    return card ? card.offsetWidth + 16 : 288;
  };

  const handlePrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className={`${styles.productsSlider} ${className}`}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.sliders}>
            <button
              className={`${styles.slider} ${styles.left}`}
              aria-label="Previous slide"
              disabled={currentIndex === 0}
              onClick={handlePrev}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              className={`${styles.slider} ${styles.right}`}
              aria-label="Next slide"
              disabled={currentIndex === products.length - 1}
              onClick={handleNext}
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
        <div className={styles.sliderTrack}>
          <div style={{ overflow: 'hidden' }}>
            <div
              className={styles.productCardsContainer}
              style={{
                transform: `translateX(-${currentIndex * getCardWidth()}px)`,
              }}
            >
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
