import styles from './ProductGallery.module.scss';

import { useState } from 'react';
import classNames from 'classnames';

type Props = {
  images: string[];
  altText: string;
};

export const ProductGallery: React.FC<Props> = ({ images, altText }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return null;
  }

  const handleThumbnailClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__mainImageWrapper}>
        <img
          src={mainImage}
          alt={altText}
          className={styles.gallery__mainImage}
        />
      </div>
      <div className={styles.gallery__thumbnails}>
        {images.map(image => (
          <div
            key={image}
            className={classNames(styles.gallery__thumbnailItem, {
              [styles['gallery__thumbnailItem--active']]: image === mainImage,
            })}
            onClick={() => handleThumbnailClick(image)}
          >
            <img
              src={image}
              alt={`Thumbnail of ${altText}`}
              className={styles.gallery__thumbnailImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
