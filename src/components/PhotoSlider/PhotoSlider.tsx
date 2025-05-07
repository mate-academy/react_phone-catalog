import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import styles from './PhotoSlider.module.scss';

interface Props {
  photos: string[];
}

export const PhotoSlider: React.FC<Props> = ({ photos }) => {
  const [photoId, setPhotoId] = useState(0);
  const { itemName } = useParams();

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isMobile) {
      setTouchStartX(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isMobile) {
      setTouchEndX(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      if (touchStartX - touchEndX > 50) {
        setPhotoId(prev => (prev + 1) % (photos.length || 1));
      }

      if (touchEndX - touchStartX > 50) {
        setPhotoId(
          prev => (prev - 1 + (photos.length || 1)) % (photos.length || 1),
        );
      }
    }
  };

  return (
    <div className={styles.photoSlider}>
      <img
        src={photos[photoId]}
        alt={itemName}
        className={styles.photoSlider__main}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className={styles.photoSlider__list}>
        {photos.map((imgSrc, i) => (
          <img
            key={imgSrc}
            src={imgSrc}
            alt={itemName}
            className={classNames(styles.photoSlider__photo, {
              [styles['photoSlider__photo--active']]: i === photoId,
            })}
            onClick={() => setPhotoId(i)}
          />
        ))}
      </div>
    </div>
  );
};
