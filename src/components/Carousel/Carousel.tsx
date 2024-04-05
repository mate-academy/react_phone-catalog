import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [startImage, setStartImage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let imageName = 'small.jpg';

  const handlePrevImage = () => {
    if (startImage === 0) {
      setStartImage(images.length - 1);
    } else {
      setStartImage(prevStartImage => prevStartImage - 1);
    }
  };

  const handleNextImage = useCallback(() => {
    if (startImage >= images.length - 1) {
      setStartImage(0);
    } else {
      setStartImage(prevStartImage =>
        Math.min(images.length - 1, prevStartImage + 1),
      );
    }
  }, [images.length, startImage]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const interval = setInterval(() => {
      handleNextImage();
    }, 5000);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [handleNextImage]);

  if (startImage > images.length - 1) {
    setStartImage(images.length - 1);
  }

  let blocklWidth = windowWidth;
  let carouselContainewWidth = blocklWidth;
  let carouselWidth = carouselContainewWidth * images.length;
  let buttonWidth = carouselContainewWidth * 0.4;

  if (windowWidth >= 640) {
    blocklWidth = windowWidth - 48;
    imageName = 'big.jpg';
    buttonWidth = 32;
    carouselContainewWidth = blocklWidth - buttonWidth * 2 - 32;
    carouselWidth = carouselContainewWidth * images.length;
  }

  if (windowWidth >= 1200) {
    blocklWidth = Math.min(1136, windowWidth - 48);
    carouselContainewWidth = blocklWidth - buttonWidth * 2 - 32;
    carouselWidth = carouselContainewWidth * images.length;
  }

  const translateX = startImage * carouselContainewWidth;

  return (
    <div className="Carousel">
      <button
        type="button"
        className="Carousel__button button button--active button--prev"
        onClick={handlePrevImage}
        style={{
          width: `${buttonWidth}px`,
        }}
      ></button>
      <div
        className="Carousel__container"
        style={{
          width: `${carouselContainewWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${translateX}px)`,
            width: `${carouselWidth}px`,
          }}
        >
          {images.map((image, index) => (
            <li key={image} className="Carousel__item">
              <img
                src={`${image}_${imageName}`}
                alt={`banner_${index + 1}`}
                className="Carousel__image"
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="Carousel__button button  button--active button--next"
        data-cy="next"
        onClick={handleNextImage}
        style={{
          width: `${buttonWidth}px`,
        }}
      ></button>
      <div className="Carousel__dots">
        {images.map((_, index) => (
          <div
            onClick={() => setStartImage(index)}
            className={classNames('Carousel__dot', {
              'Carousel__dot--active': index === startImage,
            })}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
