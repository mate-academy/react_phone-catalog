import React, { useState } from 'react';
import cn from 'classnames';
import { sliderImg } from '../../helpers/slider';
import './Slider.scss';

export const Slider = () => {
  const [imgPostion, setimgPostion] = useState<number>(0);
  const [activeDot, setActiveDot] = useState<number>(sliderImg[0].id);

  const handleNextClick = () => {
    if (imgPostion < -2079) {
      setimgPostion(0);
      setActiveDot(1);
    } else {
      setimgPostion(imgPostion - 1040);
      setActiveDot(activeDot + 1);
    }
  };

  const handlePrevClick = () => {
    if (imgPostion === 0) {
      setimgPostion(-2080);
      setActiveDot(3);
    } else {
      setimgPostion(imgPostion + 1040);
      setActiveDot(activeDot - 1);
    }
  };

  const carouselStyle = {
    transform: `translateX(${imgPostion}px)`,
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="Slider__container">
            <button
              type="button"
              className="carousel__btn carousel__btn_prev btn"
              onClick={handlePrevClick}
            >
              { }
            </button>
            <div className="carousel__container">
              <ul className="carousel" style={carouselStyle}>
                {sliderImg.map(({ imgUrl, id }) => (
                  <li
                    className="carousel__item"
                    key={id}
                  >
                    <img className="carousel__img" alt="img1" src={imgUrl} />
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="carousel__btn carousel__btn_next btn"
              onClick={handleNextClick}
            >
              { }
            </button>
          </div>
          <div className="carousel__dots-wrap">
            {sliderImg.map(({ id }, index) => (
              <div
                key={id}
                className={cn('carousel__dot', {
                  carousel__dot_active: activeDot === sliderImg[index].id,
                })}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
