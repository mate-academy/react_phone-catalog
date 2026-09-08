import './ProductsSlider.scss';
import classNames from 'classnames';
import {
  useState,
  useContext,
  useMemo,
  useCallback,
  FC,
  useEffect,
} from 'react';

import { ProductCard } from '../ProductCard';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons.config';
import { GlobalContext } from '../../../context/GlobalContext';
import { Props } from './types/types';

const CARD_WIDTHS = {
  mobile: 212,
  tablet: 237,
  desktop: 272,
} as const;

const BREAKPOINTS = {
  mobile: 640,
  tablet: 1200,
} as const;

const GAP = 16;
const MAX_VISIBLE_CARDS = 4;

export const ProductsSlider: FC<Props> = ({ title, products, displayType }) => {
  const { theme } = useContext(GlobalContext);
  const [cardWidth, setCardWidth] = useState<212 | 237 | 272>(
    CARD_WIDTHS.desktop,
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCardWidth = useCallback(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth < BREAKPOINTS.mobile) {
      return CARD_WIDTHS.mobile;
    }

    if (screenWidth < BREAKPOINTS.tablet) {
      return CARD_WIDTHS.tablet;
    }

    return CARD_WIDTHS.desktop;
  }, []);

  useEffect(() => {
    const updateCardWidth = () => {
      setCardWidth(getCardWidth());
    };

    updateCardWidth();

    window.addEventListener('resize', updateCardWidth);

    return () => window.removeEventListener('resize', updateCardWidth);
  }, [getCardWidth]);

  const maxIndex = useMemo(
    () => Math.max(0, products.length - MAX_VISIBLE_CARDS),
    [products.length],
  );

  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const handleNext = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [canGoNext]);

  const handlePrev = useCallback(() => {
    if (canGoPrev) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [canGoPrev]);

  const translateX = useMemo(
    () => currentIndex * (cardWidth + GAP),
    [currentIndex, cardWidth],
  );

  const getNavigationIcon = (
    direction: 'left' | 'right',
    isDisabled: boolean,
  ) => {
    const iconKey = isDisabled
      ? `arrow_${direction}__disabled`
      : `arrow_${direction}`;

    return icons[iconKey as keyof typeof icons][theme];
  };

  return (
    <div className="productsSlider">
      <div className="productsSlider__container-top">
        <h2 className="productsSlider__title">{title}</h2>

        <div className="productsSlider__buttons">
          <button
            type="button"
            className={classNames('productsSlider__button', {
              'productsSlider__button--disabled': !canGoPrev,
            })}
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Previous products"
          >
            <Icon icon={getNavigationIcon('left', !canGoPrev)} />
          </button>

          <button
            type="button"
            className={classNames('productsSlider__button', {
              'productsSlider__button--disabled': !canGoNext,
            })}
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next products"
          >
            <Icon icon={getNavigationIcon('right', !canGoNext)} />
          </button>
        </div>
      </div>

      <div className="productsSlider__viewport">
        <div
          className="productsSlider__track"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {products.map(product => (
            <div
              key={product.id}
              className="productsSlider__item"
              style={{ width: `${cardWidth}px` }}
            >
              <ProductCard product={product} displayType={displayType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
