import React, { useRef, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { RoundButton } from '../Buttons/RoundButton';
import { CardSkeleton } from '../CardSkeleton';
import { useCardSize } from '../../hooks/useCardSize';
import { getMaxScroll } from '../../utils/getMaxScroll';
import { Product } from '../../types/Product';
import { CARDS_GAP, SCROLL_TOLERANCE_PX } from '../../constants/cardsSlider';
import style from './ProductsSlider.module.scss';

type Props = {
  title: string;
  titleClassName: string;
  data: Product[];
  isLoading: boolean;
  hasDiscount?: boolean;
};

export const ProductsSlider: React.FC<Props> = props => {
  const { title, titleClassName, data, isLoading, hasDiscount = false } = props;

  const [scrollPosition, setScrollPosition] = useState(0);

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const cardSize = useCardSize();
  const maxScroll = getMaxScroll(carouselRef);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) {
      return;
    }

    const scrollStep = cardSize.width + CARDS_GAP;
    const newScroll =
      direction === 'right'
        ? Math.min(scrollPosition + scrollStep, maxScroll)
        : Math.max(scrollPosition - scrollStep, 0);

    carouselRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });

    setScrollPosition(newScroll);
  };

  const handleContainerScroll = () => {
    if (!carouselRef.current) {
      return;
    }

    setScrollPosition(carouselRef.current.scrollLeft);
  };

  const atStart = scrollPosition <= 0;
  const atEnd = scrollPosition >= maxScroll - SCROLL_TOLERANCE_PX;

  return (
    <div className={style.productsSlider}>
      <div className={style.productsSliderHeader}>
        <h2 className={titleClassName}>{title}</h2>

        <div className={style.productsSliderButtons}>
          <RoundButton
            iconName="arrowLeft"
            onClick={() => handleScroll('left')}
            ariaLabel="Scroll slider left"
            disabled={atStart}
          />
          <RoundButton
            iconName="arrowRight"
            onClick={() => handleScroll('right')}
            ariaLabel="Scroll slider right"
            disabled={atEnd}
          />
        </div>
      </div>

      <div
        ref={carouselRef}
        className={style.carousel}
        onScroll={handleContainerScroll}
        style={{ '--height': `${cardSize.height}px` } as React.CSSProperties}
      >
        {data.map(product => (
          <div
            key={product.id}
            className={style.carouselCardContainer}
            style={{ '--width': `${cardSize.width}px` } as React.CSSProperties}
          >
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <ProductCard product={product} discount={hasDiscount} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
