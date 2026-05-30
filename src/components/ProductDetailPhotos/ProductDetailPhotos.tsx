import { useState } from 'react';
import { Accessory } from '../../types/AccessorieTypes';
import { Phone } from '../../types/PhoneTypes';
import { Tablet } from '../../types/TabletType';
import styles from '../ProductDetailPhotos/ProductDetailPhotosStyles.module.scss';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const ProductDetailPhotos: React.FC<Props> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [isFading, setIsFading] = useState(false);

  const handleClick = (img: string) => {
    if (img === currentImage) return;

    setIsFading(true);

    setTimeout(() => {
      setCurrentImage(img);
      setIsFading(false);
    }, 200);
  };

  return (
    <div className={styles.photoSliders}>
      <div className={styles.productContainerPhoto}>
        <img
          src={currentImage}
          alt={product.name}
          className={`${styles.productPhoto} ${isFading ? styles.fadeOut : ''}`}
        />
      </div>

      <div className={styles.miniPhotosContainer}>
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${product.name} photo ${i + 1}`}
            onClick={() => handleClick(img)}
            className={`${styles.miniPhotos} ${currentImage === img ? styles.activePhoto : ''}`}
          />
        ))}
      </div>
    </div>
  );
};
