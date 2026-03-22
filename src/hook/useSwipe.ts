import { useRef, useState } from 'react';

interface UseSwipeProps {
  images: string[];
}

export const useSwipe = ({ images }: UseSwipeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startXRef = useRef(0);

  const nextBunner = () =>
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);

  const previosBunner = () =>
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length,
    );

  const handleTouchStart = (event: React.TouchEvent) => {
    startXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const endX = event.changedTouches[0].clientX;

    if (startXRef.current - endX > 50) {
      nextBunner();
    } else if (endX - startXRef.current > 50) {
      previosBunner();
    }
  };

  return {
    currentIndex,
    setCurrentIndex,
    nextBunner,
    previosBunner,
    handleTouchStart,
    handleTouchEnd,
  };
};
