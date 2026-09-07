import { useCallback, useEffect, useRef, useState } from 'react';
import { getEventPageCoordinates } from '../utils';

type UsePixelScrollDragSliderOptions = {
  transitionDuration?: number;
  threshold?: number;
  inertiaMultiplier?: number;
  minVelocity?: number;
};

export const usePixelScrollDragSlider = ({
  transitionDuration = 300,
  threshold = 10,
  inertiaMultiplier = 200,
  minVelocity = 0.5,
}: UsePixelScrollDragSliderOptions) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const dragStartTimeRef = useRef(0);
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
    (scroll: number, withTransition: boolean, easing: string = 'ease-out') => {
      if (!listRef.current) {
        return;
      }

      listRef.current.style.transform = `translate3d(${-scroll}px, 0, 0)`;
      listRef.current.style.transition = withTransition
        ? `transform ${transitionDuration / 1000}s ${easing}`
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
    dragStartTimeRef.current = Date.now();
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
      dragDeltaRef.current = deltaX;
      updateSliderPosition(currentScroll - dragDeltaRef.current, false);
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

    const dragDistance = dragDeltaRef.current;
    const dragDuration = Date.now() - dragStartTimeRef.current;
    const velocity = dragDistance / dragDuration;
    const useInertia = Math.abs(velocity) > minVelocity;
    const inertiaOffset = useInertia ? velocity * inertiaMultiplier : 0;
    const totalOffset = dragDistance + inertiaOffset;
    const newScroll = Math.max(
      Math.min(currentScroll - totalOffset, maxScroll),
      0,
    );

    setCurrentScroll(newScroll);
    updateSliderPosition(newScroll, true);
    dragDeltaRef.current = 0;
    setTimeout(() => setWasDragged(false), 100);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) {
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
    wrapperRef,
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
