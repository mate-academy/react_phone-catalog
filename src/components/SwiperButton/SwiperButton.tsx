import { FC, ReactNode } from 'react';
import { useSwiper } from 'swiper/react';

interface SwiperButtonProps {
  children: ReactNode;
  direction: 'next' | 'prev';
  className?: string;
}

export const SwiperButton: FC<SwiperButtonProps> = ({
  children,
  direction,
  className,
}) => {
  const swiper = useSwiper();

  const handleClick = () => {
    if (direction === 'next') {
      swiper.slideNext();
    } else if (direction === 'prev') {
      swiper.slidePrev();
    }
  };

  return (
    <button onClick={handleClick} className={`${className}`}>
      {children}
    </button>
  );
};
