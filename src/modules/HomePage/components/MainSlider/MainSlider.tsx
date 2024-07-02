import { useEffect, useState } from 'react';
import './MainSlider.scss';
import classNames from 'classnames';

type Images = {
  [key: number]: string[];
};

export const MainSlider = () => {
  const [count, setCount] = useState(0);
  const images: Images = {
    0: ['banner-mobile.png', 'banner-desktop.png'],
    1: ['banner-phones.png', 'banner-phones.png'],
    2: ['banner-accessories.png', 'banner-accessories.png'],
  };

  const handlePrevButton = () => {
    setCount(currentCount => {
      if (currentCount <= 0) {
        return currentCount + 2;
      }

      return currentCount - 1;
    });
  };

  useEffect(() => {
    setInterval(() => {
      handlePrevButton();
    }, 5000);
  }, []);

  const handleNextButton = () => {
    setCount(currentCount => {
      if (currentCount === 2) {
        return currentCount - 2;
      }

      return currentCount + 1;
    });
  };

  return (
    <section className="main-slider">
      <div className="main-slider__title">
        <div className="container">
          <h1>Welcome to Nice Gadgets store!</h1>
        </div>
      </div>
      <div className="main-slider__slider">
        <button className="main-slider__prev" onClick={handlePrevButton}>
          <img src="./img/icons/prev.svg" alt="arrow-prev" />
        </button>
        <picture className="main-slider__picture">
          <source
            srcSet={`./img/${images[count][1]}`}
            media="(min-width: 640px)"
          />
          <img
            className="main-slider__image"
            src={`./img/${images[count][0]}`}
            alt="banner"
          />
        </picture>
        <button className="main-slider__next" onClick={handleNextButton}>
          <img src="./img/icons/next.svg" alt="arrow-next" />
        </button>
        <div className="main-slider__pagination">
          <button
            onClick={() => setCount(0)}
            className={classNames('main-slider__dot', {
              'active-dot': count === 0,
            })}
          ></button>
          <button
            onClick={() => setCount(1)}
            className={classNames('main-slider__dot', {
              'active-dot': count === 1,
            })}
          ></button>
          <button
            onClick={() => setCount(2)}
            className={classNames('main-slider__dot', {
              'active-dot': count === 2,
            })}
          ></button>
        </div>
      </div>
    </section>
  );
};
