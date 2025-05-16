import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { getEventPageCoordinates } from '../utils';

type UseSlideIndexDragSliderOptions<T> = {
  slides: T[];
  threshold?: number;
  autoScrollInterval?: number;
  loop?: boolean;
  transitionDuration?: number;
};

export const useSlideIndexDragSlider = <T>({
  slides,
  threshold = 50,
  autoScrollInterval,
  loop = false,
  transitionDuration = 300,
}: UseSlideIndexDragSliderOptions<T>) => {
  const preparedSlides = useMemo(() => {
    if (loop && slides.length > 1) {
      return [slides[slides.length - 1], ...slides, slides[0]];
    }

    return [...slides];
  }, [slides, loop]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const slidesCount = preparedSlides.length;
  const initialIndex = loop ? 1 : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [sliderState, setSliderState] = useState({
    isAnimating: false,
    isDragging: false,
    isTransitionEnabled: true,
  });

  const visibleSlideIndex = useMemo(() => {
    if (!loop) {
      return currentIndex;
    }

    if (currentIndex === 0) {
      return slides.length - 1;
    }

    if (currentIndex === preparedSlides.length - 1) {
      return 0;
    }

    return currentIndex - 1;
  }, [currentIndex, loop, slides.length, preparedSlides.length]);

  const goToIndex = useCallback(
    (newIndex: number) => {
      if (sliderState.isAnimating || newIndex === currentIndex) {
        return;
      }

      setSliderState(prev => ({
        ...prev,
        isAnimating: true,
        isTransitionEnabled: true,
      }));
      setCurrentIndex(newIndex);

      const finishAnimation = (
        overrideState: Partial<typeof sliderState> = {},
      ) => {
        setSliderState(prev => ({
          ...prev,
          isAnimating: false,
          ...overrideState,
        }));
      };

      if (loop) {
        if (newIndex === slidesCount - 1) {
          setTimeout(() => {
            finishAnimation({ isTransitionEnabled: false });
            setCurrentIndex(1);
          }, transitionDuration);
        } else if (newIndex === 0) {
          setTimeout(() => {
            finishAnimation({ isTransitionEnabled: false });
            setCurrentIndex(slidesCount - 2);
          }, transitionDuration);
        } else {
          setTimeout(() => {
            finishAnimation();
          }, transitionDuration);
        }
      } else {
        setTimeout(() => {
          finishAnimation();
        }, transitionDuration);
      }
    },
    [
      sliderState.isAnimating,
      currentIndex,
      loop,
      slidesCount,
      transitionDuration,
    ],
  );

  const updateSliderPosition = useCallback(
    (withTransition: boolean) => {
      if (!listRef.current) {
        return;
      }

      listRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% + ${dragDeltaRef.current}px))`;
      listRef.current.style.transition = withTransition
        ? `transform ${transitionDuration / 1000}s ease-in-out`
        : 'none';
    },
    [currentIndex, transitionDuration],
  );

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getEventPageCoordinates(e);

    dragStartXRef.current = x;
    dragStartYRef.current = y;
    dragDeltaRef.current = 0;
    isHorizontalSwipeRef.current = null;
    setSliderState(prev => ({ ...prev, isDragging: true }));
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderState.isDragging) {
      return;
    }

    const { x, y } = getEventPageCoordinates(e);
    const deltaX = x - dragStartXRef.current;
    const deltaY = y - dragStartYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      isHorizontalSwipeRef.current = Math.abs(deltaX) > Math.abs(deltaY);
    }

    if (isHorizontalSwipeRef.current) {
      dragDeltaRef.current = deltaX;
      updateSliderPosition(false);
    }
  };

  const handleDragEnd = () => {
    if (!sliderState.isDragging) {
      return;
    }

    setSliderState(prev => ({ ...prev, isDragging: false }));
    const delta = dragDeltaRef.current;

    if (delta > threshold) {
      goToIndex(Math.max(currentIndex - 1, 0));
    } else if (delta < -threshold) {
      goToIndex(Math.min(currentIndex + 1, slidesCount - 1));
    }

    dragDeltaRef.current = 0;
    updateSliderPosition(true);
  };

  const handleMouseEnter = () => {
    if (autoScrollInterval) {
      isHoveredRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (autoScrollInterval) {
      isHoveredRef.current = false;
    }

    handleDragEnd();
  };

  useEffect(() => {
    updateSliderPosition(
      !sliderState.isDragging && sliderState.isTransitionEnabled,
    );
  }, [
    updateSliderPosition,
    sliderState.isDragging,
    sliderState.isTransitionEnabled,
  ]);

  useEffect(() => {
    if (autoScrollInterval) {
      autoScrollRef.current = setInterval(() => {
        if (!isHoveredRef.current && !sliderState.isDragging) {
          goToIndex((currentIndex + 1) % (loop ? slidesCount : slides.length));
        }
      }, autoScrollInterval);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [
    autoScrollInterval,
    currentIndex,
    goToIndex,
    loop,
    sliderState.isDragging,
    slides.length,
    slidesCount,
  ]);

  useEffect(() => {
    if (!sliderState.isTransitionEnabled) {
      requestAnimationFrame(() => {
        setSliderState(prev => ({ ...prev, isTransitionEnabled: true }));
      });
    }
  }, [sliderState.isTransitionEnabled]);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!sliderState.isDragging) {
        return;
      }

      if (isHorizontalSwipeRef.current && e.cancelable) {
        e.preventDefault();
      }
    };

    wrapper.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      wrapper.removeEventListener('touchmove', handleTouchMove);
    };
  }, [sliderState.isDragging]);

  const dragHandlers = {
    onMouseDown: handleDragStart,
    onMouseMove: handleDragMove,
    onMouseUp: handleDragEnd,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onTouchStart: handleDragStart,
    onTouchMove: handleDragMove,
    onTouchEnd: handleDragEnd,
    onTouchCancel: handleDragEnd,
  };

  return {
    wrapperRef,
    listRef,
    isDragging: sliderState.isDragging,
    isTransitionEnabled: sliderState.isTransitionEnabled,
    visibleSlideIndex,
    currentIndex,
    preparedSlides,
    goToIndex,
    dragHandlers,
  };
};
