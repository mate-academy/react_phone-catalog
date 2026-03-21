import React, { useState, useEffect, TouchEvent } from 'react';
import cn from 'classnames';
import styles from './ProductGallery.module.scss';
import placeholderImage from '@/assets/img/ProductNotFound.png';

interface Props {
  images: string[];
  name: string;
}

export const ProductGallery: React.FC<Props> = ({ images, name }) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // === HELPER TO FIX IMAGE PATH ===
  const getFullImageUrl = (url: string) => {
    return url.startsWith('http') || url.startsWith('/')
      ? url
      : `${import.meta.env.BASE_URL}${url}`.replace(/\/+/g, '/');
  };

  const [selectedImage, setSelectedImage] = useState(
    getFullImageUrl(images[0]) || placeholderImage,
  );

  //======SWIPE IMAGE
  const navigateImage = (direction: 'next' | 'prev') => {
    const currentIndex = images.findIndex(
      img => getFullImageUrl(img) === selectedImage,
    );

    if (direction === 'next' && currentIndex < images.length - 1) {
      setSelectedImage(getFullImageUrl(images[currentIndex + 1]));
    } else if (direction === 'prev' && currentIndex > 0) {
      setSelectedImage(getFullImageUrl(images[currentIndex - 1]));
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigateImage('next');
    }

    if (isRightSwipe) {
      navigateImage('prev');
    }
  };

  //======Effect to reset the main image when the images array changes
  //====== (e.g., when switching to a different ///product color/variant)
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(getFullImageUrl(images[0]));
    }
  }, [images]);

  if (images.length === 0) {
    return (
      <div className={styles.noImages}>
        <img
          src={placeholderImage}
          alt="Product has no images"
          className={styles.mainImage}
        />
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      {images.length > 0 && (
        <div className={styles.thumbnails}>
          {images.map(img => (
            <button
              key={img}
              type="button"
              className={cn(styles.thumbLink, {
                [styles.thumbLinkActive]:
                  selectedImage === getFullImageUrl(img),
              })}
              onClick={() => setSelectedImage(getFullImageUrl(img))}
            >
              <img
                src={getFullImageUrl(img)}
                alt={name}
                className={styles.thumbImage}
              />
            </button>
          ))}
        </div>
      )}

      <div
        className={cn(styles.mainImageContainer, {
          [styles.mainImageContainerOnly]: images.length === 0,
        })}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={selectedImage}
          alt={images.length > 0 ? name : 'Product not found'}
          className={styles.mainImage}
        />
      </div>
    </div>
  );
};
