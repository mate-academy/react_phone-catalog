import { useState } from 'react';
import { Accessory, Phone, Tablet } from '../../../api/types';
import scss from './ProductGallery.module.scss';
import classNames from 'classnames';

interface Props {
  item: Phone | Tablet | Accessory;
}

export const ProductGallery: React.FC<Props> = ({ item }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const images = Array.from(item.images);

  const handleImageChange = (index: number) => {
    setCurrentImage(index);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    const touchEnd = e.changedTouches[0].clientX;

    const deltaX = touchStart - touchEnd;
    const SWIPE_THRESHOLD = 50;

    if (deltaX > SWIPE_THRESHOLD) {
      setCurrentImage(current =>
        current === images.length - 1 ? 0 : current + 1,
      );
    }

    if (deltaX < -SWIPE_THRESHOLD) {
      setCurrentImage(current =>
        current === 0 ? images.length - 1 : current - 1,
      );
    }
  };

  return (
    <section className={scss.productGallery} aria-label="Product gallery">
      <img
        src={`/${images[currentImage]}`}
        className={scss.productGallery__image}
        alt={item.name}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      ></img>
      <ul className={scss.productGallery__thumbnails}>
        {images.map((imageUrl, index) => {
          return (
            <li key={imageUrl}>
              <button
                type="button"
                className={scss.productGallery__button}
                onClick={() => handleImageChange(index)}
              >
                <img
                  src={`/${imageUrl}`}
                  className={classNames(scss.productGallery__thumbnail, {
                    [scss.productGallery__thumbnail_active]:
                      index === currentImage,
                  })}
                  alt={item.name}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
