import React, { useEffect, useState } from 'react';
import styles from './ThumbnailGallery.module.scss';
import cn from 'classnames';

type Props = {
  imageUrls: string[];
  name: string;
};

export const ThumbnailGallery: React.FC<Props> = ({ imageUrls, name }) => {
  const [mainImgUrl, setMainImgUrl] = useState(imageUrls[0]);

  useEffect(() => {
    setMainImgUrl(imageUrls[0]);
  }, [imageUrls]);

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__content}>
        <div className={styles['gallery__thumbnails-wrapper']}>
          <div className={styles.gallery__thumbnails}>
            {imageUrls.map(imgUrl => {
              return (
                <img
                  key={imgUrl}
                  src={imgUrl}
                  alt={name}
                  className={cn(styles.gallery__thumbnail, {
                    [styles['gallery__thumbnail--active']]:
                      imgUrl === mainImgUrl,
                  })}
                  onClick={() => {
                    setMainImgUrl(imgUrl);
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className={styles['gallery__main-image-wrapper']}>
          <img
            src={mainImgUrl}
            alt={name}
            className={styles['gallery__main-image']}
          />
        </div>
      </div>
    </div>
  );
};
