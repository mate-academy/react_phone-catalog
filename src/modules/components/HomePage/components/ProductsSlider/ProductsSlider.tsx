/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductsSliderSkeleton } from './ProductsSliderSkeleton';

import { ProductCard } from '@/modules/shared/components/ProductCard';
import { Button } from '@/modules/shared/components/ui/Button';
import { ProductType } from '@/modules/shared/utils/types';

import ArrowLeft from '@/assets/svg/arrow-left.svg?react';
import ArrowRight from '@/assets/svg/arrow-right.svg?react';

import styles from './ProductsSlider.module.scss';
//#endregion

//#region STYLES
const {
  sliderContainer,
  sliderHeader,
  sliderTitle,
  sliderActions,
  sliderViewport,
  sliderTrack,
  arrowLeft,
  arrowRight,
} = styles;
//#endregion

interface Props {
  title: string;
  products: ProductType[];
  hasDiscount?: boolean;
  isLoading?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  hasDiscount = false,
  isLoading = false,
}) => {
  //#region STATE_&_HOOKS
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [stepWidth, setStepWidth] = useState(0);
  const { t } = useTranslation();
  //#endregion

  //#region EFFECTS
  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);

    const gap = parseInt(rootStyles.getPropertyValue('--grid-gap-column'));
    const desktopWidth = parseInt(
      rootStyles.getPropertyValue('--card-width-desktop'),
    );
    const tabletWidth = parseInt(
      rootStyles.getPropertyValue('--card-width-tablet'),
    );
    const mobileWidth = parseInt(
      rootStyles.getPropertyValue('--card-width-mobile'),
    );

    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Мобілка: 1 картка
        setVisibleCards(1);
        setStepWidth(mobileWidth + gap);
      } else if (width < 840) {
        // Маленький планшет: 2 картки
        setVisibleCards(2);
        setStepWidth(tabletWidth + gap);
      } else if (width < 1200) {
        // Великий планшет: 3 картки
        setVisibleCards(3);
        setStepWidth(tabletWidth + gap);
      } else {
        // Десктоп: 4 картки
        setVisibleCards(4);
        setStepWidth(desktopWidth + gap);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  //#endregion

  //#region HANDLERS_&_HELPERS
  const maxIndex = Math.max(0, products.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  //#endregion

  //#region RENDER
  if (isLoading) {
    return <ProductsSliderSkeleton title={title} />;
  }

  return (
    <div className={sliderContainer}>
      <div className={sliderHeader}>
        <h2 className={sliderTitle}>{title}</h2>
        <div className={sliderActions}>
          <Button
            variant="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label={t('productsSlider.aria.prevItems')}
          >
            <ArrowLeft
              className={arrowLeft}
              aria-label={t('productsSlider.alt.arrowLeft')}
            />
          </Button>
          <Button
            variant="icon"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label={t('productsSlider.aria.nextItems')}
          >
            <ArrowRight
              className={arrowRight}
              aria-label={t('productsSlider.alt.arrowRight')}
            />
          </Button>
        </div>
      </div>

      <div className={sliderViewport}>
        <div
          className={sliderTrack}
          style={{ transform: `translateX(-${currentIndex * stepWidth}px)` }}
        >
          {products.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              showDiscount={hasDiscount}
            />
          ))}
        </div>
      </div>
    </div>
  );
  //#endregion
};
