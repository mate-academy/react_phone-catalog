import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../../types/Image';

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
    <div className="touch-slider">
      <div className="touch-slider__container">
        <ul
          className="touch-slider__list"
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
                <li key={img.url} className="touch-slider__item">
                  <Link to={img.link} className="touch-slider__link">
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="touch-slider__image"
                    />
                  </Link>
                </li>
              );
            })}

          {!images &&
            !!imageUrls &&
            imageUrls.map(img => {
              return (
                <li key={img} className="touch-slider__item">
                  <img
                    src={img}
                    alt="image name"
                    className="touch-slider__image"
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
