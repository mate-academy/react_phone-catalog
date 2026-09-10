import classNames from 'classnames';
import styles from './ProductGallery.module.scss';
import { useRef, useState } from 'react';

interface Props {
  images: string[];
  productName: string;
  className?: string;
}

const SWIPE_THRESHOLD = 100;

export const ProductGallery = ({ images, productName, className }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleImgButtonClick = (imgIndex: number) => {
    setActiveIndex(imgIndex);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.changedTouches[0].clientX;

    const diff = touchStartX.current - touchEndX.current;

    if (diff >= SWIPE_THRESHOLD) {
      setActiveIndex(currentIndex =>
        currentIndex + 1 >= images.length ? currentIndex : currentIndex + 1,
      );
    }

    if (diff <= -SWIPE_THRESHOLD) {
      setActiveIndex(currentIndex =>
        currentIndex - 1 < 0 ? currentIndex : currentIndex - 1,
      );
    }
  };

  return (
    <div className={classNames(styles.productGallery, className)}>
      <div
        className={styles.activeImgContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={`${productName} selected photo`}
            className={classNames(styles.img, styles.activeImg, {
              [styles.isActive]: index === activeIndex,
            })}
          />
        ))}
      </div>

      <div className={styles.imgsList}>
        {images.map((img, index) => (
          <button
            key={img}
            className={classNames(styles.imgButton, {
              [styles.isActive]: index === activeIndex,
            })}
            onClick={() => handleImgButtonClick(index)}
          >
            <img
              src={img}
              alt={`${productName} photo ${index + 1}`}
              className={styles.img}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
