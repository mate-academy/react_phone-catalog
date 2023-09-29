import './Slider.scss';
import { useEffect, useState } from 'react';
import arrow_left from '../../icons/Arrow_left.svg';
import arrow_right from '../../icons/Arrow_right.svg';
import banner_phones from '../../banner/banner-phones.png';
import banner_accessories from '../../banner/banner-tablets.png';
import banner_tablets from '../../banner/banner.png';

const Slider = () => {
  const [current, setCurrent] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const images = [
    { image: banner_phones, id: 1 },
    { image: banner_accessories, id: 2 },
    { image: banner_tablets, id: 3 },
  ];

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  // eslint-disable-next-line
  let timeOut: any = null;

  useEffect(() => {
    timeOut
      = autoPlay
      && setTimeout(() => {
        slideRight();
      }, 5000);
  }, [current, autoPlay]);

  return (
    <div
      className="slider main__section"
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <div className="slider__container">

        <button
          type="button"
          className="slider__button"
          onClick={slideLeft}
        >
          <img src={arrow_left} alt="" className="icon icon--left" />
        </button>
        <div className="slider__photo-container">
          {images.map((image, index) => {
            return (
              <div
                key={image.id}
                className={
                  index === current
                    ? 'slider__cards slider__cards-active'
                    : 'slider__cards'
                }
              >
                <img
                  src={image.image}
                  alt="slider"
                  className="slider__card"
                />
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="slider__button"
          onClick={slideRight}
        >
          <img src={arrow_right} alt="" className="icon icon--right" />
        </button>
      </div>

      <div className="slider__pagination">
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              type="button"
              aria-label="button"
              className={
                index === current
                  ? 'pagination__dot pagination__dot-active'
                  : 'pagination__dot'
              }
              onClick={() => setCurrent(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
