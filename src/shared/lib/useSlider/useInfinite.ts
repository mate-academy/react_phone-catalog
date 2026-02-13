import { useEffect, useRef } from 'react';
import { useSliderData } from './sliderContext';
import { useAnimation } from './useAnimation';

export const useInfinite = (
  amount: number,
  animationSpeed: number,
  gap: number,
) => {
  const { mechanics, rerender } = useSliderData();
  const { snap } = useAnimation(gap);
  const isTransitioning = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const transition = (pos: number) => {
    if (isTransitioning.current) {
      return;
    }

    isTransitioning.current = true;
    timeoutRef.current = setTimeout(() => {
      snap(pos, false);
      rerender();
      isTransitioning.current = false;
    }, animationSpeed);
  };

  useEffect(() => {
    if (mechanics.index.current < 1) {
      transition(amount);
    } else if (mechanics.index.current > amount) {
      transition(1);
    }
  }, [rerender]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};
