import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../../types/Image';
import styles from './TouchSlider.module.scss';

type Props = {
  images?: Image[];
  imageUrls?: string[];
  order: number;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
};

export const TouchSlider: React.FC<Props> = ({
  imageUrls = [],
  images,
  order,
  setOrder,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<number>(0);
  const [endPosition, setEndPosition] = useState<number>(0);

  const getPositionX = (e: React.TouchEvent<HTMLUListElement>) => {
    return e.touches[0].clientX;
  };

  const handleActionStart = (e: React.TouchEvent<HTMLUListElement>) => {
    setIsDragging(true);
    setStartPosition(getPositionX(e));
  };

  const handleActionMove = (e: React.TouchEvent<HTMLUListElement>) => {
    if (isDragging) {
      setEndPosition(getPositionX(e));
    }
  };

  const handleActionEnd = () => {
    setIsDragging(false);

    const positionsDifference = startPosition - endPosition;

    if (positionsDifference < 50 && positionsDifference > -50) {
      return;
    }

    const numberOfImages = images?.length ? images.length : imageUrls.length;

    if (positionsDifference < 0) {
      setOrder(prev => (prev === 0 ? numberOfImages - 1 : prev - 1));
    } else {
      setOrder(prev => (prev === numberOfImages - 1 ? 0 : order + 1));
    }
  };

  return (
    <div className={styles.block}>
      <ul
        className={styles.list}
        onDragStart={e => {
          e.preventDefault();
        }}
        onTouchStart={e => handleActionStart(e)}
        onTouchEnd={() => handleActionEnd()}
        onTouchMove={e => handleActionMove(e)}
        style={{ translate: `${-100 * order}%` }}
      >
        {images &&
          images.map(img => {
            return (
              <li key={img.url} className={styles.item}>
                <Link to={img.link}>
                  <img
                    src={img.url}
                    alt={img.alt}
                    className={styles.image}
                    loading="lazy"
                  />
                </Link>
              </li>
            );
          })}

        {!images &&
          !!imageUrls &&
          imageUrls.map(img => {
            return (
              <li key={img} className={styles.item}>
                <img src={img} alt="image name" className={styles.image} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
