import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { API_PRODUCT_URL } from '../../helpers/helper';
import './MainSlider.scss';

export const MainSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleLeftClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 2 : prevSlide - 1));
  };

  const handleRightClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
  };

  const images = [
    `${API_PRODUCT_URL}img/banner-phones.png`,
    `${API_PRODUCT_URL}img/banner-tablets.png`,
    `${API_PRODUCT_URL}img/banner-accessories.png`,
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
    }, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentSlide]);

  return (
    <>
      <section className="main-slider">
        <button
          type="button"
          className="main-slider__button slider__button_l"
          onClick={handleLeftClick}
        >
          &lt;
        </button>
        <div className="main-slider__container">
          <ul className="main-slider__list">
            {images.map((image, index) => (
              <li
                key={image}
                className={classnames('main-slider__item', {
                  active: index === currentSlide,
                })}
              >
                <img src={image} alt="" className="main-slider__img" />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="main-slider__button main-slider__button_r"
          onClick={handleRightClick}
        >
          &gt;
        </button>
        <div className="main-slider__indicators">
          {images.map((_, index) => (
            // eslint-disable-next-line
            <button
              type="button"
              key={_}
              className={classnames('main-slider__count', {
                active: index === currentSlide,
              })}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>
    </>
  );
};
