import { useEffect, useRef } from 'react';
import { useSliderData } from '../context/sliderContext';
import { useAnimation } from '../coreMechanics';

export const useInfinite = (
  animationSpeed: number,
  amount: number,
  gap: number,
) => {
  const { mechanics, rerender } = useSliderData();
  const { snap } = useAnimation(gap);
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
