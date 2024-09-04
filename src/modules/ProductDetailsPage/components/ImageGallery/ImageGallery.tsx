import React, { useState, useEffect } from 'react';
import styles from './ImageGallery.module.scss';
import { useAppContext } from '../../../../context/AppContext';

export const ImageGallery: React.FC = () => {
  const { productDetails } = useAppContext();
  const [images, setImages] = useState<string[]>([]);
  const [zoomedImage, setZoomedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (productDetails && productDetails.images) {
      setImages(productDetails.images);
    }
  }, [productDetails]);

  useEffect(() => {
    if (images.length > 0) {
      setZoomedImage(images[0]);
    }
  }, [images]);

  const handleClick = (index: number) => {
    setZoomedImage(images[index]);
  };

  return (
    <div className={styles.imageGallery}>
      <div className={styles.thumbnailContainerTablet}>
        {images.map((item: string, index: number) => (
          <img
            key={index}
            src={item}
            className={styles.thumbnail}
            alt={`Thumbnail ${index}`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      <div className={styles.mainImageContainer}>
        {zoomedImage && (
          <img
            src={zoomedImage}
            alt="Main zoomed"
          />
        )}
      </div>

      <div className={styles.thumbnailContainerMobile}>
        <img
          src="https://placehold.co/380x380.png"
          className={styles.selectedThumbnail}
          alt="Mobile placeholder" // Dodaj atrybut alt dla lepszej dostępności
        />
      </div>
    </div>
  );
};
