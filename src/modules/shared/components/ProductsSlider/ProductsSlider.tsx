import React, { FC } from 'react';

import { Product } from '@/types/Product';

import { Button } from '../Button';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { ProductCard } from '../ProductCard';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

import styles from './ProductsSlider.module.scss';
import classNames from 'classnames';

import useEmblaCarousel from 'embla-carousel-react';
import { useSliderPrevNextBtns } from '../../hooks/useSliderPrevNextBtns';
import { Message } from '../Message';

interface Props {
  title: string;
  products: Product[];
  isLoading?: boolean;
  withDiscounts?: boolean;
}

export const ProductsSlider: FC<Props> = React.memo(function ProductsSlider({
  title,
  products,
  isLoading = false,
  withDiscounts = true,
}) {
  const [sliderRef, sliderApi] = useEmblaCarousel({
    skipSnaps: true,
    duration: 30,
    align: 'start',
    active: !isLoading,
    breakpoints: {
      '(min-width: 1200px)': {
        slidesToScroll: 4,
      },
    },
  });
  const { prevBtnDisabled, nextBtnDisabled, handleNext, handlePrev } =
    useSliderPrevNextBtns(sliderApi);

  if (!isLoading && products.length === 0) {
    return (
      <div className="container">
        <Message>
          <Message.Title>No available products</Message.Title>
        </Message>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.topBar)}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.sliderBtns}>
          <Button
            variant="outline"
            onClick={handlePrev}
            squareBtn
            className={styles.arrowBtn}
            isDisabled={prevBtnDisabled || isLoading}
            startIcon={<FaAngleLeft size={16} />}
          />
          <Button
            variant="outline"
            squareBtn
            className={styles.arrowBtn}
            onClick={handleNext}
            isDisabled={nextBtnDisabled || isLoading}
            startIcon={<FaAngleRight size={16} />}
          />
        </div>
      </div>
      <div className={styles.slider} ref={!isLoading ? sliderRef : null}>
        <ul className={styles.sliderContainer}>
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <li key={`product-${index}-loader`} className={styles.slide}>
                <ProductCardSkeleton />
              </li>
            ))}
          {!isLoading &&
            products.map(product => (
              <li key={product.id} className={styles.slide}>
                <ProductCard product={product} showDiscount={withDiscounts} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
});
