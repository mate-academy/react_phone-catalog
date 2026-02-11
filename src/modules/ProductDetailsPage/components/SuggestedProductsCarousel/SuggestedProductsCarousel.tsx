/* eslint-disable max-len */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ProductForCard } from '../../../../types/Product/Product';
import { ProductCard } from '../../../../shared/components/ProductCard';
import { ICON_PATHS } from '../../../../shared/constants/IconPaths';
import { useSwipeable } from 'react-swipeable';
import { BREAKPOINTS } from '../../../../shared/constants/Breakpoints';
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery';

import styles from './SuggestedProductsCarousel.module.scss';

type Props = {
  products: ProductForCard[];
  title: string;
};

export const SuggestedProductsCarousel: React.FC<Props> = ({
  products,
  title,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);

  const isTablet = useMediaQuery(BREAKPOINTS.tablet);
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);

  const checkScrollBoundaries = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const currentScrollLeft = track.scrollLeft;

    setScrollPosition(currentScrollLeft);

    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const handleScroll = () => {
      checkScrollBoundaries();
    };

    const timeoutId = setTimeout(() => {
      checkScrollBoundaries();
    }, 100);

    track.addEventListener('scroll', handleScroll);

    return () => {
      track.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [checkScrollBoundaries]);

  useEffect(() => {
    const handleResize = () => {
      checkScrollBoundaries();
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [checkScrollBoundaries]);

  const getItemsConfig = () => {
    if (isDesktop) {
      return { itemsVisible: 4, itemsToAdvance: 4 };
    }

    if (isTablet) {
      return { itemsVisible: 2.5, itemsToAdvance: 2 };
    }

    return { itemsVisible: 1.67, itemsToAdvance: 1 };
  };

  const performScroll = (direction: 'next' | 'prev') => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const { itemsToAdvance } = getItemsConfig();
    const itemElement = track.firstElementChild as HTMLElement;

    if (!itemElement) {
      return;
    }

    const itemWidth = itemElement.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 0;

    const scrollDistance = (itemWidth + gap) * itemsToAdvance;

    track.scrollBy({
      left: direction === 'next' ? scrollDistance : -scrollDistance,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    performScroll('next');
  };

  const handlePrev = () => {
    performScroll('prev');
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
    preventScrollOnSwipe: false,
  });

  const { ref: swipeRef, ...swipeHandlers } = handlers;

  const canGoPrev = isInitialized && scrollPosition > 1;
  const canGoNext =
    isInitialized &&
    trackRef.current &&
    scrollPosition <
      trackRef.current.scrollWidth - trackRef.current.clientWidth - 1;

  return (
    <div className={styles.suggestedProducts}>
      <div className={styles.suggestedProducts__header}>
        <h2 className={styles.suggestedProducts__title}>{title}</h2>

        <div className={styles.suggestedProducts__arrows}>
          <button
            className={styles.suggestedProducts__arrowLeft}
            onClick={handlePrev}
            disabled={!canGoPrev}
          >
            <img src={ICON_PATHS.arrowLeft} alt="Left Arrow" />
          </button>

          <button
            className={styles.suggestedProducts__arrowRight}
            onClick={handleNext}
            disabled={!canGoNext}
          >
            <img src={ICON_PATHS.arrowRight} alt="Right Arrow" />
          </button>
        </div>
      </div>

      <div
        className={styles.suggestedProducts__track}
        ref={trackRef}
        {...(!isDesktop ? swipeHandlers : {})}
      >
        {products.map(product => (
          <div key={product.id} className={styles.suggestedProducts__item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
