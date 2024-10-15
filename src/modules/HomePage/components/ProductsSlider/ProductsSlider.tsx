import styles from './ProductsSlider.module.scss';
import cn from 'classnames';
import { RoundButton } from '../../../../components/RoundButton';
import { SvgIcon } from '../../../../components/SvgIcon';
import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../../components/ProductCard';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);

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

      <div className={styles['products-slider__wrapper']}>
        <ul className={styles['products-slider__list']}>
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
