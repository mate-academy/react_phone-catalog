import { useContext, useRef, useEffect, useState, useCallback } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';
import { useWindowWidth } from '../../utils/hooks/useWindowWidth';
import { useTouchSlider } from '../../utils/hooks/useTouchSlider';

type ProductsSliderProps = {
  products: Product[];
  hotPrice?: boolean;
  title: string;
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  title,
  hotPrice,
}) => {
  const { state } = useContext(ProductsContext);
  const { isLoading } = state;

  const cardsGap = 16;
  const windowWidth = useWindowWidth();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const calculateVisibleCards = useCallback((containerWidth: number) => {
    if (containerWidth >= 1200) {
      return 4;
    } else if (containerWidth >= 640) {
      return 2.5;
    } else {
      return 1.5;
    }
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      const containerWidth = wrapperRef.current.offsetWidth;
      const newVisibleCards = calculateVisibleCards(windowWidth);

      setVisibleCards(newVisibleCards);

      const firstCard = wrapperRef.current.querySelector(
        `.${styles.slider__item}`,
      );

      if (firstCard) {
        const newCardWidth =
          (containerWidth - cardsGap * (Math.ceil(newVisibleCards) - 1)) /
          newVisibleCards;

        setCardWidth(newCardWidth);
      }
    }
  }, [products, windowWidth, calculateVisibleCards, cardsGap]);

  useEffect(() => {
    if (currentIndex >= products.length - visibleCards) {
      setCanScrollNext(false);
    } else {
      setCanScrollNext(true);
    }
  }, [currentIndex, visibleCards, products.length]);

  const handlePrevClick = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCanScrollNext(true);
    }
  }, [currentIndex]);

  const handleNextClick = useCallback(() => {
    if (canScrollNext) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [canScrollNext, currentIndex]);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlider(
    handleNextClick,
    handlePrevClick,
  );

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={styles.slider}>
      <div className={styles.slider__top}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__buttons}>
          <button
            onClick={handlePrevClick}
            className={classNames(styles.slider__button, {
              [styles['slider__button--disabled']]: currentIndex === 0,
            })}
            disabled={currentIndex === 0}
          >
            <img
              src={
                currentIndex === 0
                  ? '/icons/chevron-arrow-left-disabled.svg'
                  : '/icons/chevron-arrow-left.svg'
              }
              alt="Left arrow icon"
            />
          </button>
          <button
            onClick={handleNextClick}
            className={classNames(styles.slider__button, {
              [styles['slider__button--disabled']]: !canScrollNext,
            })}
            disabled={!canScrollNext}
          >
            <img
              src={
                !canScrollNext
                  ? '/icons/chevron-arrow-right-disabled.svg'
                  : '/icons/chevron-arrow-right.svg'
              }
              alt="Right arrow icon"
            />
          </button>
        </div>
      </div>

      <div
        className={classNames(styles.slider__slides, {
          [styles['slider__slides--margins']]: currentIndex !== 0,
        })}
      >
        <div
          ref={wrapperRef}
          className={styles.slider__wrapper}
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + cardsGap)}px)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={classNames(styles.slider__item, {
                [styles['slider__item--active']]: index === currentIndex,
              })}
              style={{ minWidth: `${cardWidth}px` }}
            >
              <ProductCard
                product={product}
                isLoading={isLoading}
                hotPrice={hotPrice}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
