import React, { useState } from 'react';
import { getImageUrl } from '../../../shared/utils/getImageUrl';
import cn from 'classnames';
import styles from './ProductImages.module.scss';

interface Props {
  images: string[];
  name: string;
}

export const ProductImages: React.FC<Props> = ({ images, name }) => {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbs}>
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={cn(styles.thumb, { [styles.active]: index === active })}
            onClick={() => setActive(index)}
          >
            <img src={getImageUrl(image)} alt={`${name} view ${index + 1}`} />
          </button>
        ))}
      </div>

      <div className={styles.main}>
        <img
          src={getImageUrl(images[active])}
          alt={name}
          className={styles.mainImage}
        />
      </div>
    </div>
  );
};
