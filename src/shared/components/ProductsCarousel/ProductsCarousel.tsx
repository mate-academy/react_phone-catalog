import styles from './ProductsCarousel.module.scss';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ProductCard } from '../ProductCard/ProductCard';
import arrowL from '../../images/icons/arrowLeft.svg';
import whiteLeft from './icons/whiteLeft.svg';
import arrowLDisabled from '../../images/icons/arrowLeftDisabled.svg';
import arrowRDisabled from '../../images/icons/arrowRightDisabled.svg';
import arrowR from '../../images/icons/arrowRight.svg';
import whiteRight from './icons/whiteRight.svg';
import { Product } from '../../../types/Product';
import { AppContext } from '../../../utils/AppContext';

type Props = {
  sectionTitle: string;
  products: Product[];
  isDiscountRequired: boolean;
};

export const ProductsCarousel: React.FC<Props> = ({
  sectionTitle,
  products,
  isDiscountRequired,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const { isDarkTheme } = useContext(AppContext);
  const is475pxWidth = useMediaQuery({ query: '(min-width: 475px)' });
  const isTabletWidth = useMediaQuery({ query: '(min-width: 640px)' });
  const isDesktopWidth = useMediaQuery({ query: '(min-width: 1200px)' });
  const is800pxWidth = useMediaQuery({ query: '(min-width: 800px' });

  let stepWidth = 228; /* Card Width + 16px gap */
  let step = 1;

  if (isDesktopWidth) {
    stepWidth = 288;
    step = 4;
  } else if (isTabletWidth) {
    stepWidth = 253;
    step = 3;
  } else if (is475pxWidth) {
    stepWidth = 228;
    step = 2;
  } else {
    stepWidth = 228;
    step = 1;
  }

  const endOfList =
    (isDesktopWidth && startIndex === products.length - 4) ||
    (is800pxWidth && startIndex === products.length - 3) ||
    (is475pxWidth && startIndex === products.length - 2) ||
    startIndex === products.length - 1;

  if (startIndex > products.length - step) {
    setStartIndex(products.length - step);
  }

  const handleCardsSliding = (direction: string) => {
    switch (direction) {
      case 'left':
        if (!startIndex) {
          return;
        } else if (startIndex - step < 0) {
          setStartIndex(0);
        } else {
          setStartIndex(startIndex - step);
        }

        break;

      case 'right':
        if (endOfList) {
          return;
        } else {
          setStartIndex(startIndex + step);
        }

        break;
    }
  };

  /* Swiping for mobile */
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance < minSwipeDistance;
    const isRightSwipe = distance > -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe) {
        handleCardsSliding('left');
      } else {
        handleCardsSliding('right');
      }
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerTop}>
        <h2
          className={classNames(
            styles.blockTitle,
            isDarkTheme ? styles.blockTitleDark : '',
          )}
        >
          {sectionTitle}
        </h2>

        <div className={styles.blockButtons}>
          <div
            className={classNames(
              styles.blockButton,
              isDarkTheme ? styles.blockButtonDark : '',
              !startIndex ? styles.disabled : '',
              !startIndex && isDarkTheme ? styles.disabledDark : '',
            )}
            style={
              !startIndex
                ? { backgroundImage: `url(${arrowLDisabled})` }
                : isDarkTheme
                  ? { backgroundImage: `url(${whiteLeft})` }
                  : { backgroundImage: `url(${arrowL})` }
            }
            onClick={() => handleCardsSliding('left')}
          ></div>
          <div
            className={classNames(
              styles.blockButton,
              isDarkTheme ? styles.blockButtonDark : '',
              endOfList ? styles.disabled : '',
              endOfList && isDarkTheme ? styles.disabledDark : '',
            )}
            style={
              endOfList
                ? { backgroundImage: `url(${arrowRDisabled})` }
                : isDarkTheme
                  ? { backgroundImage: `url(${whiteRight})` }
                  : { backgroundImage: `url(${arrowR})` }
            }
            onClick={() => handleCardsSliding('right')}
          ></div>
        </div>
      </div>

      <div className={styles.containerBottom}>
        <div
          className={styles.productsCarousel}
          style={{
            transform: `translateX(-${startIndex * stepWidth}px)`,
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {products.map(item => (
            <ProductCard
              product={item}
              isDiscountVisible={isDiscountRequired}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
