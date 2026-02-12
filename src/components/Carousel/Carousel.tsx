import bannerPhones from '../../images/slider/banner-phones.png';
import bannerTablets from '../../images/slider/banner-tablets.png';
import bannerAccess from '../../images/slider/banner-accessories.png';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import './Carousel.scss';
import { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/hooks';

const images = [bannerPhones, bannerTablets, bannerAccess];

export const Carousel = () => {
  const firstImageIndex = 0;
  const lastImageIndex = images.length - 1;

  const [sliderWidth, setSliderWidth] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(firstImageIndex);

  const { theme } = useAppSelector(state => state.theme);

  const banner = useRef<HTMLDivElement>(null);

  const transformValue = sliderWidth * currentImageIndex;

  const handleLeftSlide = () => {
    if (currentImageIndex !== firstImageIndex) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(lastImageIndex);
    }
  };

  const handleRightSlide = useCallback(() => {
    if (currentImageIndex !== lastImageIndex) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(firstImageIndex);
    }
  }, [currentImageIndex, lastImageIndex]);

  const handlerDotActive = (i: number) => {
    setCurrentImageIndex(i);
  };

  useEffect(() => {
    if (banner.current) {
      setSliderWidth(banner.current.offsetWidth);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    const timerID = setInterval(() => {
      handleRightSlide();
    }, 5000);

    return () => clearInterval(timerID);
  }, [currentImageIndex, handleRightSlide]);

  return (
    <section className="Carousel">
      <div className="Carousel__slider">
        <button
          type="button"
          className="Carousel__slider-button"
          onClick={() => handleLeftSlide()}
        >
          <div className="icon icon--left">
            <img
              src={theme === 'light-theme' ? arrow : arrowDark}
              alt="Arrow_left"
              className="icon--left_img"
            />
          </div>
        </button>

        <div className="Carousel__slider-container" ref={banner}>
          <ul
            className="Carousel__slider-list"
            style={{
              transform: `translateX(-${transformValue}px)`,
            }}
          >
            {images.map(image => (
              <li className="Carousel__slider-item" key={image}>
                <img
                  className="Carousel__slider-image"
                  src={image}
                  alt="Banner"
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="Carousel__slider-button"
          onClick={() => handleRightSlide()}
        >
          <div className="icon icon--right">
            <img
              src={theme === 'light-theme' ? arrow : arrowDark}
              alt="Arrow_right"
            />
          </div>
        </button>
      </div>

      <div className="Carousel__dots">
        {images.map((image, i) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="Carousel__dots-container" key={image}>
            <button
              type="button"
              className={classNames('Carousel__dots-item', {
                'banner-active': currentImageIndex === i,
              })}
              onClick={() => handlerDotActive(i)}
            ></button>
          </label>
        ))}
      </div>
    </section>
  );
};
