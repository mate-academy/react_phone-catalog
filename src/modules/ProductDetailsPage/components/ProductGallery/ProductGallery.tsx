import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useLanguage } from '../../../../context/LanguageContext';
import { getPublicPath } from '../../../../utils/getPublicPath';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<Props> = ({ images, productName }) => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setSelectedImage(0);
  }, [images]);

  const selectAdjacentImage = (direction: -1 | 1) => {
    setSelectedImage(currentImage => {
      const nextImage = currentImage + direction;

      if (nextImage < 0) {
        return images.length - 1;
      }

      if (nextImage >= images.length) {
        return 0;
      }

      return nextImage;
    });
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - touchStartX.current;

    touchStartX.current = null;

    if (Math.abs(distance) < 40) {
      return;
    }

    selectAdjacentImage(distance > 0 ? -1 : 1);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={cn(styles.thumbnail, {
              [styles.isSelected]: selectedImage === index,
            })}
            onClick={() => setSelectedImage(index)}
            aria-label={t('product.showImage', { number: index + 1 })}
          >
            <img src={getPublicPath(image)} alt="" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div
        className={styles.mainImage}
        onTouchStart={event => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStartX.current = null;
        }}
      >
        <img src={getPublicPath(images[selectedImage])} alt={productName} />
      </div>
    </div>
  );
};
