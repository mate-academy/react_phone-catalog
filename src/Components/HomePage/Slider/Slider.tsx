import React, { useState, useEffect } from 'react';
import SlideImg from './SlideImg';
import { URLs, imgWidth } from './constants';

import './Slider.scss';

const dotsArr: Array<number> = [0, 1, 2];

const Slider: React.FC = () => {
  const [x, setX] = useState(0);
  const [dotOnFocus, setDotOnFocus] = useState(0);

  const stopSlider = (-imgWidth * (URLs.length - 1));
  let count = 0;

  const showNextImg = () => {
    if (x === stopSlider || dotOnFocus === 2 || count === 2) {
      setX(0); setDotOnFocus(0); count = 0;
    } else {
      setX((0 - imgWidth) * (dotOnFocus + 1));
      count += 1;
      setDotOnFocus(count);
    }
  };

  useEffect(() => {
    setX(0 - (imgWidth * dotOnFocus));
  }, [dotOnFocus]);

  useEffect(() => {
    const nextMove = setInterval(showNextImg, 2000);

    return () => clearInterval(nextMove);
  }, []);

  const showPrevImg = () => {
    if (x === stopSlider) {
      setX(x + imgWidth);
      if (dotOnFocus < 2) {
        setDotOnFocus(dotOnFocus - 1);
      } else {
        setDotOnFocus(0);
      }
    } else {
      setX(0);
      setDotOnFocus(0);
    }
  };

  const handleDotFocus = (index: number) => setDotOnFocus(index);

  return (
    <div className="slider">
      <div className="slider__wrapper">

        <button
          type="button"
          onClick={showPrevImg}
          className="slider__btn prev"
        >
          {' '}
        </button>

        <div className="slider__container">
          {URLs.map((url, index) => (
            <SlideImg
              key={url}
              url={url}
              width={x}
              index={index}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={showNextImg}
          className="slider__btn next"
        >
          {' '}
        </button>

      </div>

      <div className="slider__dots">
        {dotsArr.map(dot => (
          <button
            key={dot}
            type="button"
            className={dot === dotOnFocus ? 'dot active' : 'dot'}
            onClick={() => handleDotFocus(dot)}
          >
            {' '}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
