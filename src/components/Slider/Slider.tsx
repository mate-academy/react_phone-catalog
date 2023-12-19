import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import './Slider.scss';
import { Link } from 'react-router-dom';

export const Slider = () => {
  const images = [
    {
      id: 1,
      url: 'https://mate-academy.github.io/react_phone-catalog/'
        + '_new/img/banner-phones.png',
      alt: 'Phones',
      link: '/phones',
    },
    {
      id: 2,
      url: 'https://mate-academy.github.io/react_phone-catalog/'
        + '_new/img/banner-tablets.png',
      alt: 'Tablets',
      link: '/tablets',
    },
    {
      id: 3,
      url: 'https://mate-academy.github.io/react_phone-catalog/'
      + '_new/img/banner-accessories.png',
      alt: 'Accessories',
      link: '/accessories',
    },
  ];

  const imgsForRender = [
    { ...images[images.length - 1], id: 0 },
    ...images,
    { ...images[0], id: images.length + 1 },
  ];

  const animationDuration = 1000;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentDuration, setCurrentDuration] = useState(animationDuration);

  const handlerPreviousButton = () => {
    if (currentSlide === 1) {
      setCurrentDuration(0);
      setCurrentSlide(imgsForRender.length - 1);

      return;
    }

    setCurrentSlide(currentSlide - 1);
  };

  const handlerNextButton = useCallback(() => {
    if (currentSlide === images.length) {
      setCurrentDuration(0);
      setCurrentSlide(0);

      return;
    }

    setCurrentSlide(currentSlide + 1);
  }, [currentSlide, images.length]);

  const handlerDotClick = (dotId: number) => () => {
    if (!currentDuration) {
      setCurrentDuration(animationDuration);
    }

    setCurrentSlide(dotId);
  };

  useEffect(() => {
    if (!currentDuration) {
      setCurrentDuration(animationDuration);
      if (currentSlide === 0) {
        setCurrentSlide(currentSlide + 1);

        return;
      }

      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide, currentDuration]);

  useEffect(() => {
    const timerId = setTimeout(handlerNextButton, 5000);

    return () => clearTimeout(timerId);
  }, [currentSlide, handlerNextButton]);

  return (
    <div className="slider">
      <div className="slider__container">
        <button
          className="slider__button"
          type="button"
          onClick={handlerPreviousButton}
        >
          <img src="img/mine/icons/Arrow Left.svg" alt="arrow" />
        </button>
        <div className="slider__imgs-wrapper">
          <div
            className="slider__imgs-container"
            style={{
              transition: `margin-left ${currentDuration}ms`,
              marginLeft: `${-1040 * currentSlide}px`,
            }}
          >
            {imgsForRender.map(item => (
              <Link to={item.link}>
                <img
                  src={item.url}
                  alt={item.alt}
                  className="slider__img"
                  key={item.id}
                />
              </Link>
            ))}
          </div>
        </div>
        <button
          className="slider__button"
          type="button"
          onClick={handlerNextButton}
        >
          <img src="img/mine/icons/Arrow Right.svg" alt="arrow" />
        </button>
      </div>
      <div className="slider__slides-dots">
        {
          images.map(item => (
            <button
              key={item.id}
              type="button"
              aria-label="dot"
              className={classNames(
                'slider__slide-dot',
                { 'slider__slide-dot--selected': item.id === currentSlide },
              )}
              onClick={handlerDotClick(item.id)}
            />
          ))
        }
      </div>
    </div>
  );
};
