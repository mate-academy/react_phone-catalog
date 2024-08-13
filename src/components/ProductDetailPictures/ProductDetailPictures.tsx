import cn from 'classnames';
import { useEffect, useState } from 'react';

import styles from './ProductDetailPictures.module.scss';

type Props = {
  images: string[] | undefined;
};

export const ProductDetailPictures: React.FC<Props> = ({ images = [] }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  useEffect(() => {
    setCurrentImageUrl(images[0]);
  }, [images]);

  const handleSelectImage = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.pictures}>
        {images.map(imageUrl => (
          <div
            key={imageUrl}
            onClick={() => handleSelectImage(imageUrl)}
            className={cn(styles.item, {
              [styles['item--active']]:
                currentImageUrl === imageUrl ||
                (imageUrl === images[0] && !currentImageUrl),
            })}
          >
            <img className={styles.picture} src={imageUrl} alt="picture" />
          </div>
        ))}
      </div>

      <img
        className={styles.picturePrimary}
        src={currentImageUrl || images[0]}
        alt="picture"
      />
    </div>
  );
};
