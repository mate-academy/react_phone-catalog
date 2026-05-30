import type { Swipe } from '../../modules/HomePage/types/Swipe';

export const handleSwipe = ({ start, end, imgs, onCurrentIndex }: Swipe) => {
  if (!start.current || !end.current) {
    return;
  }

  const distance = start.current - end.current;
  const isLeftSwipe = distance > 50;
  const isRightSwipe = distance < -50;

  if (isLeftSwipe) {
    onCurrentIndex((prev: number) => (prev + 1) % imgs.length);
  }

  if (isRightSwipe) {
    onCurrentIndex((prev: number) => (prev - 1 + imgs.length) % imgs.length);
  }
};
