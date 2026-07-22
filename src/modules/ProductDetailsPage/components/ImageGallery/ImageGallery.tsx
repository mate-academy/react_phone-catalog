import classNames from 'classnames';

import React, { useRef, useState } from 'react';
import styles from './ImageGallery.module.scss';

type Props = {
  images: string[];
};

export const ImageGallery: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const container = mainRef.current;

    if (!container) {
      return;
    }

    const slideWidth = container.clientWidth;

    container.scrollTo({ left: slideWidth * index, behavior: 'smooth' });

    setActiveIndex(index);
  };

  const handleScroll = () => {
    const container = mainRef.current;

    if (!container) {
      return;
    }

    const slideWidth = container.clientWidth;
    const index = Math.round(container.scrollLeft / slideWidth);

    setActiveIndex(index);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryMain} ref={mainRef} onScroll={handleScroll}>
        {images.map(image => (
          <div key={image} className={styles.galleryImageSlide}>
            <img
              src={`/${image}`}
              alt="product"
              className={styles.galleryImageProduct}
            />
          </div>
        ))}
      </div>

      <div className={styles.galleryThumbs}>
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={classNames(styles.galleryThumb, {
              [styles.isActive]: index === activeIndex,
            })}
            onClick={() => scrollToIndex(index)}
          >
            <img
              src={`/${image}`}
              alt="thumbnail"
              className={styles.galleryThumbImage}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
