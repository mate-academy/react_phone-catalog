import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { getAssetUrl } from '../../../shared/utils/assets';
import styles from './ProductGallery.module.scss';

type Props = {
  images: string[];
  name: string;
};

export const ProductGallery = ({ images, name }: Props) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbs}>
        {images.map(image => (
          <button
            key={image}
            type="button"
            className={classNames(styles.thumb, {
              [styles.thumbActive]: selectedImage === image,
            })}
            onClick={() => setSelectedImage(image)}
          >
            <img src={getAssetUrl(image)} alt="" />
          </button>
        ))}
      </div>

      <div className={styles.mainImage}>
        <img src={getAssetUrl(selectedImage)} alt={name} />
      </div>
    </div>
  );
};
