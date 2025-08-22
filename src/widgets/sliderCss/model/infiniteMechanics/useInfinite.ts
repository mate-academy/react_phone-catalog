import { useCallback, useEffect } from 'react';
import { useSliderData } from '../context/sliderContext';
import { useSliderMath } from '../coreMechanics';
import { manipulate } from '../helpers';

type Props = {
  amount: number;
};

export const useInfinite = ({ amount }: Props) => {
  const { setActiveIndex, activeIndex } = useSliderData();
  const { DOM } = useSliderData();
  const { math } = useSliderMath();

  const transition = useCallback((pos: number) => {
    setTimeout(() => {
      manipulate.toggleTrackClass(DOM.track.current as HTMLDivElement, false);
      math.updateOffset(pos);
      setActiveIndex(pos);
    }, 300);
  }, []);

  useEffect(() => {
    if (activeIndex < 1) {
      transition(amount);
    } else if (activeIndex > amount) {
      transition(1);
    }
  }, [activeIndex]);
};
