import { useCallback, useEffect, useRef, useState } from 'react';
import { getEventPageCoordinates } from '../utils';

type UsePixelScrollDragSliderOptions = {
  transitionDuration?: number;
  threshold?: number;
};

export const usePixelScrollDragSlider = ({
  transitionDuration = 300,
  threshold = 10,
}: UsePixelScrollDragSliderOptions) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const [cardWidth, setCardWidth] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);

  const updateMeasurements = useCallback(() => {
    if (listRef.current && itemRef.current) {
      const newMaxScroll =
        listRef.current.scrollWidth - listRef.current.clientWidth;

      const rect = itemRef.current.getBoundingClientRect();

      if (cardWidth) {
        setCurrentScroll(curr =>
          Math.max(Math.min((curr * rect.width) / cardWidth, newMaxScroll), 0),
        );
      }

      setCardWidth(rect.width);
      setMaxScroll(newMaxScroll);
    }
  }, [cardWidth]);

  const updateSliderPosition = useCallback(
    (scroll: number, withTransition: boolean) => {
      if (!listRef.current) {
        return;
      }

      listRef.current.style.transform = `translate3d(${-scroll}px, 0, 0)`;
      listRef.current.style.transition = withTransition
        ? `transform ${transitionDuration / 1000}s ease-in-out`
        : 'none';
    },
    [transitionDuration],
  );

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const { x, y } = getEventPageCoordinates(e);

    dragStartXRef.current = x;
    dragStartYRef.current = y;
    dragDeltaRef.current = 0;
    isHorizontalSwipeRef.current = null;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) {
      return;
    }

    const { x, y } = getEventPageCoordinates(e);
    const deltaX = x - dragStartXRef.current;
    const deltaY = y - dragStartYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      isHorizontalSwipeRef.current = Math.abs(deltaX) > Math.abs(deltaY);
    }

    if (isHorizontalSwipeRef.current) {
      if ('touches' in e) {
        e.preventDefault();
      }

      dragDeltaRef.current = deltaX;

      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(() => {
          updateSliderPosition(currentScroll - dragDeltaRef.current, false);
          animationFrameRef.current = null;
        });
      }
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) {
      return;
    }

    const dragOccurred = Math.abs(dragDeltaRef.current) > threshold;

    if (dragOccurred) {
      setWasDragged(true);
    }

    setIsDragging(false);

    const newScroll = Math.max(
      Math.min(currentScroll - dragDeltaRef.current, maxScroll),
      0,
    );

    setCurrentScroll(newScroll);
    updateSliderPosition(newScroll, true);

    dragDeltaRef.current = 0;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setTimeout(() => setWasDragged(false), 100);
  };

  useEffect(() => {
    const el = listRef.current;

    if (!el) {
      return;
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) {
        return;
      }

      if (isHorizontalSwipeRef.current) {
        e.preventDefault();
      }
    };

    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  useEffect(() => {
    updateSliderPosition(currentScroll, !isDragging);
  }, [currentScroll, isDragging, updateSliderPosition]);

  useEffect(() => {
    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);

    return () => window.removeEventListener('resize', updateMeasurements);
  }, [updateMeasurements]);

  const dragHandlers = {
    onMouseDown: handleDragStart,
    onMouseMove: handleDragMove,
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
    onTouchStart: handleDragStart,
    onTouchMove: handleDragMove,
    onTouchEnd: handleDragEnd,
    onTouchCancel: handleDragEnd,
  };

  return {
    listRef,
    itemRef,
    cardWidth,
    currentScroll,
    setCurrentScroll,
    maxScroll,
    isDragging,
    wasDragged,
    dragHandlers,
  };
};
