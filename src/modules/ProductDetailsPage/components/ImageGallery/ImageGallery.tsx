import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from './ImageGallery.module.scss';

type Props = {
  images: string[];
};

export const ImageGallery: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailsClick = (index: number) => {
    setActiveIndex(index);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  if (!images || images.length === 0) {
    return (
      <div className={styles.imageGallery}>
        <div className={styles.imageGallery__placeHolder}>
          Oops!.. Looks like there are no images available
        </div>
      </div>
    );
  }

  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageGallery__container}>
        <div className={styles.imageGallery__mainDisplay} {...swipeHandlers}>
          <div className={styles.imageGallery__imageWrapper}>
            <img
              src={images[activeIndex]}
              alt={` Image ${activeIndex + 1}`}
              className={styles.imageGallery__mainImage}
            />
          </div>

          {images.length > 1 && (
            <div className={styles.imageGallery__thumbnails}>
              <div className={styles.imageGallery__thumbnailsContainer}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.imageGallery__thumbnail} ${
                      index === activeIndex
                        ? styles.imageGallery__thumbnailActive
                        : ''
                    }`}
                    onClick={() => handleThumbnailsClick(index)}
                  >
                    <img
                      src={image}
                      alt={`thumbnail ${activeIndex + 1}`}
                      className={styles.imageGallery__thumbnailImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
