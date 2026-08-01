import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from '@shared/context';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[];
  name: string;
}

export const ProductGallery: React.FC<Props> = ({ images, name }) => {
  const { t } = useTranslation();
  const [mainImage, setMainImage] = useState(images[0]);

  // Switching a color keeps the page mounted, but brings a new set of photos.
  useEffect(() => setMainImage(images[0]), [images]);

  return (
    <div className={styles.gallery}>
      <ul className={styles.thumbnails}>
        {images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              className={cn(styles.thumbnail, {
                [styles.thumbnailActive]: image === mainImage,
              })}
              aria-label={t('details.showPhoto', { index: index + 1 })}
              onClick={() => setMainImage(image)}
            >
              <img src={image} alt="" />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.main}>
        <img src={mainImage} alt={name} />
      </div>
    </div>
  );
};
