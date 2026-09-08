import { useState } from 'react';
import styles from './galleryImg.module.scss';

type Props = {
  images: string[];
};

export const GalleryImg: React.FC<Props> = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : prev));
    }

    if (distance < -minSwipeDistance) {
      setSelectedImage(prev => (prev > 0 ? prev - 1 : prev));
    }
  };

  return (
    <div className={styles.galleryImg}>
      <div
        className={styles.bigImgBlock}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[selectedImage]}
          alt="Product"
          className={styles.bigImg}
        />
      </div>

      <div className={styles.smallImgBlock}>
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`${styles.smallImgBtn} ${
              selectedImage === index ? styles.active : ''
            }`}
          >
            <img
              src={img}
              alt={`Product ${index}`}
              className={styles.smallImg}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
