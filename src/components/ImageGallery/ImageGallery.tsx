import { useState, TouchEvent } from 'react';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  product: {
    name: string;
    images: string[];
  };
}

function ImageGallery({ product }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = product.images || [];
  const selectedImage = images[activeIndex] || '';

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveIndex(prev => (prev + 1 < images.length ? prev + 1 : prev));
    } else if (isRightSwipe) {
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    }
  };

  return (
    <div className={styles.galleryContainer}>
      <div
        className={styles.mainImage}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <img src={selectedImage} alt={product.name} draggable="false" />
      </div>

      <div className={styles.sideThumbnails}>
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`${styles.thumbnailBtn} ${selectedImage === img ? styles.active : ''}`}
            aria-label={`Show image ${i + 1}`}
          >
            <img src={img} alt={`${product.name} ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
