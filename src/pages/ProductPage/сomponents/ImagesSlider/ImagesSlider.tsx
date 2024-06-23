import { useState, useEffect } from 'react';
import styles from './ImagesSlider.module.scss';

type Props = {
  photos: string[] | undefined;
};

export const ImagesSlider: React.FC<Props> = ({ photos }) => {
  const [selectedImg, setSelectedImg] = useState('');

  useEffect(() => {
    if (photos && photos.length > 0) {
      setSelectedImg(photos[0]);
    }
  }, [photos]);

  const handleImageClick = (index: number) => {
    if (photos) {
      setSelectedImg(photos[index]);
    }
  };

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <div className={styles.imagesslider}>
      <div className={styles.imagesslider__photos}>
        {photos.slice(0, 5).map((image, index) => (
          <div
            key={index}
            className={`${styles.imagesslider__photo_wrapper} ${selectedImg === image ? styles.imagesslider__photo_wrapper_active : ''}`}
          >
            <img
              className={styles.imagesslider__photo}
              src={`${image}`}
              alt={`photo-${index}`}
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>

      <div className={styles.imagesslider__mainphoto}>
        <img
          className={styles.imagesslider__photo}
          src={`${selectedImg}`}
          alt="main-photo"
        />
      </div>
    </div>
  );
};
