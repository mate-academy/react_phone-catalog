import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductSlider.module.scss';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  products: Product[];
  isShowDiscount: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  isShowDiscount,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  const [step, setStep] = useState(0);

  const firstCardRef = useRef<HTMLLIElement>(null);

  const updateSliderLayout = () => {
    const width = window.innerWidth;

    if (width < 640) {
      setVisibleCards(1);
    } else if (width < 1200) {
      setVisibleCards(3);
    } else {
      setVisibleCards(4);
    }

    if (firstCardRef.current) {
      const first = firstCardRef.current;
      const second = first.nextElementSibling as HTMLElement | null;

      if (second) {
        setStep(
          second.getBoundingClientRect().left -
            first.getBoundingClientRect().left,
        );
      }
    }
  };

  useEffect(() => {
    updateSliderLayout();

    window.addEventListener('resize', updateSliderLayout);

    return () => {
      window.removeEventListener('resize', updateSliderLayout);
    };
  }, [products]);

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const maxIndex = products.length - visibleCards;

  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50 && currentIndex < maxIndex) {
      handleNext();
    }

    if (diff < -50 && currentIndex > 0) {
      handlePrev();
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles['product-slider__header']}>
        <h2 className={styles['product-slider__title']}>{title}</h2>

        <div className={styles['product-slider__buttons']}>
          <button
            className={styles['product-slider__button']}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/buttons/arrow-left.png`}
              alt="button-arrow-left"
            />
          </button>

          <button
            className={styles['product-slider__button']}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/buttons/arrow-right.png`}
              alt="button-arrow-right"
            />
          </button>
        </div>
      </div>
      <div className={styles['product-slider__wrapper']}>
        <ul
          className={styles['product-slider__list']}
          style={{
            transform: `translateX(-${currentIndex * step}px)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {products.map((product, index) => (
            <li key={product.id} ref={index === 0 ? firstCardRef : null}>
              <ProductCard product={product} isShowDiscount={isShowDiscount} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
