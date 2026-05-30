import { TouchEvent, useContext, useEffect, useState, useMemo } from 'react';
import cn from 'classnames';
import { StatesContext } from '../../base/store/GlobalStateProvider';

export const ProductDetailsCarousel = () => {
  const { selectedProduct } = useContext(StatesContext);
  const [index, setIndex] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const images = useMemo(() => {
    return selectedProduct?.images?.length
      ? selectedProduct.images
      : selectedProduct?.image
        ? [selectedProduct.image]
        : [];
  }, [selectedProduct?.images, selectedProduct?.image]);

  const prev = () => {
    setIndex(prevIndex => prevIndex - 1);
  };

  const next = () => {
    setIndex(prevIndex => prevIndex + 1);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchPosition === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchPosition - currentTouch;

    if (diff > 8) {
      next();
    }

    if (diff < -8) {
      prev();
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    if (!images.length) {
      return;
    }

    const lastIndex = images.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }

    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, images]);

  if (!images.length) {
    return null;
  }

  return (
    <div className="carousel">
      <div className="carousel__container">
        <div
          className="carousel__frame"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {images.map((img, imgIdx) => {
            let position = 'nextSlide';

            if (imgIdx === index) {
              position = 'activeSlide';
            }

            if (
              imgIdx === index - 1 ||
              (index === 0 && imgIdx === images.length - 1)
            ) {
              position = 'lastSlide';
            }

            return (
              <div
                key={imgIdx}
                className={`carousel__item carousel__item--${position}`}
              >
                <img
                  src={`/${img.replace('.jpg', '.webp')}`}
                  className="carousel__item-image"
                  alt={selectedProduct?.name}
                />
              </div>
            );
          })}
        </div>

        <div className="carousel__img-preview">
          <ul className="carousel__img-preview-list">
            {images.map((img, idx) => (
              <li
                key={idx}
                className={cn('carousel__img-preview-item', {
                  'carousel__img-preview-item--active': idx === index,
                })}
              >
                <button
                  type="button"
                  className="carousel__img-preview-link"
                  onClick={() => setIndex(idx)}
                >
                  <img
                    src={`/${img.replace('.jpg', '.webp')}`}
                    className="carousel__img-preview-image"
                    alt={selectedProduct?.name}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
