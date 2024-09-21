import { TouchEvent, useContext, useEffect, useState } from 'react';
import { StatesContext } from '../../store/GlobalStateProvider';
import cn from 'classnames';

export const ProductDetailsCarousel = () => {
  const { selectedProduct } = useContext(StatesContext);
  const [index, setIndex] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const prev = () => {
    setIndex(index - 1);
  };

  const next = () => {
    setIndex(index + 1);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 8) {
      next();
    }

    if (diff < -8) {
      prev();
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    if (selectedProduct) {
      const lastIndex = selectedProduct.images.length - 1;

      if (index < 0) {
        setIndex(lastIndex);
      }

      if (index > lastIndex) {
        setIndex(0);
      }
    }
  }, [index, selectedProduct]);

  if (selectedProduct) {
    return (
      <div className="carousel">
        <div className="carousel__container">
          <div
            className="carousel__frame"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {selectedProduct.images.map((img, imgIdx) => {
              let position = 'nextSlide';

              if (imgIdx === index) {
                position = 'activeSlide';
              }

              if (
                imgIdx === index - 1 ||
                (index === 0 && imgIdx === selectedProduct.images.length - 1)
              ) {
                position = 'lastSlide';
              }

              return (
                <div
                  key={imgIdx + 1}
                  className={`carousel__item carousel__item--${position}`}
                >
                  <img
                    src={`../${img}`}
                    className="carousel__image"
                    alt={selectedProduct.name}
                  />
                </div>
              );
            })}
          </div>
          <div className="carousel__img-preview">
            <ul className="carousel__img-preview-list">
              {selectedProduct.images.map((img, idx) => (
                <li
                  key={idx + 1}
                  className={cn('carousel__img-preview-item', {
                    'carousel__img-preview-item--active': idx === index,
                  })}
                >
                  <a
                    className="carousel__img-preview-link"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      setIndex(idx);
                    }}
                  >
                    <img
                      src={`../${img}`}
                      className="carousel__img-preview-image"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return;
};
