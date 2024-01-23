import { useEffect, useState } from 'react';

export const Carousel = () => {
  const images = [
    { link: 'img/banner-phones.png', id: 1 },
    { link: 'img/banner-accessories.png', id: 2 },
    { link: 'img/banner-tablets.png', id: 3 },
  ];

  const [currentPosition, setCurrentPosition] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  const width = window.outerWidth;
  const itemWidth = width >= 1136
    ? 1040
    : width - 2 * (32 + 16);
  const firstPosition = 0;
  const lastPosition = -itemWidth * (images.length - 1);

  const slideBack = () => {
    setIsAuto(false);

    if (currentPosition >= firstPosition) {
      setCurrentPosition(lastPosition);

      return;
    }

    setCurrentPosition(prev => prev + itemWidth);
  };

  const slideNext = () => {
    setIsAuto(false);

    if (currentPosition <= lastPosition) {
      setCurrentPosition(firstPosition);

      return;
    }

    setCurrentPosition(prev => prev - itemWidth);
  };

  const autoSlide = () => {
    if (isAuto) {
      if (currentPosition <= lastPosition) {
        setCurrentPosition(firstPosition);

        return;
      }

      setCurrentPosition(prev => prev - itemWidth);
    }
  };

  useEffect(() => {
    if (isAuto) {
      setTimeout(() => {
        autoSlide();
      }, 5000);
    }
  }, [currentPosition]);

  return (
    <div
      className="carousel"
    >
      <button
        type="button"
        className="carousel_button"
        onClick={slideBack}
      >
        {'<'}
      </button>

      <div
        className="carousel_window"
      >
        {images.map(img => (
          <img
            key={img.id}
            src={img.link}
            alt={`img${img.id}`}
            className="carousel_window_img"
            style={{
              width: `${itemWidth}px`,
              transform: `translateX(${currentPosition}px)`,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        className="carousel_button"
        onClick={slideNext}
      >
        {'>'}
      </button>
    </div>
  );
};
