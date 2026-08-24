import { useState } from 'react';

interface Props {
  itemsLength: number;
  step: number;
  frameSize: number;
}

export const useSlider = ({ itemsLength, step, frameSize }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, itemsLength - frameSize);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= maxIndex;

  const prevButton = () => {
    setCurrentIndex(prev => Math.max(prev - step, 0));
  };

  const nextButton = () => {
    setCurrentIndex(prev => Math.min(prev + step, maxIndex));
  };

  return {
    currentIndex,
    setCurrentIndex,
    maxIndex,
    isPrevDisabled,
    isNextDisabled,
    prevButton,
    nextButton,
  };
};
