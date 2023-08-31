import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainSlider.scss';
import phones from '../../images/slider/banner-phones.png';
import tablets from '../../images/slider/banner-tablets.png';
import accessories from './slider/banner-accessories.png';

const IMAGES = [
  {
    img: phones,
    to: '/phones',
  },
  {
    img: tablets,
    to: '/tablets',
  },
  {
    img: accessories,
    to: '/accessories',
  },
];

const IMAGE_WIDTH = 1040;
const CONTAINER_WIDTH = IMAGE_WIDTH * IMAGES.length;
const ANIMATION_INTERVAL = 5000;

export const MainSlider = () => {
  const [slide, setSlide] = useState(0);
  const [numOfimage, setNumOfImage] = useState(0);

  const handleRightSlide = () => {
    if (numOfimage === IMAGES.length - 1) {
      setSlide(0);
      setNumOfImage(0);

      return;
    }

    setSlide((prevState) => prevState + IMAGE_WIDTH);
    setNumOfImage((prevState) => prevState + 1);
  };

  const handleLeftSlide = () => {
    if (numOfimage === 0) {
      setSlide(() => CONTAINER_WIDTH - IMAGE_WIDTH);
      setNumOfImage(IMAGES.length - 1);

      return;
    }

    setSlide((prevState) => prevState - IMAGE_WIDTH);
    setNumOfImage((prevState) => prevState - 1);
  };

  const handleDots = (num: number) => {
    setSlide(num * IMAGE_WIDTH);
    setNumOfImage(num);
  };

  useEffect(() => {
    const interval = setInterval(handleRightSlide, ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  }, [numOfimage]);

  return (
    <section className="section">
      <div className="slider">
        <button
          type="button"
          className="slider__button"
          onClick={handleLeftSlide}
        >
          {'<'}
        </button>

        <div
          className="slider__container"
          style={{ width: `${IMAGE_WIDTH}px` }}
        >
          <ul
            className="slider__container-images"
            style={{
              transform: `translateX(${-slide}px)`,
              width: `${CONTAINER_WIDTH}px`,
            }}
          >
            {IMAGES.map(slideImg => (
              <Link
                to={slideImg.to}
                key={slideImg.img}
                className="slider__container-image"
                style={{ backgroundImage: `url(${slideImg.img})` }}
              />
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="slider__button"
          onClick={handleRightSlide}
        >
          {'>'}
        </button>
      </div>

      <div className="slider__dots">
        {IMAGES.map((image, num) => (
          <button
            key={image.to}
            type="button"
            aria-label="button"
            onClick={() => handleDots(num)}
            className={classNames(
              'slider__dots-cell',
              { 'slider__dots-cell--active': numOfimage === num },
            )}
          />
        ))}
      </div>
    </section>
  );
};
