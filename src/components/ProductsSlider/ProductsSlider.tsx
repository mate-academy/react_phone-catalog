import { Item } from '../../types/Item';
import { ProductCard } from '../ProductCard';
import { SwiperButtons } from '../SwiperButtons/SwiperButtons';
import styles from './ProductsSlider.module.scss';
import { useEffect, useState } from 'react';

type Props = {
  products: Item[];
  title: string;
  isWithoutDiscount: boolean;
  isYouMayLike: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
  isWithoutDiscount,
  isYouMayLike,
}) => {
  const [transform, setTransform] = useState(0);
  const GAP = 16;
  const [cardWidth, setCardWidth] = useState(212);

  const CARD_WIDTHS = {
    mobile: 212,
    tablet: 237,
    desktop: 272,
  };

  const [visibleCards, setVisibleCards] = useState(1);

  const updateLayout = () => {
    const w = window.innerWidth;

    if (w >= 1200) {
      setCardWidth(CARD_WIDTHS.desktop);
      setVisibleCards(4);
    } else if (w >= 640) {
      setCardWidth(CARD_WIDTHS.tablet);
      setVisibleCards(Math.floor(w / (CARD_WIDTHS.tablet + GAP)));
    } else {
      setCardWidth(CARD_WIDTHS.mobile);
      setVisibleCards(Math.floor(w / (CARD_WIDTHS.mobile + GAP)));
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const STEP = (cardWidth + GAP) * visibleCards;
  const maxOffset = -((products.length - visibleCards) * (cardWidth + GAP));

  const handlePrevClick = () => {
    setTransform(prev => Math.min(prev + STEP, 0));
  };

  const handleNextClick = () => {
    setTransform(prev => Math.max(prev - STEP, maxOffset));
  };

  return (
    <div className={styles.productSlider}>
      <div className={styles.productSlider__head}>
        <h2 className={styles.productSlider__title}>{title}</h2>
        <SwiperButtons
          isSwiper={false}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          maxOffset={maxOffset}
          transform={transform}
        />
      </div>

      <div
        className={styles.productSlider__content}
        style={{ transform: `translateX(${transform}px)` }}
      >
        {products.map((product, id) => (
          <ProductCard
            product={product}
            isYouMayLike={isYouMayLike}
            isWideCard={false}
            isWithoutDiscount={isWithoutDiscount}
            key={id}
          />
        ))}
      </div>
    </div>
  );
};
