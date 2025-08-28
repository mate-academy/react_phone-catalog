import { useEffect, useRef } from 'react';
import { useSliderData, visualConfig } from '..';
import { useAnimation } from '.';

export const useInfinite = (amount: number) => {
  const { animationSpeed } = visualConfig;
  const { mechanics, rerender } = useSliderData();
  const { snap } = useAnimation();
  const isTransitioning = useRef<boolean>(false);

  const transition = (pos: number) => {
    if (isTransitioning.current) {
      return;
    }

    isTransitioning.current = true;
    setTimeout(() => {
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
};
