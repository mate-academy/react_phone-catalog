import { useEffect, useRef, useState } from 'react';
import './PicturesSlider.scss';
import classNames from 'classnames';

const images = [
  require('../../img/picturesSlider/watch.png'),
  require('../../img/picturesSlider/iphone.png'),
  require('../../img/picturesSlider/ipad.png'),
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameSize, setFrameSize] = useState(0);
  const lastIndex = images.length - 1;
  const transformValue = frameSize * currentIndex;
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (banner.current) {
      setFrameSize(banner.current.offsetWidth);
    }
  }, [currentIndex]);

  const handleLeft = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(lastIndex);
    }
  };

  const handleRight = () => {
    if (currentIndex !== lastIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleRight();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="carousel">
      <div className="carousel__slider">
        <button className="carousel__slider__button" onClick={handleLeft}>
          <div className="icon icon-left" />
        </button>

        <div className="carousel__slider__container" ref={banner}>
          <ul
            className="carousel__slider-list"
            style={{
              transform: `translateX(${-transformValue}px)`,
            }}
          >
            {images.map(image => (
              <li className="carousel__slider-item" key={image}>
                <img
                  src={image}
                  alt="banner"
                  className="carousel__slider-image"
                />
              </li>
            ))}
          </ul>
        </div>

        <button className="carousel__slider__button" onClick={handleRight}>
          <div className="icon icon-right" />
        </button>
      </div>

      <div className="carousel__dots">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label="dots"
            onClick={() => setCurrentIndex(index)}
            className={classNames('carousel__dots-item', {
              'carousel__dots-item-active': currentIndex === index,
            })}
          />
        ))}
      </div>
    </section>
  );
};
