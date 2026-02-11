/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ProductForCard } from '../../../../../../types/Product/Product';
// eslint-disable-next-line max-len
import { ProductCard } from '../../../../../../shared/components/ProductCard';
import { ICON_PATHS } from '../../../../../../shared/constants/IconPaths';
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery';
import { BREAKPOINTS } from '../../../../../../shared/constants/Breakpoints';

import styles from './SliderContainer.module.scss';

type Props = {
  models: ProductForCard[];
  title: string;
};

export const SliderContainer: React.FC<Props> = ({ models, title }) => {
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
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>

        <div className={styles.slider__arrows}>
          <button
            className={styles.slider__arrowLeft}
            onClick={handlePrev}
            disabled={!canGoPrev}
          >
            <img src={ICON_PATHS.arrowLeft} alt="Left Arrow" />
          </button>

          <button
            className={styles.slider__arrowRight}
            onClick={handleNext}
            disabled={!canGoNext}
          >
            <img src={ICON_PATHS.arrowRight} alt="Right Arrow" />
          </button>
        </div>
      </div>

      <div
        className={styles.slider__track}
        ref={trackRef}
        {...(!isDesktop ? swipeHandlers : {})}
      >
        {models.map(model => (
          <div key={model.id} className={styles.slider__item}>
            <ProductCard product={model} />
          </div>
        ))}
      </div>
    </div>
  );
};
