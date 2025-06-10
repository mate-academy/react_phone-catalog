import { useState } from 'react';

export const useSwipe = (
  callback: (distanceX: number, distanceY: number) => void,
) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStartX(event.targetTouches[0].clientX);
    setTouchStartY(event.targetTouches[0].clientY);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    setTouchEndX(event.targetTouches[0].clientX);
    setTouchEndY(event.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    callback(touchStartX - touchEndX, touchStartY - touchEndY);
  };

  return [handleTouchStart, handleTouchMove, handleTouchEnd];
};
