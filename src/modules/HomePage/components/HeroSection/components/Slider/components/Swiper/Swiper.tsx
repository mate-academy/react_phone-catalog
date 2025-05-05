import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  onSwipe: ({ deltaX }: { deltaX: number }) => void;
}

export const Swiper: React.FC<Props> = ({ children, onSwipe }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      return;
    }

    event.preventDefault();

    setStartX(event.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        return;
      }

      event.preventDefault();

      const endX = event.changedTouches[0].clientX;
      const deltaX = endX - startX;

      onSwipe({ deltaX });
    },
    [startX, onSwipe],
  );

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return (
    <div
      ref={wrapperRef}
      style={{ touchAction: 'none', width: 'fit-content', margin: '0 auto' }}
    >
      {children}
    </div>
  );
};
