/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Banner.scss';
import { arrowLeftImg, arrowRightImg, sliderImg } from '../../utils/indes';
import classNames from 'classnames';

const Banner: React.FC = () => {
  const [currentImgs, setCurrentImgs] = useState(0);

  useEffect(() => {
    const intervadId = setInterval(() => {
      setCurrentImgs(prevImgs => (prevImgs + 1) % sliderImg.length);
    }, 5000);

    return () => clearInterval(intervadId);
  }, []);

  const handlePrevClick = () => {
    setCurrentImgs(prevImgs =>
      prevImgs === 0 ? sliderImg.length - 1 : prevImgs - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentImgs(prevImgs =>
      prevImgs === sliderImg.length - 1 ? 0 : prevImgs + 1,
    );
  };

  const setings = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
  });

  return (
    <section className="banner" {...setings}>
      <button
        type="button"
        onClick={handlePrevClick}
        className="banner__button"
        aria-label="Previous"
      >
        <img src={arrowLeftImg} alt="arrowLeftImg" />
      </button>
      <div className="banner__container">
        {sliderImg.map(slider => (
          <img
            key={slider.id}
            src={slider.img}
            alt="img"
            className="banner__container-image"
            style={{
              transform: `translateX(-${currentImgs * 100}%)`,
            }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleNextClick}
        className="banner__button banner__button-right"
        aria-label="Next"
      >
        <img src={arrowRightImg} alt="arrowRightImg" />
      </button>

      <div className="banner__dots">
        {sliderImg.map((slider, i) => (
          <span
            key={slider.id}
            tabIndex={0}
            role="button"
            onClick={() => setCurrentImgs(i)}
            onKeyDown={() => setCurrentImgs(i)}
            aria-label={`Slide ${i + 1}`}
            className="banner__dots-container"
          >
            <div
              className={classNames('banner__dots-dot', {
                ['banner__dots-dot--active']: i === currentImgs,
              })}
            />
          </span>
        ))}
      </div>
    </section>
  );
};

export default Banner;
