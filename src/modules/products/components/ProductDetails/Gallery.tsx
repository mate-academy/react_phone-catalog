import { useRef, useState } from 'react';

import { Button } from '@/shared/components/ui';
import { cn, getImageUrl } from '@/shared/utils';

import styles from './Gallery.module.scss';

interface Props {
  images: string[];
  className?: string;
}

export const Gallery = ({ images, className }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const startX = useRef(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    startX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0].clientX;

    if (startX.current - endX > 50) {
      handleNext();
    }

    if (endX - startX.current > 50) {
      handlePrev();
    }
  };

  return (
    <div className={cn(styles.gallery, className)}>
      <div
        className={styles.mainImage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={getImageUrl(images[currentIndex])}
          alt={`Product ${currentIndex + 1}`}
          draggable={false}
        />
      </div>

      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <Button
            key={image}
            className={cn(styles.thumbnails__item, {
              [styles.active]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={getImageUrl(image)}
              alt={`Product preview ${index + 1}`}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};
