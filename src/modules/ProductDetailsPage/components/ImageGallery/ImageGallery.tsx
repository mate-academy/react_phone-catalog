import { useState } from 'react';
import styles from './ImageGallery.module.scss';
import { assetUrl } from '../../../shared/utils';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[selectedIndex];

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img
          src={assetUrl(selectedImage)}
          alt={`Product image ${selectedIndex + 1}`}
          className={styles.image}
        />
      </div>
      {images.length > 1 && (
        <div
          className={styles.thumbnails}
          role="list"
          aria-label="Product images"
        >
          {images.map((image, index) => (
            <button
              key={image}
              className={styles.thumbnail}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : 'false'}
            >
              <img
                src={assetUrl(image)}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
