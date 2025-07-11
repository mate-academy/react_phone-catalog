import { useEffect, useState } from 'react';
import styles from './Gallery.module.scss';

interface Props {
  photos: string[];
}

export const Gallery = ({ photos }: Props) => {
  const [mainPhoto, setMainPhoto] = useState(photos[0]);

  useEffect(() => {
    setMainPhoto(photos[0]);
  }, [photos]);

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__mini}>
        {photos.map((photo: string) => (
          <div
            className={`
                ${styles.gallery__miniPhoto} 
                ${photo === mainPhoto ? styles.gallery__miniPhoto_active : ''}
              `}
            key={photo}
            onClick={() => setMainPhoto(photo)}
          >
            <img src={'/' + photo} alt="" />
          </div>
        ))}
      </div>
      <div className={styles.gallery__mainPhoto}>
        <img src={'/' + mainPhoto} alt="phone" />
      </div>
    </div>
  );
};
