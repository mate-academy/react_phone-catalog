import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import './PhotoSlider.scss';

const DALAY = 1000;
const WIDTH = 1040;

const slides = [
  {
    id: 1,
    src: '_new/img/banner-phones.png',
  },
  {
    id: 2,
    src: '_new/img/banner-tablets.png',
  },
  {
    id: 3,
    src: '_new/img/banner-accessories.png',
  },
];

export const PhotoSlider: React.FC = () => {
  const [translate, setTranslate] = useState(0);
  const [currentImg, setCurrentImg] = useState(1);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      switch (translate) {
        case 0:
          setTranslate(translate - WIDTH);
          setCurrentImg(2);
          break;

        case -WIDTH:
          setTranslate(translate - WIDTH);
          setCurrentImg(3);
          break;

        default:
          setCurrentImg(1);
          setTranslate(0);
          break;
      }
    }, 3000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [translate]);

  const handleClickPrev = useCallback(() => {
    if (translate < 0) {
      setTranslate(translate + WIDTH);
      setCurrentImg(currentImg - 1);
    } else if (translate === 0) {
      setTranslate(-2 * WIDTH);
      setCurrentImg(3);
    }
  }, [currentImg, translate]);

  const handleClickNext = useCallback(() => {
    if (translate > -2 * WIDTH) {
      setTranslate(translate - WIDTH);
      setCurrentImg(currentImg + 1);
    } else if (translate === -2 * WIDTH) {
      setTranslate(0);
      setCurrentImg(1);
    }
  }, [currentImg, translate]);

  const handleClickDots = useCallback((id: number) => {
    switch (id) {
      case 1:
        setTranslate(0);
        setCurrentImg(1);
        break;
      case 2:
        setTranslate(-WIDTH);
        setCurrentImg(2);
        break;
      case 3:
        setTranslate(-2 * WIDTH);
        setCurrentImg(3);
        break;

      default:
        break;
    }
  }, []);

  return (
    <div className="Slider">
      <div className="Slider__content">
        <div
          className="Slider__images"
          style={{
            transform: `translateX(${translate}px)`,
            transition: `${DALAY}ms transform`,
          }}
        >
          {slides.map(slide => (
            <div key={slide.id}>
              <img
                src={slide.src}
                alt="images"
                className="Slider__img"
                width="1040px"
                height="400px"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="Slider__arrow Slider__arrow-left"
          onClick={handleClickPrev}
        >
          <img
            src="icons/Arrow_Left_small.svg"
            alt="arrow-left"
            className="Slider__arrow-img"
          />
        </button>

        <button
          type="button"
          className="Slider__arrow Slider__arrow-right"
          onClick={handleClickNext}
        >
          <img
            src="icons/Arrow_Right_small.svg"
            alt="arrow-right"
            className="Slider__arrow-img"
          />
        </button>
      </div>

      <div className="Slider__mark">
        {slides.map(slide => (
          <button
            key={slide.id}
            type="button"
            className={classNames('Slider__dot', {
              'active-dot': slide.id === currentImg,
            })}
            aria-label="dot"
            onClick={() => handleClickDots(slide.id)}
          />
        ))}
      </div>
    </div>
  );
};
