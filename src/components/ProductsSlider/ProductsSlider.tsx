import styles from './ProductsSlider.module.scss';
import cn from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { Product } from '../../types';
import { RoundButton } from '../RoundButton';
import { SvgIcon } from '../SvgIcon';
import { ProductCard } from '../ProductCard';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLUListElement>(null);

  const updateVisibleCardsCount = () => {
    const width = window.innerWidth;

    switch (true) {
      case width < 440:
        setVisibleCardsCount(1);
        break;
      case width < 767:
        setVisibleCardsCount(2);
        break;
      case width < 1200:
        setVisibleCardsCount(3);
        break;
      default:
        setVisibleCardsCount(4);
        break;
    }
  };

  useEffect(() => {
    updateVisibleCardsCount();
    window.addEventListener('resize', updateVisibleCardsCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCardsCount);
    };
  }, []);

  const previousSlide = () => {
    setCurrentSlideIndex(index => Math.max(index - 1, 0));
  };

  const nextSlide = () => {
    setCurrentSlideIndex(index =>
      Math.min(index + 1, products.length - visibleCardsCount),
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX) {
      return;
    }

    const deltaX = e.touches[0].clientX - startX;

    if (deltaX > 50) {
      previousSlide();
      setStartX(null);
    } else if (deltaX < -50) {
      nextSlide();
      setStartX(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || startX === null) {
      return;
    }

    const deltaX = e.clientX - startX;

    if (deltaX > 50) {
      previousSlide();
      setStartX(e.clientX);
    } else if (deltaX < -50) {
      nextSlide();
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartX(null);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setStartX(null);
    }
  };

  return (
    <section className={styles['products-slider']}>
      <div className={styles['products-slider__header']}>
        <h2 className={styles['products-slider__title']}>{title}</h2>
        <div className={styles['products-slider__controls']}>
          <RoundButton
            onClick={previousSlide}
            className={cn(
              styles['products-slider__btn'],
              styles['products-slider__btn--prev'],
            )}
            disabled={currentSlideIndex === 0}
          >
            <SvgIcon type={'arrow'} />
          </RoundButton>
          <RoundButton
            onClick={nextSlide}
            className={cn(
              styles['products-slider__btn'],
              styles['products-slider__btn--next'],
            )}
            disabled={currentSlideIndex === products.length - visibleCardsCount}
          >
            <SvgIcon type={'arrow'} />
          </RoundButton>
        </div>
      </div>

      <div
        className={styles['products-slider__wrapper']}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <ul className={styles['products-slider__list']} ref={sliderRef}>
          {products.map(product => {
            return (
              <li
                key={product.id}
                className={styles['products-slider__slide']}
                style={{
                  transform: `translateX(calc(-${currentSlideIndex * 100}% - ${currentSlideIndex * 16}px))`,
                }}
              >
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
