import styles from './ProductSlider.module.scss';
import { Product } from '../../types/Product';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import {
  getArrowLeftActiveIcon,
  getArrowLeftDisabledIcon,
  getArrowRightActiveIcon,
  getArrowRightDisabledIcon,
} from '../../utils/getIcons';
import { useSwipeable } from 'react-swipeable';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const { theme } = useTheme();

  const [cardIndex, setCardIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(1);

  const updateVisibleCardsCount = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 640 && screenWidth < 1200) {
      setVisibleCardsCount(2);
    } else if (screenWidth > 1200) {
      setVisibleCardsCount(4);
    }
  };

  useEffect(() => {
    updateVisibleCardsCount();
    window.addEventListener('resize', updateVisibleCardsCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCardsCount);
    };
  }, []);

  const handleRightClick = () => {
    setCardIndex(prevIndex =>
      Math.min(prevIndex + 1, products.length - visibleCardsCount),
    );
  };

  const handleLeftClick = () => {
    setCardIndex(currIndex => Math.max(currIndex - 1, 0));
  };

  const isLeftArrowDisabled = cardIndex === 0;
  const isRightArrowDisabled =
    cardIndex === products.length - visibleCardsCount;

  const handlers = useSwipeable({
    onSwipedLeft: () => handleRightClick(),
    onSwipedRight: () => handleLeftClick(),
  });

  const arrowLeftActiveIcon = getArrowLeftActiveIcon(theme);
  const arrowLeftDisabledIcon = getArrowLeftDisabledIcon(theme);
  const arrowRightActiveIcon = getArrowRightActiveIcon(theme);
  const arrowRightDisabledIcon = getArrowRightDisabledIcon(theme);

  return (
    <div className={styles.productSlider} {...handlers}>
      <div className={styles.upperContainer}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttonsWrapper}>
          <button
            className={styles.button}
            onClick={handleLeftClick}
            disabled={isLeftArrowDisabled}
          >
            {isLeftArrowDisabled ? (
              <img src={arrowLeftDisabledIcon} alt="arrow-left-disabled" />
            ) : (
              <img src={arrowLeftActiveIcon} alt="arrow-left-active" />
            )}
          </button>

          <button
            className={styles.button}
            onClick={handleRightClick}
            disabled={isRightArrowDisabled}
          >
            {isRightArrowDisabled ? (
              <img src={arrowRightDisabledIcon} alt="arrowrightdisabled" />
            ) : (
              <img src={arrowRightActiveIcon} alt="arrowactiveactive" />
            )}
          </button>
        </div>
      </div>

      <div className={styles.mainContainer}>
        {products.map(product => (
          <div
            key={product.id}
            className={styles.sliderWrapper}
            style={{
              transform: `translateX(calc(-${cardIndex * 100}% - ${cardIndex * 16}px))`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
