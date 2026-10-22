import { useState } from 'react';
import { useEffect } from 'react';

import styles from './ItemGallery.module.scss';

import { getImageUrl } from '../../../../shared/helpers/getImageUrl';

type Props = {
  images: string[];
};

export const ItemGallery: React.FC<Props> = ({ images }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [images]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbs}>
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`${styles.thumb} ${
              index === active ? styles.active : ''
            }`}
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1}`}
          >
            <img src={getImageUrl(image)} alt="" />
          </button>
        ))}
      </div>

      <div className={styles.main}>
        <img src={getImageUrl(images[active])} alt="" />
      </div>
    </div>
  );
};
