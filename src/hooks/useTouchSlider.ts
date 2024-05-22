import { useState, useCallback } from 'react';

type UseTouchSliderProps = {
  onPrevSlide: () => void;
  onNextSlide: () => void;
};

const useTouchSlider = ({ onPrevSlide, onNextSlide }: UseTouchSliderProps) => {
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = useCallback(
    (
      e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
    ) => {
      e.preventDefault(); // Prevent default drag-and-drop behavior
      setStartX('touches' in e ? e.touches[0].clientX : e.clientX);
    },
    [],
  );

  const handleTouchMove = useCallback(
    (
      e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
    ) => {
      if (startX === null) {
        return;
      }

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - startX;
      const threshold = 50;

      if (deltaX > threshold) {
        onPrevSlide();
        setStartX(null);
      } else if (deltaX < -threshold) {
        onNextSlide();
        setStartX(null);
      }
    },
    [startX, onPrevSlide, onNextSlide],
  );

  const handleTouchEnd = useCallback(() => {
    setStartX(null);
  }, []);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useTouchSlider;
